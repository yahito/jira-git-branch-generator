chrome.commands.onCommand.addListener((command) => {
  if (command === "copyBranchName") {
      async function handleCommand() {
    // Call a function to generate your branch name
     try {
    const branchName = await generateBranchName();
      console.log('Branch Name:', branchName);


    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
  var activeTab = tabs[0];
  chrome.tabs.sendMessage(activeTab.id, { action: "showDialog", branchName: branchName });
});  

    } catch (error) {
      console.error('Error:', error);
    }
  }
  handleCommand();

  }
});

async function copyTextToClipboard(text) {
  try {
    await navigator.clipboard.writeText(text);
    console.log('Text successfully copied to clipboard');
  } catch (err) {
    console.error('Failed to copy text: ', err);
  }
}

function queryTabs(queryInfo) {
  return new Promise((resolve, reject) => {
    try {
      chrome.tabs.query(queryInfo, (result) => {
        if (chrome.runtime.lastError) {
          return reject(new Error(chrome.runtime.lastError));
        }
        resolve(result);
      });
    } catch (error) {
      reject(error);
    }
  });
}

async function generateBranchName() {
  try {
    const tabs = await queryTabs({ active: true, currentWindow: true });
    const activeTab = tabs[0];
    const textContent = await executeScript(activeTab.id, `
      var element = document.querySelector(".issue-link");
      var element2 = document.getElementById('summary-val');
      if (element2 && element) [element2.textContent, element.textContent];
    `);
    console.log('Text Content:', textContent);
    return 'git checkout -b ' + textContent[1] + '-' + convertToBranchName(textContent[0]);
  } catch (error) {
    console.error('Failed to get text content:', error);
  }
}

function convertToBranchName(str) {
  // Replace spaces with hyphens and convert to lowercase
  let branchName = str.replace(/\s+/g, '-').toLowerCase();

  // Remove any characters that are not letters, numbers, hyphens, or underscores
  branchName = branchName.replace(/[^a-z0-9-_]/g, '');

  // Ensure it doesn't start with a hyphen
  if (branchName.startsWith('-')) {
    branchName = branchName.substring(1);
  }

  // Ensure it doesn't end with a hyphen (optional)
  if (branchName.endsWith('-')) {
    branchName = branchName.substring(0, branchName.length - 1);
  }

  // Ensure it is not too long (optional, Git has a limit of 255 characters for a reference name)
  if (branchName.length > 250) {
    branchName = branchName.substring(0, 250);
  }

  return branchName;
}

function executeScript(tabId, code) {
  return new Promise((resolve, reject) => {
    chrome.tabs.executeScript(tabId, { code }, (results) => {
      if (chrome.runtime.lastError) {
        return reject(new Error(chrome.runtime.lastError));
      }
      resolve(results[0]);
    });
  });
}


function showDialog(branchName) {
  const modal = document.createElement('div');
    modal.style.position = 'fixed';
    modal.style.top = '50%';
    modal.style.left = '50%';
    modal.style.transform = 'translate(-50%, -50%)';
    modal.style.padding = '20px';
    modal.style.backgroundColor = 'white';
    modal.style.border = '1px solid black';
    modal.style.zIndex = '10000'; // Ensure it's on top of other elements
    modal.innerText = `Branch Name: ${branchName}`;

    const closeButton = document.createElement('button');
    closeButton.innerText = 'Close';
    closeButton.onclick = function() {
      document.body.removeChild(modal);
    };
    modal.appendChild(closeButton);

    document.body.appendChild(modal);
}