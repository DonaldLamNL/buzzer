var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
const { Buzzes } = require('../databaseSchema');
const { decodeUserID } = require('./commonfunct');

router.post('/po', async (req, res) => {
    const { content, category, userid } = req.body;

    const highestBuzz = await Buzzes.findOne().sort({ buzzid: -1 }).exec();
    const highestBuzzId = highestBuzz ? highestBuzz.buzzid : 0;

    const newBuzz = new Buzzes({
        userid: decodeUserID(userid),
        buzzid: highestBuzzId + 1,
        content,
        category,
    });

    // Save the newBuzz object to the database
    try {
        await newBuzz.save();
        console.log('success');
        res.send({ state: true, message: 'Buzz post successfully!' });
    } catch (err) {
        console.error(err);
        res.send({ state: false, message: 'Failed to post Buzz.' });
    }
});


module.exports = router;
