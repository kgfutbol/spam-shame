document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("emailForm").addEventListener("submit", function () {
        let email = document.getElementById("email").value;
        let re = /@gmail.com$|@googlemail.com$/;

        if (email.match(re) != null) {
            chrome.storage.local.set({ "email": email }, (res) => {
                chrome.browserAction.setPopup({ popup: '../popup.html' });
                window.close();
            });
        } else alert("This extension only supports standard google emails. Please enter a gmail.com or googlemail.com.");
    });
});