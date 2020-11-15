chrome.runtime.onMessage.addListener((req, sender, sendResponse) => {
  if (req.message === 'insert success') {
    if (req.payload) {
      //Code for insert return response from DB

    }
  } else if (req.message === 'get success') {
    if (req.payload) {
      //Code for get return from DB

    }
  } else if (req.message === 'update success') {
    if (req.payload) {
      //Code for update return from DB

    }
  } else if (req.message === 'delete success') {
    if (req.payload) {
      //Code for delete return from DB

    }
  }
});

//data parameter should be in the form of an array of objects
function insert_data(data) {
  chrome.runtime.sendMessage({
    message: "insert",
    payload: data,
  });
}

function get_data(data) {
  chrome.runtime.sendMessage({
    message: "get",
    payload: data,
  });
}

function update_data(data) {
  chrome.runtime.sendMessage({
    message: "update",
    payload: data,
  });
}

function delete_data(data) {
  chrome.runtime.sendMessage({
    message: "delete",
    payload: data,
  });
}

document.addEventListener("DOMContentLoaded", function () {
  chrome.storage.local.get(["email"], (res) => {
    // Executes if email has been set
      
          document
              .getElementById("new-dot-btn")
              .addEventListener("click", onclickNewEmail, false);
          document
              .getElementById("options-btn")
              .addEventListener("click", onclickOptions, false);
          document
              .getElementById("linked-btn")
              .addEventListener("click", onClickLinked, false);

          let currentDotEmail = res.email;
          setNewDotEmail(currentDotEmail);

          function setNewDotEmail(newEmail) {
              currentDotEmail = newEmail;
              chrome.storage.local.set({ email: newEmail }, (resp) => { });
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

              const currBack = "@" + splitEmail[1];
              const back =
                  carry === 0
                      ? currBack
                      : currBack === "@googlemail.com"
                          ? "@gmail.com"
                          : "@googlemail.com";
              setNewDotEmail(newFront + back);
          }

          function onclickOptions() {
              chrome.tabs.create({ url: "../options.html" });
          }

          function onClickLinked() {
              chrome.tabs.create({ url: "../linkedEmails.html" });
          }
  });
});
