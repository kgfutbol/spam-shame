document.addEventListener("DOMContentLoaded", function () {
  document
    .getElementById("btn-options")
    .addEventListener("click", onclickOptions, false);
  document
    .getElementById("btn-linked")
    .addEventListener("click", onClickLinked, false);

  function onclickOptions() {
    chrome.tabs.create({ url: "../options.html" });
  }

  function onClickLinked() {
    chrome.tabs.create({ url: "../linkedEmails.html" });
  }
});
