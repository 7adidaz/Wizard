const { YoutubeTranscript } = require('youtube-transcript');

module.exports = async (videoId) => {
    if(!videoId){
        return undefined;
    }

    let full = '';
    try {
        const result = await YoutubeTranscript
            .fetchTranscript(videoId);
        result.forEach(line => { full += (' ' + line.text) });
        return full;
    } catch (err) {
        console.log('err on youtubeTranscipt: ', err);
        return undefined;
    }
}