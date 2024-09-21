const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    title: String,
    summary: String,
    content: String,
    cover: String,
    category: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        enum: ['python', 'javascript', 'react', 'web-development', 'ui-ux']
    },
    author: {type:mongoose.Schema.Types.ObjectId, ref:'User'}
}, {
    timestamps: true
})

const PostModel = mongoose.model('Post', postSchema);

module.exports = PostModel;