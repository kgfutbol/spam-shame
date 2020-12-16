/**
 * Gets the desired element on the client page and clicks on it
 */
function createFilter() {
  const labelName = "Spam Shame Spam";
  const email = "oliver...@gmail.com";

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

          const createButton = document.getElementsByClassName("acM acN")[0];
          createButton.click();

          setTimeout(() => {
            // Check apply label box
            document.getElementsByClassName("btj")[3].checked = true;

            alert(
              `For security reasons you must do the rest. Click "Choose label..." and select ${labelName}. After, click "Create filter". Your filter is then created and you can exit this page.`
            );
          }, 500);
        }, 1000);
      }, 500);
    },
    !labelCreated ? 2200 : 0
  );
}

createFilter();