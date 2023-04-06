var express = require('express');
var router = express.Router();
const { Users } = require('../databaseSchema');
const { decodeUserID } = require('./commonfunct');

router.get('/', async (req, res) => {
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
            { userid: 1, username: 1, avatar: 1, following: 1, followers: 1 }
        );

        userList = userList.filter(user => user.userid !== decodedUser);

        if (keywords == '') {
            console.log('All Recommend')
        }

        responseData = userList.map(user => {
            return {
                userid: user.userid,
                username: user.username.toUpperCase(),
                // avatar: `https://example.com/${user.avatar}`,
                followingCount: user.following.length,
                followersCount: user.followers.length,
                isFollow: user.following.includes(decodedUser.userid)
            };
        });
        res.send(responseData);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal server error');
    }
});

module.exports = router;
