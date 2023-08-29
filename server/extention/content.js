// Function to add the "X" button to the DOM
function addXButton() {
    const composeDiv = document.querySelector('.btC')

    if (composeDiv) {
        // Check if the X button already exists before adding it again
        if (!document.querySelector('.custom-x-button')) {
            const xButton = document.createElement('div')
            xButton.className = 'custom-x-button'
            xButton.style.width = '30px'
            xButton.style.height = '30px'
            xButton.style.backgroundColor = 'red'
            xButton.innerText = 'X'
            composeDiv.appendChild(xButton)

            xButton.addEventListener('click', () => {
                processTextAndChangeButton()
            })
        }
    }
}

// Function to process the text and change the X button to "loading"
function processTextAndChangeButton() {
    const messageDiv = document.querySelector('.a3s.aiL')
    const editorDiv = document.querySelector('.Am.aO9.Al.editable.LW-avf.tS-tW')
    // get the sender email
    const senderEmail = document.querySelector('.gD').innerText

    if (messageDiv && editorDiv) {
        const messageText = messageDiv.innerText
        const loadingButton = document.querySelector('.custom-x-button')
        loadingButton.innerText = 'Loading...'

        setTimeout(() => {
            editorDiv.innerHTML = `<div dir="ltr">${messageText}</div>${editorDiv.innerHTML}`
            loadingButton.innerText = 'X'
        }, 0)
    }
}

// Check if the X button needs to be added on page load
addXButton()

// Listen for clicks anywhere on the page to check if the X button needs to be added dynamically
document.addEventListener('click', () => {
    addXButton()
})
