var express = require('express');
var router = express.Router();
const { Users } = require('../databaseSchema');
const { decodeUserID } = require('./commonfunct');

const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Function to generate an array of unique random integers
function getRandomIntegers(min, max, count, exclude) {
    const randomIntegers = new Set();
    while (randomIntegers.size < count) {
        const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
        if (!exclude.includes(randomNumber)) {
            randomIntegers.add(randomNumber);
        }
    }
    return Array.from(randomIntegers);
}

// User Searching System
router.get('/search', async (req, res) => {
    const { keywords, userid } = req.query;
    let decodedUser = decodeUserID(userid);
    let searchQuery = {};

    if (keywords.startsWith('@')) {
        searchQuery.userid = { $regex: keywords.slice(1), $options: 'i' };
    } else {
        searchQuery.username = { $regex: keywords, $options: 'i' };
    }

    try {
        let userList = await Users.find(
            searchQuery,
            { userid: 1, username: 1, avatar: 1, following: 1, followers: 1, isVerify: 1 }
        );

        userList = userList.filter(user => user.userid !== decodedUser);

        if (keywords == '') {
            // const decodedUserIndex = userList.findIndex(user => user.userid === decodedUser);
            // const randomIndices = getRandomIntegers(0, userList.length - 1, 10, [decodedUserIndex]);
            // userList = randomIndices.map(index => userList[index]);
        }

        responseData = userList.map(user => {
            return {
                userid: user.userid,
                username: user.username.toUpperCase(),
                // icon: `https://example.com/${user.avatar}`,
                numOfFollowing: user.following.length,
                numOfFollowers: user.followers.length,
                follow: user.followers.includes(decodedUser),
                isVerify: user.isVerify,
            };
        });
        res.send(responseData);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal server error');
    }
});

// Get Current User
router.get('/currentuser', async (req, res) => {
    const { userid } = req.query;
    let decodedUser = decodeUserID(userid);
    let isLogin = decodedUser ? true : false;
    if (isLogin) {
        try {
            const user = await Users.findOne({ userid: decodedUser });
            if (user) {
                res.send({ status: true, isLogin, username: user.username, icon: user.icon, userid: decodedUser, isVerify: user.isVerify });
            } else {
                res.send({ status: false, message: 'User not found' });
            }
        } catch (error) {
            res.send({ status: false, message: 'Error fetching user' });
        }
    } else {
        res.send({ status: true, isLogin });
    }
});

// Follow User
router.post('/follow', async (req, res) => {
    const { userid, targetid, isFollow, followersCount } = req.body;
    let decodedUser = decodeUserID(userid);

    if (isFollow) {
        // Unfollow
        await Users.updateOne({ userid: decodedUser }, { $pull: { following: targetid } });
        await Users.updateOne({ userid: targetid }, { $pull: { followers: decodedUser } });
    } else {
        // Follow
        await Users.updateOne({ userid: decodedUser }, { $addToSet: { following: targetid } });
        await Users.updateOne({ userid: targetid }, { $addToSet: { followers: decodedUser } });
    }

    res.json({ state: true, follow: !isFollow, numOfFollowers: isFollow ? followersCount - 1 : followersCount + 1 });

});

// Get User Profile
router.get('/userprofile', async (req, res) => {
    const { userid, currentid } = req.query;
    const decodedUser = decodeUserID(currentid);
    const isCurrentUser = userid == decodedUser ? true : false;

    try {
        const user = await Users.findOne({ userid });

        const responseData = {
            userInfo: {
                userid,
                username: user.username,
                description: user.description,
                avatar: user.avatar,
                followersCount: user.followers.length,
                followingCount: user.following.length,
                isVerify: user.isVerify,
                isFollow: isCurrentUser ? null : user.followers.includes(decodedUser),
                isCurrentUser,
                isAdmin: user.isAdmin,
                isVerify: user.isVerify,
                bgimage: user.bgimage ? user.bgimage.name : null,
            },
            state: true,
        }

        res.send(responseData)
    } catch (error) {
        res.send({ state: false, message: 'Error fetching user' });
    }
});

// Get Followers / Following
router.get('/followlist', async (req, res) => {
    const { userid, currentid, type } = req.query;
    const decodedUser = decodeUserID(currentid);

    try {
        const user = await Users.findOne({ userid });
        const currentUser = await Users.findOne({ userid: decodedUser });

        let userList = user.followers;
        if (type == "following") {
            userList = user.following;
        }

        const responseData = [];
        for (const uid of userList) {
            try {
                if (uid == decodedUser) continue;
                const target = await Users.findOne({ userid: uid });
                responseData.push({
                    userid: target.userid,
                    username: target.username,
                    icon: target.avatar,
                    isVerify: target.isVerify,
                    follow: currentUser.following.includes(target.userid),
                });
            } catch (e) {
                console.error(e);
            }
        }

        res.send(responseData);

    } catch (error) {
        console.error(error);
        res.status(500).send('Internal server error');
    }
})

// Post background image
router.post('/bgimage', upload.fields([{ name: 'image', maxCount: 1 }]), async (req, res) => {
    const { userid } = req.body;
    const decodedUser = decodeUserID(userid);

    try {
        const user = await Users.findOne({ userid: decodedUser });

        if (req.files.image) {
            const { originalname, buffer, mimetype } = req.files.image[0];
            user.bgimage = {
                name: Math.random(100000000) + originalname,
                data: buffer,
                contentType: mimetype,
            };
        }

        await user.save();
        res.send({ state: true, message: 'Buzz post successfully!' });
    } catch (err) {
        console.error(err);
        res.send({ state: false, message: 'Failed to post Buzz.' });
    }
})

// Image Endpoint
router.get('/bgimage/:imageName', async (req, res) => {
    const { imageName } = req.params;

    try {
        const user = await Users.findOne({ 'bgimage.name': imageName });
        if (user) {
            res.contentType(user.bgimage.contentType);
            res.send(user.bgimage.data);
        } else {
            res.status(404).send('Image not found');
        }
    } catch (error) {
        console.log(error);
        res.status(500).send('Internal Server Error');
    }
});

// Get User All Info
router.get('/userinfo', async (req, res) => {
    const { userid } = req.query;
    const decodedUser = decodeUserID(userid);

    try {
        const user = await Users.findOne({ userid: decodedUser });

        const responseData = {
            userInfo: {
                userid: decodedUser,
                email: user.email,
                username: user.username,
                description: user.description,
                avatar: user.avatar,
                isVerify: user.isVerify,
                bgimage: user.bgimage ? user.bgimage.name : null,
            },
            state: true,
        }

        res.send(responseData)
    } catch (error) {
        res.send({ state: false, message: 'Error fetching user' });
    }
});

// User profile update
router.post("/update", async (req, res) => {
    const { userid, username, description } = req.body;
    const decodedUser = decodeUserID(userid);
    console.log(req.body)
    try {
        const user = await Users.findOne({ userid: decodedUser });
        if (!user) {
            console.log("User not found");
            return res.status(400).json({ state: false, message: "User not found" });
        }

        user.username = username;
        user.description = description;

        await user.save();

        res.json({ state: true, message: "Profile updated successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ state: false, message: "Internal Server Error" });
    }
});

module.exports = router;
