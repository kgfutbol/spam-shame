// Script that gets all email data
function get_all_data(data) {
  chrome.runtime.sendMessage({
    message: "get all",
    payload: data,
  });
}

// Makes table show users emails and linked website
document.addEventListener("DOMContentLoaded", function () {
  let accountList = document.getElementById("tbody");

  function constructAccounts(accounts) {
    console.log("construct accounts");
    console.log(accounts);

    for (var account of accounts) {
      let row = accountList.insertRow();
      let email = row.insertCell(0);
      let website = row.insertCell(1);

      email.innerHTML = account.email;
      website.innerHTML = account.website;
    }
  }

  // Waits for data to be retrieved
  chrome.runtime.onMessage.addListener((req, sender, sendResponse) => {
    if (req.message === "get all success") {
      if (req.payload) {
        console.log(req.payload);
        //Code for insert return response from DB
        constructAccounts(req.payload);
      }
    }
  });

  get_all_data();
});
