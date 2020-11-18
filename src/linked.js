// Script that gets all email data
function get_all_data(data) {
  chrome.runtime.sendMessage({
    message: "get all",
    payload: data,
  });
}

document.addEventListener("DOMContentLoaded", function () {
  let accountList = document.getElementById("tbody");

  function constructAccounts(accounts) {
    console.log("construct accounts");
    console.log(accounts);

    for (var account of accounts) {
      let row = accountList.insertRow();
      let website = row.insertCell(0);
      let email = row.insertCell(1);

      email.innerHTML = account.email;
      email.className = "mdl-data-table__cell--non-numeric";
      website.className = "mdl-data-table__cell--non-numeric";
      website.innerHTML = account.website;
    }
  }

  chrome.runtime.onMessage.addListener((req, sender, sendResponse) => {
    console.log(sender);
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
