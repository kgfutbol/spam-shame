console.log('Background Execution')
chrome.browserAction.onClicked.addListener(function(tab) {
    chrome.tabs.executeScript({
        file: "./foreground"
    });
});