const mongoose = require('mongoose');
//Schema
const Schema = mongoose.Schema;
const emailQuoteSchema = new Schema({
    email: String,
    body: String,
    date: {
        type: String,
        default: Date.now()
    }
});

//Model
const BlogPost = mongoose.model('emailQuote', emailQuoteSchema);

module.exports = BlogPost;