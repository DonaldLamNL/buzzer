var express = require('express');
var router = express.Router();
const { Buzzes, Users } = require('../databaseSchema');
const { decodeUserID } = require('./commonfunct');
const multer = require('multer');
const upload = multer();

// Buzz Page
router.get('/', async (req, res) => {
    const { buzzid, userid } = req.query;
    let decodedUser = decodeUserID(userid);

    try {
        const buzz = await Buzzes.findOne({ buzzid });
        const userLike = (buzz.like.includes(decodedUser) ? 1 : (buzz.dislike.includes(decodedUser) ? -1 : 0));
        const author = await Users.findOne({ userid: buzz.userid });

        const responseData = {
            buzzid,
            userLike,
            userid: buzz.userid,
            username: author.username,
            icon: author.avatar ? author.avatar : null,
            isVerify: author.isVerify ? author.isVerify : false,
            content: buzz.content,
            category: buzz.category,
            numOfLike: buzz.like.length - buzz.dislike.length,
            image: buzz.image ? buzz.image : null,
            video: buzz.video ? buzz.video : null,
            comment: buzz.comment ? buzz.comment : null,
        }

        res.send(responseData);

    } catch (error) {
        console.log(error);
        res.status(500).send('Internal Server Error');
    }
});


// Posting System
router.post('/post', upload.none(), async (req, res) => {
    const { content, category, userid } = req.body;
    const image = req.file && req.file.buffer;
    const video = req.file && req.file.buffer;
    const decodedUser = decodeUserID(userid);

    try {
        // Generate new buzzid
        const highestBuzz = await Buzzes.findOne().sort({ buzzid: -1 }).exec();
        const newBuzzid = highestBuzz ? highestBuzz.buzzid + 1 : 1;

        const newBuzz = new Buzzes({
            buzzid: newBuzzid,
            userid: decodedUser,
            content,
            image,
            video,
            category,
            like: [],
            dislike: [],
            comment: [],
            rebuzz: null,
        });

        await newBuzz.save();
        console.log('success');
        res.send({ state: true, message: 'Buzz post successfully!', newBuzzid });
    } catch (err) {
        console.error(err);
        res.send({ state: false, message: 'Failed to post Buzz.' });
    }
});


// Buzz Searching System
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
        res.send(responseData);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal server error');
    }
});

// Like Button
router.post('/like', async (req, res) => {
    const { buzzid, userid, isLike, isDislike } = req.body;
    const decodedUser = decodeUserID(userid);

    try {
        if(isDislike){
            await Buzzes.updateOne({ buzzid }, { $pull: { dislike: decodedUser } });
        }
        
        if(isLike){
            await Buzzes.updateOne({ buzzid }, { $pull: { like: decodedUser } });
        }else{
            await Buzzes.updateOne({ buzzid }, { $push: { like: decodedUser } });
        }

        const buzz = await Buzzes.findOne({buzzid});

        res.json({ state: true, isLike: !isLike, isDislike: false, likeCount: buzz.like.length - buzz.dislike.length });

    } catch (err) {
        console.error(err);
        res.status(500).json({state: false, error: 'Internal Server Error'});
    }
});

// Dislike Button
router.post('/dislike', async (req, res) => {
    const { buzzid, userid, isLike, isDislike } = req.body;
    const decodedUser = decodeUserID(userid);

    try {
        if(isLike){
            await Buzzes.updateOne({ buzzid }, { $pull: { like: decodedUser } });
        }
        
        if(isDislike){
            await Buzzes.updateOne({ buzzid }, { $pull: { dislike: decodedUser } });
        }else{
            await Buzzes.updateOne({ buzzid }, { $push: { dislike: decodedUser } });
        }

        const buzz = await Buzzes.findOne({buzzid});

        res.json({ state: true, isLike: false, isDislike: !isDislike, likeCount: buzz.like.length - buzz.dislike.length });

    } catch (err) {
        console.error(err);
        res.status(500).json({state: false, error: 'Internal Server Error'});
    }
});


// Dislike Button


module.exports = router;
