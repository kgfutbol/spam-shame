function replaceSelectedText(elem, email) {
  elem.value = email;
}

chrome.runtime.onMessage.addListener((req, sender, sendResponse) => {
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
  } else if (req.message === "report email") {
    // Retrieves which "dot email" the email was sent to
    var header = document.getElementsByClassName("g2")[0].getAttribute("email");

    if (header) {
      let recipient = header;
      console.log(recipient);

      sendResponse(recipient);
    }
  }
});
