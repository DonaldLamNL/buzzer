var express = require('express');
var router = express.Router();
const { Users, Buzzes, Comments } = require('../databaseSchema');
const { decodeUserID } = require('./commonfunct');
const multer = require('multer');
const upload = multer();

// Posting Comment
router.post('/post', upload.none(), async (req, res) => {
    const { buzzid, userid, content } = req.body;
    const decodedUser = decodeUserID(userid);
    
    try {
        // Post a comment
        const highestComment = await Comments.findOne().sort({ commentid: -1 }).exec();
        const newCommentid = highestComment ? highestComment.commentid + 1 : 1;  // generate new commentid
        const newComment = new Comments({
            commentid: newCommentid,
            userid: decodedUser,
            buzzid,
            content,
        });
        await newComment.save();

        // Update the buzz
        await Buzzes.updateOne({ buzzid }, { $push: { comment: newCommentid } });

        res.send({ state: true, message: 'Comment post successfully!', newCommentid });

    } catch (err) {
        console.error(err);
        res.send({ state: false, message: 'Failed to post Comment.' });
    }
});

// Get Comment
router.get('/', async (req, res) => {
    const { buzzid } = req.query;
    try {
        const buzz = await Buzzes.findOne({ buzzid });
        const reversedComments = buzz.comment.reverse();

        const responseComments = await Promise.all(reversedComments.map(async commentid => {
            const comment = await Comments.findOne({ commentid });
            const user = await Users.findOne({ userid: comment.userid });
            return {
                commentid,
                userid: comment.userid,
                username: user.username,
                content: comment.content,
            };
        }));
        res.send(responseComments);
    } catch (error) {
        console.log(error);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;
