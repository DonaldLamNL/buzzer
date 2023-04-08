var express = require('express');
var router = express.Router();
const { Users, Buzzes, Comments } = require('../databaseSchema');
const { decodeUserID } = require('./commonfunct');
const multer = require('multer');
const upload = multer();

// Delete user
router.post('/delete', upload.none(), async (req, res) => {
    const { userid, targetid } = req.body;
    const decodedUser = decodeUserID(userid);

    try {
        // Admin Verify
        const user = await Users.findOne({ userid: decodedUser });

        if (user.isAdmin) {
            // Delete buzzes and comments
            await Buzzes.deleteMany({ userid: targetid });
            await Comments.deleteMany({ userid: targetid });

            // Delete user
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
        // Admin Verify
        const user = await Users.findOne({ userid: decodedUser });

        if (user.isAdmin) {
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
        // Admin Verify
        const user = await Users.findOne({ userid: decodedUser });
        if (user.isAdmin) {

            // Target User
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