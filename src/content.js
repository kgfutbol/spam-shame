// Injected into page so you can manipulate page DOM

function replaceSelectedText(elem, email) {
  elem.value = email;
}

// Listens for events sent from other parts of extension
chrome.runtime.onMessage.addListener((req, sender, sendResponse) => {
  // Inserts email into page
  if (req.message === "insert email") {
    if (req.payload) {
      replaceSelectedText(document.activeElement, req.payload);
      let currentURL = new URL(window.location.href).hostname;

      let profileInfo = [
        {
          email: req.payload,
          website: currentURL,
        },
      ];

      sendResponse(profileInfo);
    }

    // Gets the "to" field of the email for the report functionality
  } else if (req.message === "report email") {
    // Retrieves which "dot email" the email was sent to
    var header = document.getElementsByClassName("g2")[0].getAttribute("email");

    if (header) {
      let recipient = header;
      console.log(recipient);

      sendResponse(recipient);
    }

    // Filters the "dot email" out by hijacking user session and adding setting
  } else if (req.message === "filter email") {
    const { email } = req;
    createFilter(email);
    sendResponse(email);
  }
});

// Manipulates DOM to create a filter for the email
function createFilter(email) {
  const labelName = "Spam Shame Spam";

  // Open settings
  document.getElementsByClassName("FH")[0].click();

  setTimeout(() => {
    document.getElementsByClassName("Tj")[0].click();

    setTimeout(() => {
      // Check if label has already been created
      const currLabels = document.getElementsByClassName("nU");
      const labelCreated =
        Array.from(currLabels).findIndex((x) =>
          x.textContent.includes(labelName)
        ) >= 0;

      if (!labelCreated) {
        // Go to labels tab
        const labelsTab = document.getElementsByClassName("f0")[1];
        labelsTab.click();

        // Create a new label for spam shame spam
        const newLabelButton = document.getElementsByClassName("alZ")[0];
        newLabelButton.click();

        const labelNameInput = document.getElementsByClassName("xx")[0];
        labelNameInput.value = labelName;

        const createButton = document.getElementsByClassName("J-at1-auR")[0];
        createButton.click();

        // Make label hidden from normal inbox
        // Short delay to wait for label to be added to DOM
        setTimeout(() => {
          const hideIndex = Array.from(
            document.getElementsByClassName("To")
          ).findIndex((x) => x.textContent.includes(labelName));

          const hideButton = document.getElementsByClassName("To")[hideIndex]
            .cells[2].children[1];
          hideButton.click();
        }, 2000);
      }

      // Create filter for "dot email"
      setTimeout(
        () => {
          // Go to Filters tab
          const filtersTab = document.getElementsByClassName("f0")[4];
          filtersTab.click();

          setTimeout(() => {
            // Create a new filter
            const newFilterIndex = Array.from(
              document.getElementsByClassName("sA")
            ).findIndex((x) => x.textContent.includes("new filter"));
            const newFilterButton = document
              .getElementsByClassName("sA")
              .item(newFilterIndex);
            newFilterButton.click();

            setTimeout(() => {
              // Enter "dot email"
              const toInput = document.getElementsByClassName("ZH nr aQf")[0];
              toInput.value = email;

              const createButton = document.getElementsByClassName(
                "acM acN"
              )[0];
              createButton.click();

              setTimeout(() => {
                // Check apply label box
                document.getElementsByClassName("btj")[3].checked = true;

                alert(
                  `For security reasons you must do the rest. Click "Choose label..." and select ${labelName}. After, click "Create filter". Your filter is then created and you can exit this page.`
                );
              }, 2000);
            }, 2000);
          }, 2000);
        },
        !labelCreated ? 4000 : 1000
      );
    }, 3000);
  }, 2000);
}
