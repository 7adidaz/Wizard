const { default: mongoose } = require('mongoose');

const Schema = require('mongoose').Schema;

const cacheSchema = new Schema({
    videoId:{
        type: String,
        required: true
    }, 
    videoSummary: {
        type: String,
        required: true
    }
});

const Cache = mongoose.model('cache', cacheSchema);
module.exports = Cache;
