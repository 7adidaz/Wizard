// content1.js

let yButtonTimeout;
let yButton;
let selectedText = "";
let isYButtonDisplayed = false;

// Function to create and show the "Y" button
function showYButton() {
  // Check if the text is selected
  const selection = window.getSelection();
  if (selection.toString().trim() === "") {
    // The text is not selected, so hide the button
    if (yButton) {
      document.body.removeChild(yButton);
    }
    isYButtonDisplayed = false;
  }

  const newText = selection.toString().trim();

  // if (newText === "") {
  //   selectedText = "";
  //   return;
  // }

  if (
    newText !== selectedText ||
    (!isYButtonDisplayed && !document.querySelector(".custom-overlay"))
  ) {
    selectedText = newText;

    const overlayDiv = document.querySelector(".custom-overlay");
    if (overlayDiv && overlayDiv.contains(selection.anchorNode)) return;

    // Function to remove any previously created "Y" button
    if (yButton && document.body.contains(yButton)) {
      document.body.removeChild(yButton);
      if (yButtonTimeout) {
        clearTimeout(yButtonTimeout);
      }
    }

    yButton = document.createElement("div");

    yButton.className = "custom-y-button";
    yButton.style.position = "absolute";
    yButton.style.width = "30px";
    yButton.style.height = "30px";
    yButton.style.backgroundColor = "green";
    yButton.innerText = "Y";

    // Get the position of the selected text div
    const div = selection.anchorNode.parentElement;
    const rect = div.getBoundingClientRect();

    // Set the position of the button
    yButton.style.top = `${rect.top + 24 + document.body.offsetTop}px`;
    yButton.style.left = `${rect.left + 20}px`;
    yButton.style.right = `${rect.right - 20}px`;

    document.body.appendChild(yButton);

    yButtonTimeout = setTimeout(() => {
      document.addEventListener("click", onDocumentClick);
      isYButtonDisplayed = true;
    }, 200);

    yButton.addEventListener("click", (event) => {
      event.stopPropagation(); // Prevent the click event from affecting the text selection
      clearTimeout(yButtonTimeout);
      showSelectedText(selectedText);
      document.body.removeChild(yButton);
      isYButtonDisplayed = false;
    });
  }
}

// Function to show the absolute div with the selected text
function showSelectedText(text) {
  const overlayDiv = document.createElement("div");
  overlayDiv.className = "custom-overlay";
  overlayDiv.style.position = "absolute";
  overlayDiv.style.width = "300px";
  overlayDiv.style.height = "400px";
  overlayDiv.style.backgroundColor = "rgba(255, 255, 255, 0.9)";
  overlayDiv.style.top = "50%";
  overlayDiv.style.left = "50%";
  overlayDiv.style.transform = "translate(-50%, -50%)";
  overlayDiv.style.padding = "10px";
  overlayDiv.style.overflow = "auto";
  overlayDiv.style.color = "black";

  overlayDiv.innerHTML = `<p>${text}</p><button class="close-button">Close</button>`;
  document.body.appendChild(overlayDiv);

  const closeButton = overlayDiv.querySelector(".close-button");
  closeButton.addEventListener("click", () => {
    closeOverlay();
    isYButtonDisplayed = false;
  });
}

// Function to close the overlay div
function closeOverlay() {
  const overlayDiv = document.querySelector(".custom-overlay");
  if (overlayDiv) {
    document.body.removeChild(overlayDiv);
  }
  document.removeEventListener("click", onDocumentClick);
}

// Function to handle clicks on the document to close the overlay
function onDocumentClick(event) {
  const overlayDiv = document.querySelector(".custom-overlay");
  if (overlayDiv && !overlayDiv.contains(event.target)) {
    closeOverlay();
    isYButtonDisplayed = false;
  }
}

// Listen for clicks anywhere on the page to show the "Y" button
document.addEventListener("click", () => {
  showYButton();
});
