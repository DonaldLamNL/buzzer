var express = require('express');
var router = express.Router();
const { Buzzes, Users } = require('../databaseSchema');
const { decodeUserID } = require('./commonfunct');
const multer = require('multer');
const upload = multer();

router.post('/po', upload.none(), async (req, res) => {
    const { content, category, userid } = req.body;
    const image = req.file && req.file.buffer;
    const video = req.file && req.file.buffer;
    const highestBuzz = await Buzzes.findOne().sort({ buzzid: -1 }).exec();
    const highestBuzzId = highestBuzz ? highestBuzz.buzzid : 0;

    const newBuzz = new Buzzes({
        buzzid: highestBuzzId + 1,
        userid: decodeUserID(userid),
        content,
        image,
        video,
        category,
        like: [],
        dislike: [],
        comment: [],
        rebuzz: null,
    });

    // Save the newBuzz object to the database
    try {
        await newBuzz.save();
        console.log('success');
        res.send({ state: true, message: 'Buzz post successfully!', buzzid: highestBuzzId + 1 });
    } catch (err) {
        console.error(err);
        res.send({ state: false, message: 'Failed to post Buzz.' });
    }
});


router.get('/', async (req, res) => {
    const { buzzid, userid } = req.query;
    let decodedUser = decodeUserID(userid);
    const buzz = await Buzzes.findOne({ buzzid });
    const userLike = (buzz.like.includes(decodedUser) ? 1 : (buzz.dislike.includes(decodedUser) ? -1 : 0));
    const author = await Users.findOne({ userid: buzz.userid });

    const responseData = {
        buzzid,
        userLike: 0,
        userid: buzz.userid,
        username: author.username,
        icon: author.avatar ? author.avatar : null,
        isVerify: author.isVerify ? author.isVerify : null,
        content: buzz.content,
        category: buzz.category,
        numOfLike: buzz.like.length - buzz.dislike.length,
        image: buzz.image ? buzz.image : null,
        video: buzz.video ? buzz.video : null,
        comment: buzz.comment ? buzz.comment : null
    }
    res.send(responseData);
});

router.get('/search', async (req, res) => {
    const { keywords, userid } = req.query;
    let decodedUser = decodeUserID(userid);

    try {
        // Search for buzzes by keywords
        const buzzes = await Buzzes.find({
            content: { $regex: keywords, $options: 'i' }
        });

        const responseData = await Promise.all(buzzes.map(async (buzz) => {
            const userLike = (buzz.like.includes(decodedUser) ? 1 : (buzz.dislike.includes(decodedUser) ? -1 : 0));
            const author = await Users.findOne({ userid: buzz.userid });

            return {
                buzzid: buzz.buzzid,
                userLike,
                userid: buzz.userid,
                username: author.username,
                icon: author.avatar ? author.avatar : null,
                isVerify: author.isVerify ? author.isVerify : null,
                content: buzz.content,
                category: buzz.category,
                numOfLike: buzz.like.length - buzz.dislike.length,
                image: buzz.image ? buzz.image : null,
                video: buzz.video ? buzz.video : null,
                comment: buzz.comment ? buzz.comment : null
            };
        }));
        // console.log(responseData)
        res.send(responseData);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal server error');
    }
});

module.exports = router;
