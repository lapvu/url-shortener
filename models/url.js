const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const urlSchema = new Schema({
    short_url: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    click: {
        type: Number,
        default: 0
    },
    id_user: {
        type: String,
    },
    cookies: {
        type: String
    }
})

const Url = mongoose.model('url', urlSchema);

module.exports = Url;
