const articleExtractor = require('../util/html-to-text');
const modelReply = require('../util/reply');
const getTranscript = require('../util/youtube-transcript');
const explain = require('../util/explain');
const summarizer = require('../util/summarize');

const Cache = require('../models/cache');
const prettify = require('../util/prettify');

exports.summarizeUrl = async (req, res, next) => {
    try {
        const url = req.body.url;
        if (!url) {
            const err = new Error('Url is not Valid');
            throw err;
        }
        const article = await articleExtractor(url);

        if (!article) {
            const err = new Error('Choose a website with an article');
            throw err;
        }

        const summary = await summarizer(article, false);
        if (!summary) {
            const err = new Error('Choose a website with an article');
            throw err;
        }
        return res.json({
            text: summary
        });
    } catch (err) {
        const error = new Error(`Error in summarizing article, err: ${err}`);
        next(error);
    }
};

exports.summarizeVideo = async (req, res, next) => {
    try {
        const url = req.body.url;
        if (!url) {
            const err = new Error('Url is not Valid');
            throw err;
        }

        const findId = function (url) {
            var match = url.match(/v=([0-9a-z_-]{1,20})/i); //TODO:  change this regex
            return (match ? match['1'] : undefined);
        }

        const videoId = findId(url);
        if (!videoId) {
            const error = new Error('Url is not a valid youtube video');
            throw error;
        }

        const cachedResult = await Cache.findOne({ videoId: videoId });

        if (cachedResult) {
            return res.json({
                text: cachedResult.videoSummary
            });
        }

        const transcript = await getTranscript(videoId);
        if (!transcript) {
            const error = new Error('Error in getting the video transcript');
            throw error;
        }
        const summary = await summarizer(transcript, true);
        if (!summary) {
            const error = new Error('Error in getting the summary from the model');
            throw error;
        }

        // cache it 
        const cache = new Cache({
            videoId: videoId,
            videoSummary: summary
        });
        cache.save(); // no need to await for it to save. 

        return res.json({
            text: summary
        });
    } catch (err) {
        const error = new Error(`Error in Summarizing Youtube Video, err: ${err}`);
        next(error);
    }
};

exports.summarizeText = async (req, res, next) => {
    try {
        const text = req.body.text;
        if (!text) {
            const error = new Error('Text is not Valid');
            throw error;
        }

        const summary = await summarizer(text, false);

        if (!summary) {
            const error = new Error('Error in getting the summary from the model');
            throw error;
        }

        return res.json({
            text: summary
        });
    } catch (err) {
        const error = new Error(`Error in summarizing a text, err ${err}`);
        next(error);
    }
}

exports.emailReply = async (req, res, next) => {
    try {
        const email = req.body.email;
        const name = req.body.name;

        if (!email || !name) {
            const err = new Error('Email is not Valid');
            throw err;
        }

        if (email.length > 2500) { // too long to be handled by the model
            const err = new Error('Email is not Valid');
            throw err;
        }

        const reply = await modelReply(email, name);
        if (!reply) {
            const error = new Error('Error in getting email\'s reply from the model');
            throw error;
        }

        return res.json({
            text: reply
        });
    }
    catch (err) {
        const error = new Error(`Error in replying, err: ${err}`);
        next(error);
    }
};

exports.explain = async (req, res, next) => {
    try {
        const keyword = req.body.keyword;
        if (!keyword) {
            const err = new Error('keyword is not Valid');
            throw err;
        }

        const reply = await explain(keyword);
        if (!reply) {
            const error = new Error('Error in getting explanation from the model');
            throw error;
        }

        return res.json({
            text: reply
        });
    } catch (err) {
        const error = new Error(`Error in explaining, err: ${err}`);
        next(error);
    }
};

exports.textManipulation = async (req, res, next) => {
    try {
        const text = req.body.text;
        if (!text) {
            const err = new Error('text is not Valid');
            throw err;
        }


        if (text.length > 2500) { // too long to be handled by the model
            const err = new Error('text is longer than what the model can handle');
            throw err;
        }

        req.body.type = prettify(req.body.type)

        let model;
        if (req.body.type === "longer") {
            model = require('../util/longer');
        } else if (req.body.type === "shorter") {
            model = require('../util/shorter');
        } else if (req.body.type === "proofread") {
            model = require('../util/proofread');
        } else {
            const err = new Error('model type is not Valid');
            throw err;
        }

        const reply = await model(text);
        if (!reply) {
            const error = new Error('Error in getting the text from the model');
            throw error;
        }

        return res.json({
            text: reply
        });
    } catch (err) {
        const error = new Error(`Error in text manipulation , err: ${err}`);
        next(error);
    }
}
