import dialogPolyfill from "./dialog-polyfill.esm.js";

// Executes when the extension is first run
// Makes user enter their gmail
document.addEventListener("DOMContentLoaded", function () {
  "use strict";
  let dialogs = document.querySelectorAll("dialog");
  dialogs.forEach(function (dialog) {
    if (!dialog.showModal) {
      dialogPolyfill.registerDialog(dialog);
      console.log(dialog.id + ": registration complete");
    }
    dialog.querySelector(".close").addEventListener("click", function () {
      dialog.close();
      if (dialog.id === "successDialog") window.close();
    });
  });

  document.getElementById("emailForm").addEventListener("submit", function (e) {
    e.preventDefault();
    let email = document.getElementById("email").value;
    if (validateEmail(email)) {
      // Make email first dot email
      email = email.substring(0, 1) + "." + email.substring(1);

      chrome.storage.local.set({ email: email }, () => {
        chrome.browserAction.setPopup({ popup: "../popup.html" });
        document.querySelector("#successDialog").showModal();
      });
    }
  });
});

function validateEmail(email) {
  let re = /@gmail.com$|@googlemail.com$/;

  if (email.match(re) != null) {
    console.log("Valid email");
    return true;
  } else {
    console.log("Invalid email");
    document.querySelector("#failDialog").showModal();
    return false;
  }
}
