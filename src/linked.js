// Script that gets email data
function get_data(data) {
  chrome.runtime.sendMessage({
    message: "get",
    payload: data,
  });
}

document.addEventListener("DOMContentLoaded", function () {
  let data = get_data("email");
  data = [
    { email: "test@gmail.com", website: "facebook.com" },
    { email: "t.est@gmail.com", website: "google.com" },
  ];

  let accountList = document.getElementById("tbody");
  function constructAccounts(accounts) {
    for (var account of accounts) {
      let row = accountList.insertRow();
      let email = row.insertCell(0);
      let website = row.insertCell(1);

      email.innerHTML = account.email;
      website.innerHTML = account.website;
    }
  }
  constructAccounts(data);
});
