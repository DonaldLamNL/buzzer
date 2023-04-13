var express = require('express');
var router = express.Router();
const { Users, Buzzes, Comments } = require('../databaseSchema');
const { decodeUserID } = require('./commonfunct');
const multer = require('multer');
const upload = multer();

const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "buzzerforbuzz@gmail.com",
        pass: "tgusxfyqeotutbxw",
    },
});

// Delete user
router.post('/delete', upload.none(), async (req, res) => {
    const { userid, targetid } = req.body;
    const decodedUser = decodeUserID(userid);

    try {
        // Admin Verification
        const admin = await Users.findOne({ userid: decodedUser });
        if (admin.isAdmin) {

            // Remove target from all users' following and followers lists
            await Users.updateMany(
                { $or: [{ following: targetid }, { followers: targetid }] },
                { $pull: { following: targetid, followers: targetid } }
            );

            // Delete target from like and dislike arrays of all buzzes
            await Buzzes.updateMany(
                {},
                { $pull: { like: targetid, dislike: targetid } }
            );

            // Delete comments from buzzes
            const buzzes = await Buzzes.find({});
            for (let i = 0; i < buzzes.length; i++) {
                const buzz = buzzes[i];

                // Delete rebuzz
                if (buzz.rebuzz != 0 && buzz.rebuzz != -1) {
                    const rebuzzPost = await Buzzes.findOne({ buzzid: buzz.rebuzz });
                    if (rebuzzPost.userid == targetid) {
                        await Buzzes.updateOne(
                            { _id: buzz._id },
                            { $set: { rebuzz: -1 } }
                        );
                    }
                }

                // Delete buzzes' comment
                if (buzz.comment) {
                    const comments = buzz.comment;
                    const newComments = [];
                    for (let j = 0; j < comments.length; j++) {
                        const comment = await Comments.findOne({ commentid: comments[j] });
                        if (comment && comment.userid != targetid) {
                            newComments.push(comment.commentid);
                        }
                    }
                    await Buzzes.updateOne(
                        { _id: buzz._id },
                        { $set: { comment: newComments } }
                    );
                }
            }

            // Delete buzzes and comments
            await Buzzes.deleteMany({ userid: targetid });
            await Comments.findOneAndDelete({ userid: targetid });

            // Send an email to delete user
            {
                // const user = await Users.findOne({ userid: targetid });

                // const message = {
                //     from: "buzzerfobuzz@gmail.com",
                //     to: user.email,
                //     subject: "Your buzzer account was deleted",
                //     text: `Your account was deleted by Elon Musk, Bye Bye.`,
                // };
                // await transporter.sendMail(message);
            }

            // Delete target user
            await Users.findOneAndDelete({ userid: targetid });

            res.send({ state: true, message: "User deleted successfully." });
        } else {
            res.send({ state: false, message: "You do not have permission to delete users." });
        }
    } catch (err) {
        console.error(err);
        res.send({ state: false, message: 'Failed to delete user.' });
    }
});

// Delete buzz
router.post('/deletebuzz', upload.none(), async (req, res) => {
    const { userid, buzzid } = req.body;
    const decodedUser = decodeUserID(userid);

    try {
        // Admin Verification
        const admin = await Users.findOne({ userid: decodedUser });
        if (admin.isAdmin) {

            // Delete rebuzz
            const buzzes = await Buzzes.find({});
            for (let i = 0; i < buzzes.length; i++) {
                const buzz = buzzes[i];
                if (buzz.rebuzz == buzzid) {
                    await Buzzes.updateOne(
                        { _id: buzz._id },
                        { $set: { rebuzz: -1 } }
                    );
                }
            }

            // Delete buzzes and comments
            await Buzzes.deleteMany({ buzzid });
            await Comments.deleteMany({ buzzid });

            res.send({ state: true, message: "Buzz deleted successfully." });
        } else {
            res.send({ state: false, message: "You do not have permission to delete buzz." });
        }
    } catch (err) {
        console.error(err);
        res.send({ state: false, message: 'Failed to delete buzz.' });
    }
});

// Verify user
router.post('/verify', upload.none(), async (req, res) => {
    const { userid, targetid } = req.body;
    const decodedUser = decodeUserID(userid);

    try {
        // Admin Verification
        const admin = await Users.findOne({ userid: decodedUser });
        if (admin.isAdmin) {

            const target = await Users.findOne({ userid: targetid });
            if (target) {
                if (target.isVerify) {
                    await Users.updateOne({ userid: targetid }, { $set: { isVerify: false } });
                } else {
                    await Users.updateOne({ userid: targetid }, { $set: { isVerify: true } });
                }
                res.send({ state: true, message: `User with userid ${targetid} has been updated.` });
            } else {
                res.send({ state: false, message: `User with userid ${targetid} does not exist.` });
            }
        } else {
            res.send({ state: false, message: "You do not have permission to verify users." });
        }
    } catch (err) {
        console.error(err);
        res.send({ state: false, message: 'Failed to delete user.' });
    }
});

module.exports = router;