const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    userid: { type: String, required: true },
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    avatar: { type: String },
    description: { type: String },
    following: [{ type: Number }],
    followers: [{ type: Number }],
    favour: [{ type: String }],
    isVerify: { type: Boolean }
});

const buzzSchema = new mongoose.Schema({
    buzzid: { type: Number, required: true },
    userid: { type: String, required: true },
    content: { type: String },
    image: { type: Buffer },
    video: { type: Buffer },
    category: { type: String },
    like: [{ type: Number }],
    dislike: [{ type: Number }],
    comment: [{ type: Number }],
    rebuzz: { type: Number }
});

const commentSchema = new mongoose.Schema({
    commentid: { type: Number, required: true },
    buzzid: { type: Number, required: true },
    userid: { type: String, required: true },
    // author_id: { type: String, required: true },
    content: { type: String, required: true }
});

const Users = mongoose.model('Users', userSchema);
const Buzzes = mongoose.model('Buzzes', buzzSchema);
const Comments = mongoose.model('Comments', commentSchema);

module.exports = {
    Users,
    Buzzes,
    Comments
};