document.addEventListener('DOMContentLoaded', function () {

    document.getElementById("new-dot-btn").addEventListener('click', onclickNewEmail, false)
    document.getElementById("options-btn").addEventListener('click', onclickOptions, false)

    function onclickNewEmail ()
    {
        let newDotEmail = "temp"
        chrome.tabs.query({currentWindow: true, active: true},
            function (tabs) {
                chrome.tabs.sendMessage(tabs[0].id, newDotEmail)
            }
        )
    }

    function onclickOptions ()
    {
        chrome.tabs.create({url: '../options.html'})
    }
})