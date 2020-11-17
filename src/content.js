chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.message === 'insert email')
    {
        document.getElementById("EmailAddr").innerText = request.payload;
    }
});
