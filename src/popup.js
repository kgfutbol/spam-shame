document.addEventListener('DOMContentLoaded', function () {

    document.getElementById("new-dot-btn").addEventListener('click', onclickNewEmail, false)
    document.getElementById("options-btn").addEventListener('click', onclickOptions, false)
    let accountList = document.getElementById("tbody");

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

    function constructAccounts(accounts) {
        for (var account in accounts) {
            let row = accountList.insertRow();
            let email = row.insertCell(0);
            let website = row.insertCell(1);

            email.innerHTML = account;
            website.innerHTML = accounts[account];
        }
    }

    const exampleAccounts = {"sdybka@uncc.edu" : "Facebook.com", "sdybk.a@uncc.edu" : "gmail.com"};
    constructAccounts(exampleAccounts);
})