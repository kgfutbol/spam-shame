/**
 * Gets the desired element on the client page and clicks on it
 */
function createFilter() {
  const labelName = "Spam Shame Spam";

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
      let hideIndex = Array.from(
        document.getElementsByClassName("To")
      ).findIndex((x) => x.textContent.includes(labelName));

      const hideButton = document.getElementsByClassName("To")[hideIndex]
        .cells[2].children[1];
      hideButton.click();
    }, 2000);
  }
}

createFilter();
