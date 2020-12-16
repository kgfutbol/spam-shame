document.addEventListener("DOMContentLoaded", function () {
  document
    .getElementById("btn-options")
    .addEventListener("click", onclickOptions, false);
  document
    .getElementById("btn-linked")
    .addEventListener("click", onClickLinked, false);
  document
    .getElementById("btn-filter")
    .addEventListener("click", onClickFilter, false);

  function onclickOptions() {
    chrome.tabs.create({ url: "../options.html" });
  }

  function onClickLinked() {
    chrome.tabs.create({ url: "../linkedEmails.html" });
  }

  function onClickFilter() {
    chrome.tabs.create({ url: "../filter.html" });
  }

  function onClickFilterEmails() {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      // Executes code on page (hijacks user session)
      chrome.tabs.executeScript(tabs[0].id, { file: "src/filter.js" });
    });
  }
  // adding listener to your button in popup window
  document
    .getElementById("filter-emails")
    .addEventListener("click", onClickFilterEmails);
});
