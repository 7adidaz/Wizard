console.log('Content script loaded.')

async function summarizeYoutubeVideo(url) {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest()
        xhr.open('POST', 'http://localhost:3000/summarize/youtube-video', true)
        xhr.setRequestHeader('Content-Type', 'application/json')

        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    const response = JSON.parse(xhr.responseText)
                    console.log(response)
                    resolve(response)
                } else {
                    console.error('Error calling the API:', xhr.statusText)
                    reject(new Error('API Error'))
                }
            }
        }

        const requestData = JSON.stringify({ url: url })
        xhr.send(requestData)
    })
}

// Function to add the Summarize button
function addSummarizeButton() {
    console.log('addSummarizeButton')
    const videoTitle = document.querySelector('#above-the-fold')
    console.log('videoTitle', videoTitle)
    if (videoTitle) {
        console.log('We found the video title element.')
        const summarizeBtn = document.createElement('button')
        summarizeBtn.className = 'SummarizeBtn'
        summarizeBtn.textContent = 'Summarize'
        summarizeBtn.style.padding = '8px 20px'
        summarizeBtn.style.borderRadius = '4px'
        summarizeBtn.style.background = '#ff0000'
        summarizeBtn.style.color = '#fff'
        summarizeBtn.style.fontSize = '16px'
        summarizeBtn.style.border = 'none'

        // Add the Summarize button at the beginning of the video title element
        videoTitle.insertBefore(summarizeBtn, videoTitle.firstChild)

        summarizeBtn.addEventListener('click', async () => {
            summarizeBtn.textContent = 'Summarizing...'

            const videoUrl = window.location.href
            const divToRemove = document.querySelector('.summrytextbox')
            if (divToRemove) {
                // Remove the div from its parent
                divToRemove.parentNode.removeChild(divToRemove)
            }

            try {
                const data = await summarizeYoutubeVideo(videoUrl)
                console.log('summary', data)

                if (data && data.summary) {
                    const parentDiv = document.querySelector('#secondary-inner')

                    if (parentDiv) {
                        // Find the child div with id "panels" inside the parent div
                        const panelsDiv = parentDiv.querySelector('#panels')

                        if (panelsDiv) {
                            // Create and append a new div to the "panels" div

                            const theSummrizedtext =
                                document.createElement('div')
                            theSummrizedtext.className = 'summrytextbox'
                            theSummrizedtext.innerHTML = `
                            <div class= "summryHeader">
                            <p>Summry</p>
                            </div>
                            <p style=" color " >${data.summary}</p>
                            `

                            panelsDiv.appendChild(theSummrizedtext)
                        } else {
                            console.error(
                                'Child div with id "panels" not found.'
                            )
                        }
                    } else {
                        console.error(
                            'Parent div with id "secondary-inner" not found.'
                        )
                    }
                } else {
                    summarizeBtn.textContent = 'Error'
                }
            } catch (error) {
                console.error('Error:', error)
                summarizeBtn.textContent = 'Error'
            } finally {
                summarizeBtn.textContent = 'Summarize'
            }
        })
    }
}
setTimeout(function () {
    addSummarizeButton()
}, 1000)
