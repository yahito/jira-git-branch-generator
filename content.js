


chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.action === "showDialog") {
    const branchName = request.branchName;
    console.log("Message received in content script!");
    const modal = document.createElement('div');
    modal.style.position = 'fixed';
    modal.style.top = '50%';
    modal.style.left = '50%';
    modal.style.transform = 'translate(-50%, -50%)';
    modal.style.padding = '20px';
    modal.style.backgroundColor = 'white';
    modal.style.border = '1px solid black';
    modal.style.zIndex = '10000'; 
    modal.innerText = `Branch Name: ${branchName}`;
    modal.style.textAlign = 'center'; // Ensure text and button are centered

    // Create a container for the button to control layout
    const buttonContainer = document.createElement('div');
    buttonContainer.style.marginTop = '20px'; // Space between the text and button

    const closeButton = document.createElement('button');
    closeButton.innerText = 'Copy';
    closeButton.style.marginTop = '10px'; // Additional space if needed
    closeButton.style.padding = '5px 10px'; // Padding inside the button
    closeButton.style.border = 'none'; // No border for the button
    closeButton.style.cursor = 'pointer'; // Cursor pointer to indicate it's clickable

    closeButton.onclick = function() {
       navigator.clipboard.writeText(branchName).then(() => {
        console.log('Branch name copied to clipboard');
      }).catch((err) => {
        console.error('Failed to copy branch name: ', err);
      });
      document.body.removeChild(modal);
    };
    buttonContainer.appendChild(closeButton); // Add the button to the container
    modal.appendChild(buttonContainer); // Add the button container to the modal


    document.body.appendChild(modal);
    sendResponse({success: true});
  }
});

