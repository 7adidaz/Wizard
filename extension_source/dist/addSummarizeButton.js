async function summarizeYoutubeVideo(url) {
    try {
        console.log('url', url)

        const xhr = new XMLHttpRequest()
        xhr.open('POST', 'http://localhost:3000/summarize/youtube-video', true)
        xhr.setRequestHeader('Content-Type', 'application/json')

        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    const response = JSON.parse(xhr.responseText)
                    console.log(response)
                    return response
                } else {
                    console.error('Error calling the API:', xhr.statusText)
                    return null
                }
            }
        }

        const requestData = JSON.stringify({ url: url })
        xhr.send(requestData)
    } catch (error) {
        console.error('Error:', error)
        return null
    }
}

function addSummarizeButton() {
    console.log('addSummarizeButton')
    const videoTitle = document.getElementById('above-the-fold')
    if (videoTitle && !videoTitle.querySelector('.SummarizeBtn')) {
        const summarizeBtn = document.createElement('button')
        summarizeBtn.className = 'SummarizeBtn'
        summarizeBtn.textContent = 'Sum'
        summarizeBtn.style.padding = '16px 8px'
        summarizeBtn.style.marginLeft = '16px'

        // Add the Summarize button at the beginning of the video title element
        videoTitle.insertBefore(summarizeBtn, videoTitle.firstChild)

        summarizeBtn.addEventListener('click', async () => {
            summarizeBtn.textContent = 'Loading...'

            // Get the video URL
            const videoUrl = window.location.href

            // Call the summarize function
            const summary = await summarizeYoutubeVideo(videoUrl)
            console.log('summary', summary)

            if (summary) {
                // Create a modal
                const modal = document.createElement('div')
                modal.style.position = 'absolute'
                modal.style.top = '50%'
                modal.style.left = '50%'
                modal.style.transform = 'translate(-50%, -50%)'
                modal.style.background = 'white'
                modal.style.padding = '20px'
                modal.style.boxShadow = '0px 0px 10px rgba(0, 0, 0, 0.2)'
                modal.textContent = summary
                document.body.appendChild(modal)
            } else {
                summarizeBtn.textContent = 'Error'
            }
        })
    }
}

// Export the function to be used in other scripts
export { addSummarizeButton }
