const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const News = new Schema({
    name: { type: String, minLength: 1, maxLength: 255 },
    description: { type: String, maxLength: 1024 },
    content: { type: String, minLength: 1 },
    image: { type: String, maxLength: 512 },
    slug: { type: String },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('oaks', News);
