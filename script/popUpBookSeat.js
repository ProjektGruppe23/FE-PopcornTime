// Get the button and popup elements
const popupButton = document.getElementById("popup-button");
const popup = document.getElementById("popup");
const closeButton = document.getElementById("close-button");

// Function to show the popup
function showPopup() {
    popup.style.display = "block";
}

// Function to close the popup
function closePopup() {
    popup.style.display = "none";
}

// Add click event listeners to the button and close button
popupButton.addEventListener("click", showPopup);
closeButton.addEventListener("click", closePopup);
