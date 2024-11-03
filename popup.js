// popup.js

document.getElementById('get-source').addEventListener('click', function() {
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        chrome.tabs.executeScript(tabs[0].id, { code: "document.documentElement.outerHTML;" }, function(results) {
            const sourceCode = results[0];
            document.getElementById('source-code').textContent = sourceCode; // Display the source code in the popup
        });
    });
});
