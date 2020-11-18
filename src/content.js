function replaceSelectedText(elem, email) {
    elem.value = email;
}

chrome.runtime.onMessage.addListener((req, sender, sendResponse) => {
    console.log("Received Message");
    console.log(req);
    if (req.message === 'insert email') {
        if (req.payload) {
            replaceSelectedText(document.activeElement, req.payload);
        }
    }
});