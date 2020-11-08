document.addEventListener("DOMContentLoaded", function () {
  document
    .getElementById("new-dot-btn")
    .addEventListener("click", onclickNewEmail, false);
  document
    .getElementById("options-btn")
    .addEventListener("click", onclickOptions, false);
  let accountList = document.getElementById("tbody");

  let currentDotEmail = "example@gmail.com";
  setNewDotEmail(currentDotEmail);

  function setNewDotEmail(newEmail) {
    currentDotEmail = newEmail;
    document.getElementById("dot-email").innerHTML = newEmail;
  }

  function onclickNewEmail() {
    let splitEmail = currentDotEmail.split("@");
    let oldFront = splitEmail[0];

    // Increment to next dot email
    let newFront = "";
    let carry = 1;
    for (let i = 0; i < oldFront.length - 1; i++) {
      if (oldFront[i] === ".") continue;

      let prevVal = oldFront[i + 1] === "." ? 1 : 0;
      const total = prevVal + carry;
      newFront += oldFront[i];

      carry = 0;
      if (total === 2) {
        carry = 1;
      } else if (total === 1) {
        newFront += ".";
      }
    }
    newFront += oldFront[oldFront.length - 1];

    const back = carry === 0 ? "@gmail.com" : "@googlemail.com";
    setNewDotEmail(newFront + back);
  }

  function onclickOptions() {
    chrome.tabs.create({ url: "../options.html" });
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

  const exampleAccounts = {
    "sdybka@uncc.edu": "Facebook.com",
    "sdybk.a@uncc.edu": "gmail.com",
  };
  constructAccounts(exampleAccounts);
});
