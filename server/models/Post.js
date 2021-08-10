const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Post = new Schema({
    title: { type: String, require: true },
    description: { type: String , default: ''},
    url: { type: String , default: ''},
    status: {
        type: String,
        enum: ['TO LEARN', 'LEARNING', 'LEARNER']
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
}, {
    timestamps: true
});


module.exports = mongoose.model('Post', Post);