# About

This extension is used to automate some work using Jira

## Installation

### Prerequisites

1. Open `manifest.json` and change `*://example.com/*` to your Jira host URL pattern (e.g. `*://jira.mycompany.com/*`) in two places:
   - Under `host_permissions`
   - Under `content_scripts` -> `matches`

2. Open `content.js` and ensure the selectors match your Jira configuration:
   - The workflow transition dialog ID (`#workflow-transition-241-dialog`)
   - The activity select element selector
   - The comment field selector

The extension is configured to work with `example.com` by default. You'll need to update these URLs to match your actual Jira instance.


### Load extension

1. Open Chrome and navigate to `chrome://extensions/`
2. Enable "Developer mode" by toggling the switch in the top right corner
3. Click "Load unpacked" button in the top left
4. Select the directory containing your extension files (manifest.json, content.js, etc.)
5. The extension should now appear in your extensions list and be ready to use


## Usage

Just `Load Unpacked Extension` and open Jira and Log time

## Debug

To debug the extension:

1. Click on the Chrome menu (three dots) in the top right corner
2. Go to More Tools > Developer Tools (or press F12)
3. Click on the "Console" tab in Developer Tools
4. Look for messages starting with "Content script loaded!" to confirm the extension is running
5. Additional debug messages will show:
   - When the observer is initialized
   - When activity selectors are found
   - When listeners are attached
   - When the comment field is updated
   - Any errors that occur

If you need to make changes:
1. Edit the code in content.js
2. Go back to chrome://extensions/
3. Click the refresh icon on your extension's card
4. Reload the Jira page to see the changes

The extension logs detailed information about each step of the process, making it easier to identify where issues might occur.
