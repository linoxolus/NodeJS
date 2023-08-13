const mongoose = require('mongoose');
const mongooseDelete = require('mongoose-delete');

const Schema = mongoose.Schema;

const News = new Schema(
    {
        _id: { type: Number, required: true },
        title: { type: String, minLength: 1, maxLength: 255 },
        description: { type: String, maxLength: 1024 },
        content: { type: String, minLength: 1 },
        image: { type: String, maxLength: 512 },
        slug: { type: String },
        createdAt: { type: Date, default: Date.now },
        updatedAt: { type: Date, default: Date.now },
    },
    {
        _id: false,
    },
);

News.plugin(mongooseDelete, {
    overrideMethods: 'all',
    deletedAt: true,
});

module.exports = mongoose.model('oaks', News);
