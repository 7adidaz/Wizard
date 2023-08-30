async function emailReplyapi(email) {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest()
        xhr.open('POST', 'http://localhost:3000/email/reply', true)
        xhr.setRequestHeader('Content-Type', 'application/json')

        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    const response = JSON.parse(xhr.responseText)
                    resolve(response)
                } else {
                    reject(new Error('API Error'))
                }
            }
        }

        const requestData = JSON.stringify({ email: email, name: 'Your name' })
        xhr.send(requestData)
    })
}

const arrowDownIcon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12 12" width="12" height="12"><path d="M6 8.825c-.2 0-.4-.1-.5-.2l-3.3-3.3c-.3-.3-.3-.8 0-1.1.3-.3.8-.3 1.1 0l2.7 2.7 2.7-2.7c.3-.3.8-.3 1.1 0 .3.3.3.8 0 1.1l-3.2 3.2c-.2.2-.4.3-.6.3Z" fill="white" ></path></svg>`
const sparkIcon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="16" height="16"><path d="M7.53 1.282a.5.5 0 0 1 .94 0l.478 1.306a7.492 7.492 0 0 0 4.464 4.464l1.305.478a.5.5 0 0 1 0 .94l-1.305.478a7.492 7.492 0 0 0-4.464 4.464l-.478 1.305a.5.5 0 0 1-.94 0l-.478-1.305a7.492 7.492 0 0 0-4.464-4.464L1.282 8.47a.5.5 0 0 1 0-.94l1.306-.478a7.492 7.492 0 0 0 4.464-4.464Z" fill="white"></path></svg>`
const replybtnHtml = ` 
<div class="aiBtnContainer" style="
display: flex;
align-items: center;
padding: 10px 16px;
border-radius: 99px;
border: 1px solid;
background-color: #655dff;
color: white;
margin-left: 12px;
height: 16px;
    font-size: 14px;
    cursor: pointer;
">
<div class="replybtn" style="
padding-right: 8px;
display: flex;
gap: 7px;
align-items: center;
"> ${sparkIcon}
<p class="aiBtnTest">Reply<p></div>
</div>
  `

{
    /* <div class="moreAiBtn" style="
padding-left: 8px;
border-left: 1px solid;
display: flex;
align-items: center;
">${arrowDownIcon}</div> */
}

function createMenuAndEvents(menuContainer, moreAiBtn) {
    // closeButton.addEventListener('click', () => {
    //     menuContainer.classList.remove('active')
    // })

    menuContainer.innerHTML = `<button class="aiSecActionBtn fixSpelling">Fix spelling & grammar</button>
    <button class="aiSecActionBtn makeShorter">Make shorter</button>
    <button class="aiSecActionBtn makeLonger">Make Longer</button>
    `

    const makeSorterBtn = document.querySelector('.makeShorter')
    if (makeSorterBtn) {
        makeSorterBtn.addEventListener('click', () => {})
    }

    if (!document.querySelector('.menuContainer')) {
        moreAiBtn.appendChild(menuContainer)
    }
    moreAiBtn.addEventListener('click', (event) => {
        event.stopPropagation() // Prevent document click event from firing immediately
        menuContainer.classList.toggle('active')
    })
}

function addXButton() {
    const toolBar = document.querySelectorAll('tr.btC')

    toolBar.forEach((tr) => {
        const moreAiBtn = tr.querySelector('.moreAiBtn')
        if (moreAiBtn) {
            // ...
            const menuContainer = document.createElement('div')
            menuContainer.className = 'menuContainer'

            createMenuAndEvents(menuContainer, moreAiBtn)
        }

        const sendBtn = tr.querySelector('.dC')
        if (sendBtn) {
            // Check if the X button already exists before adding it again
            if (!document.querySelector('.replyToEmail')) {
                const aiBtn = document.createElement('div')
                aiBtn.className = 'replyToEmail'
                aiBtn.innerHTML = replybtnHtml

                sendBtn.parentNode.insertBefore(aiBtn, sendBtn.nextSibling)

                const replybtn = document.querySelector('.replybtn')
                replybtn.addEventListener('click', () => {
                    processTextAndChangeButton()
                })
            }
        }
    })
}

// Function to process the text and change the X button to "loading"
async function processTextAndChangeButton() {
    const messageDiv = document.querySelector('.a3s.aiL')
    const editorDiv = document.querySelector('.Am.aO9.Al.editable.LW-avf.tS-tW')
    // get the sender email
    const senderEmail = document.querySelector('.gD').innerText

    if (messageDiv && editorDiv) {
        const messageText = messageDiv.innerText
        const loadingButton = document.querySelector('.aiBtnTest')

        loadingButton.innerText = 'Replying...'
        loadingButton.style.cursor = 'not-allowed'

        try {
            const data = await emailReplyapi(messageText)
            const apireply = data.text.replace(/\n/g, '<br>')
            loadingButton.style.pointerEvents = 'none'

            if (data && data.text) {
                editorDiv.innerHTML = `<div dir="ltr">${apireply}</div> ${editorDiv.innerHTML}`
            } else {
                editorDiv.innerHTML = `<div dir="ltr"><b><font size="4" style="background-color: rgb(255, 0, 0);" color="#ffffff">ERROR</font></b>${editorDiv.innerHTML}</div>`
            }
        } catch (error) {
            editorDiv.innerHTML = `<div dir="ltr"><b><font size="4" style="background-color: rgb(255, 0, 0);" color="#ffffff">ERROR</font></b>${editorDiv.innerHTML}</div>`
        } finally {
            loadingButton.innerText = 'Reply'
            loadingButton.disabled = false
            loadingButton.style.cursor = 'pointer'
            loadingButton.style.pointerEvents = 'auto'
        }
    }
}

// Add X buttons on page load
addXButton()
// Check if the X button needs to be added on page load
window.addEventListener('load', () => {
    setTimeout(() => {
        addXButton()
    }, 1500)
})

// Listen for clicks anywhere on the page to check if the X button needs to be added dynamically
document.addEventListener('click', () => {
    const menuList = document.querySelector('.menuContainer')

    if (menuList) {
        // romove the clas dont toggle
        menuList.classList.remove('active')
    }
    setTimeout(() => {
        addXButton()
    }, 600)
})
