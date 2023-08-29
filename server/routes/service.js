const express = require('express')
const router = express.Router()

const serviceController = require('../controller/service')

router.post('/summarize/url', serviceController.summarizeUrl)
router.post('/summarize/youtube-video', serviceController.summarizeVideo)

router.post('/email/reply', serviceController.emailReply)

router.post('/text/summarize', serviceController.summarizeText)

router.post('/text/longer', (req, res, next) => {
    req.body.type = "longer";
    next();
}, serviceController.textManipulation);

router.post('/text/shorter', (req, res, next) => {
    req.body.type = "shorter";
    next();
}, serviceController.textManipulation);

router.post('/text/proofread', (req, res, next) => {
    req.body.type = "proofread"; 
    next();
}, serviceController.textManipulation);

router.post('/explain', serviceController.explain)

module.exports = router;
