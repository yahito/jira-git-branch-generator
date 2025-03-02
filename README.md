# Git Branch Generator Chrome Extension

A Chrome extension that automatically generates Git branch names from Jira issue information on the current page.

## Features

- Generates Git branch names based on Jira issue IDs and summaries
- Keyboard shortcut to trigger branch name generation
- Displays branch name in a modal dialog
- Standardizes branch names by:
  - Converting to lowercase
  - Replacing spaces with hyphens
  - Removing special characters
  - Ensuring proper formatting (no leading/trailing hyphens)
  - Limiting branch name length to 250 characters

## Installation

1. Clone this repository or download the source code
2. Open Chrome and navigate to `chrome://extensions/`
3. Enable "Developer mode" in the top-right corner
4. Click "Load unpacked" and select the directory containing the extension files

## Usage

1. Navigate to a Jira issue page
2. Press the keyboard shortcut (defined in your manifest.json) to generate a branch name
3. A dialog will appear with the generated branch name formatted as: `git checkout -b ISSUE-ID-issue-summary`
4. Copy the branch name to use in your Git workflow

## Configuration

To customize the keyboard shortcut:

1. Edit the `manifest.json` file to update the `commands` section
2. Or change it in Chrome by navigating to `chrome://extensions/shortcuts`

## How It Works

The extension:
1. Listens for the keyboard command
2. Extracts the Jira issue ID and summary from the current page
3. Formats the text into a standardized Git branch name
4. Displays the result in a modal dialog

## Requirements

- Chrome browser
- Access to Jira issue pages

## Development

To modify this extension:

1. Update the code as needed
2. Reload the extension in `chrome://extensions/`
3. Test your changes
