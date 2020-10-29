console.log('Background Execution')
chrome.tabs.executeScript(null, {file: 'foreground.js'}, () => console.log("Starting execution of foreground.js"))