// Script that gets all email data
function get_all_data(data) {
  chrome.runtime.sendMessage({
    message: "get all",
    payload: data,
  });
}

document.addEventListener("DOMContentLoaded", function () {
  data = [
    { email: "test@gmail.com", website: "facebook.com" },
    { email: "t.est@gmail.com", website: "google.com" },
  ];

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

  //constructAccounts(data);

  chrome.runtime.onMessage.addListener((req, sender, sendResponse) => {
    console.log(sender);
    if (req.message === 'get all success') {
      if (req.payload) {
        console.log(req.payload)
        //Code for insert return response from DB
        constructAccounts(req.payload)
      }
    }
  });

  get_all_data();

});

