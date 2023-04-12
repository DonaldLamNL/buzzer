var express = require('express');
var router = express.Router();
const {Hive,Users} = require('../databaseSchema');
const { decodeUserID } = require('./commonfunct');

const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Get Hive List
router.get('/', async (req, res) => {
    try {
        const hive_list = await Hive.find() 
        const responseData = hive_list;
        res.send(responseData);
    } catch (error) {
        console.log(error);
        res.status(500).send('Internal Server Error');
    }
});

// Get UserInfo
router.get('/user', async (req, res) => {
    const {userid } = req.query;
    let decodedUser = decodeUserID(userid);

    try {
        const user = await Users.findOne({ userid: decodedUser });
        const cell = await Hive.findOne({username: user.username})
        if(user){
            const responseData = {
                username:user.username,
                userid:user.userid,
                posted:(cell != null)
            }
            res.send(responseData);
        }else{
            res.send({ status: false, message: 'User not found' })
        }

    } catch (error) {
        console.log(error);
        res.status(500).send('Internal Server Error');
    }
});

// Posting System
router.post('/post', async (req, res) => {
    const { content, userid} = req.query;
    let decodedUser = decodeUserID(userid);
    console.log(req.body)

    try {
        // Generate new buzzid
        const highestHive = await Hive.findOne().sort({ cellid: -1 }).exec();
        const newCellID = highestHive ? highestHive.cellid + 1 : 1;
        const user = await Users.findOne({ userid: decodedUser });

        const newCell = new Hive({
            cellid: newCellID,
            userid: decodedUser,
            username: user.username,
            content: content,
            like: 0,
        });

        await newCell.save();

        console.log('success');
        res.send({ state: true, message: 'Cell post successfully!', cellid: newCellID });
    } catch (err) {
        console.error(err);
        res.send({ state: false, message: 'Failed to post Cell.' });
    }
});

// Like Button
router.post('/like', async (req, res) => {
    const {cellid} = req.query;

    try {
        const hive = await Hive.findByIdAndUpdate(
            cellid,
            { $inc: { like: 1 } },
            { new: true }
        );
        if (!hive) {
            return res.status(404).json({ message: 'Hive not found' });
        }
        res.json(hive);

    } catch (err) {
        console.error(err);
        res.status(500).json({ state: false, error: 'Internal Server Error' });
    }
});  

module.exports = router;
