const express = require('express')
const morgan = require('morgan')
const { default: mongoose } = require('mongoose')
const cache = require('./util/cache');

const serviceRoutes = require('./routes/service')

const MindsDBConnection = require('./util/mindsdb')
const modelLoader = require('./util/models')
var cors = require('cors')

require('dotenv').config()

const mongoURI = process.env.MONGODB_URI

const app = express()

app.use(express.json())
app.use(cors())
app.use(morgan('dev'));

app.use(serviceRoutes)

app.use((err, req, res, next) => {
  console.log(req.body.env)
    // TODO: make ui to report errors to backend.
    console.log('error from error handeling ', err);
    res.error = err;
    res.redirect('/error');
})

async function init() {
    try {
        await mongoose.connect(mongoURI)
        await MindsDBConnection()
        await modelLoader()
    } catch (err) {
        console.log('err on INITing connections', err);
    }
}
(async () => {
    cache.flushAll(); //clear cache, in case of model changes
    await init();
    app.listen(process.env.PORT || 3001)
})()

exports.app = app;
exports.init = init;
