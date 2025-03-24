// Function to handle activity selection changes
function handleActivityChange(event) {
    const activitySelect = event.target;
    const selectedText = activitySelect.options[activitySelect.selectedIndex].text;
    console.log('Activity changed:', selectedText);
    
    if (selectedText === 'Code review') {
        console.log('Code review selected, looking for comment field...');
        // Find the comment field within the work log form
        const textarea = document.querySelector('#workflow-transition-241-dialog #comment-wiki-edit textarea');
        if (textarea) {
            console.log('Found textarea, updating TinyMCE...');
            
            // Get the TinyMCE instance
            const editorIframe = document.querySelector('#mce_0_ifr');
            if (editorIframe) {
                try {
                    // Update the textarea
                    textarea.value = 'Code reviewed';
                    textarea.dispatchEvent(new Event('input', { bubbles: true }));
                    textarea.dispatchEvent(new Event('change', { bubbles: true }));

                    // Update TinyMCE content
                    const tinyMCEDoc = editorIframe.contentDocument || editorIframe.contentWindow.document;
                    const tinyMCEBody = tinyMCEDoc.body;
                    if (tinyMCEBody) {
                        tinyMCEBody.innerHTML = 'Code reviewed';
                        // Trigger input events on TinyMCE
                        tinyMCEBody.dispatchEvent(new Event('input', { bubbles: true }));
                        tinyMCEBody.dispatchEvent(new Event('keyup', { bubbles: true }));
                        console.log('TinyMCE content updated successfully!');
                    } else {
                        console.log('TinyMCE body not found');
                    }
                } catch (e) {
                    console.log('Error updating TinyMCE:', e);
                }
            } else {
                console.log('TinyMCE iframe not found');
            }
        } else {
            console.log('Textarea not found');
        }
    }
}

// Function to initialize the observer
function initializeObserver() {
    console.log('Initializing observer...');
    // Create a MutationObserver to watch for changes in the DOM
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            // Look for the activity select element
            const activitySelect = document.querySelector('#workflow-transition-241-dialog select');
            if (activitySelect && !activitySelect.dataset.listenerAttached) {
                console.log('Found activity select, attaching listener...');
                // Add change event listener
                activitySelect.addEventListener('change', handleActivityChange);
                activitySelect.dataset.listenerAttached = 'true';
                console.log('Listener attached successfully!');
            }
        });
    });

    // Start observing the document with the configured parameters
    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
    console.log('Observer started watching for changes');
}

// Initialize the observer when the content script loads
console.log('Content script loaded!');
initializeObserver(); 