var express = require('express');
var router = express.Router();
const { Buzzes, Users, Categories } = require('../databaseSchema');
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
            rebuzz: buzz.rebuzz,
        }
        res.send(responseData);

    } catch (error) {
        console.log(error);
        res.status(500).send('Internal Server Error');
    }
});

// Posting System
router.post('/post', upload.none(), async (req, res) => {
    const { content, category, userid, rebuzz } = req.body;
    const image = req.file && req.file.buffer;
    const video = req.file && req.file.buffer;
    const decodedUser = decodeUserID(userid);
    const rebuzzid = isNaN(rebuzz) ? 0 : parseInt(rebuzz);

    try {
        // Generate new buzzid
        const highestBuzz = await Buzzes.findOne().sort({ buzzid: -1 }).exec();
        const newBuzzid = highestBuzz ? highestBuzz.buzzid + 1 : 1;

        // Update category
        // const cat = await Categories.findOne({ name: category });
        // if (cat) {
        //     cat.buzz.push(newBuzzid);
        //     await cat.save();
        // } else {
        //     const cat = new Categories({
        //         name: category,
        //         user: [decodedUser],
        //         buzz: [newBuzzid],
        //     });
        //     await cat.save();
        // }

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
            rebuzz: rebuzzid,
        });

        await newBuzz.save();

        console.log('success');
        res.send({ state: true, message: 'Buzz post successfully!', buzzid: newBuzzid });
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
                comment: buzz.comment ? buzz.comment : null,
                rebuzz: buzz.rebuzz,
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
        if (isDislike) {
            await Buzzes.updateOne({ buzzid }, { $pull: { dislike: decodedUser } });
        }

        if (isLike) {
            await Buzzes.updateOne({ buzzid }, { $pull: { like: decodedUser } });
        } else {
            await Buzzes.updateOne({ buzzid }, { $addToSet: { like: decodedUser } });
        }

        const buzz = await Buzzes.findOne({ buzzid });

        res.json({ state: true, isLike: !isLike, isDislike: false, likeCount: buzz.like.length - buzz.dislike.length });

    } catch (err) {
        console.error(err);
        res.status(500).json({ state: false, error: 'Internal Server Error' });
    }
});

// Dislike Button
router.post('/dislike', async (req, res) => {
    const { buzzid, userid, isLike, isDislike } = req.body;
    const decodedUser = decodeUserID(userid);

    try {
        if (isLike) {
            await Buzzes.updateOne({ buzzid }, { $pull: { like: decodedUser } });
        }

        if (isDislike) {
            await Buzzes.updateOne({ buzzid }, { $pull: { dislike: decodedUser } });
        } else {
            await Buzzes.updateOne({ buzzid }, { $addToSet: { dislike: decodedUser } });
        }

        const buzz = await Buzzes.findOne({ buzzid });

        res.json({ state: true, isLike: false, isDislike: !isDislike, likeCount: buzz.like.length - buzz.dislike.length });

    } catch (err) {
        console.error(err);
        res.status(500).json({ state: false, error: 'Internal Server Error' });
    }
});

// Get Following Buzzes
router.get('/follow', async (req, res) => {
    const { userid } = req.query;
    let decodedUser = decodeUserID(userid);

    try {
        const user = await Users.findOne({ userid: decodedUser })
        const buzzes = await Buzzes.find({ userid: { $in: user.following } })

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
                comment: buzz.comment ? buzz.comment : null,
                rebuzz: buzz.rebuzz,
            };
        }));
        res.send(responseData);

    } catch (error) {
        console.error(error);
        res.status(500).send('Internal server error');
    }
});

// Get User Buzzes
router.get('/user', async (req, res) => {
    const { userid, currentid } = req.query;
    const decodedUser = decodeUserID(currentid);

    try {
        const buzzes = await Buzzes.find({ userid })

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
                comment: buzz.comment ? buzz.comment : null,
                rebuzz: buzz.rebuzz,
            };
        }));
        res.send(responseData);

    } catch (error) {
        console.error(error);
        res.status(500).send('Internal server error');
    }
});


module.exports = router;
