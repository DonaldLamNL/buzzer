var express = require('express');
var router = express.Router();
const { Hive} = require('../databaseSchema');
const { decodeUserID } = require('./commonfunct');

const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Get Hive List
router.get('/', async (req, res) => {
    try {
        const hive_list = await Hive.find() 
        const responseData = hive_list;
        res.json(responseData);

    } catch (error) {
        console.log(error);
        res.status(500).send('Internal Server Error');
    }
});

// Posting System
router.post('/post', upload.single('image'), async (req, res) => {
    const { content, userid} = req.body;
    const decodedUser = decodeUserID(userid);

    try {
        // Generate new buzzid
        const highestHive = await Hive.findOne().sort({ cellid: -1 }).exec();
        const newCellID = highestHive ? highestHive.cellid + 1 : 1;

        const newCell = new Hive({
            cellid: newCellID,
            userid: decodedUser,
            content,
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
    const { hiveid} = req.body;

    try {

        const hive = await Hive.findByIdAndUpdate(
            req.params.id,
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
