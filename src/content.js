function replaceSelectedText(elem, email) {
    elem.value = email;
}

chrome.runtime.onMessage.addListener((req, sender, sendResponse) => {
    console.log("Received Message");
    console.log(req);
    console.log(window.location.href);
    if (req.message === 'insert email') {
        if (req.payload) {
            replaceSelectedText(document.activeElement, req.payload);
            let currentURL = window.location.hostname;
            let splitURL = currentURL.split(".");
            let location = splitURL.length - 2;

            let profileInfo = [{
                "email": req.payload,
                "website" : splitURL[location]
            }];

            sendResponse(profileInfo);
        }
    }
});