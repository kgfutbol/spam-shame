function replaceSelectedText(elem, email) {
    elem.value = email;
}

function getTopLevelDomain (url) {
    let hostname;

    if (url.indexOf("://") > -1) {
        hostname = url.split('/')[2];
    } else {
        hostname = url.split('/')[0];
    }

    hostname = hostname.split(':')[0];

    hostname = hostname.split('?')[0];

    return hostname;
}

chrome.runtime.onMessage.addListener((req, sender, sendResponse) => {
    console.log("Received Message");
    console.log(req);
    console.log(window.location.href);
    if (req.message === 'insert email') {
        if (req.payload) {
            replaceSelectedText(document.activeElement, req.payload);
            let currentURL = window.location.href;
            let website = getTopLevelDomain(currentURL);

            let profileInfo = [{
                "email": req.payload,
                "website" : website
            }];

            sendResponse(profileInfo);
        }
    }
});