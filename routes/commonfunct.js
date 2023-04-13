const { Users } = require('../databaseSchema');
const jwt = require('jsonwebtoken');

// Decode userid
function decodeUserID(token) {
    try {
        const JWT_SECRET = '12345';
        const decodedUserID = jwt.verify(token, JWT_SECRET);
        return decodedUserID.userid;
    } catch (error) {
        if (error instanceof jwt.JsonWebTokenError) {
            console.error('Invalid JWT:', error.message);
        } else {
            console.error('Error:', error.message);
        }
        return null;
    }
}

// Replace the '@' content
const replaceMentions = async (content) => {
    const regex = /@(\w+)/g;
    let replacedContent = content;
    let matches = regex.exec(content);
    while (matches !== null) {
        const userid = matches[1];
        const user = await Users.findOne({ userid });
        if (user) {
            replacedContent = replacedContent.replace(`@${userid}`, `%@${user.userid}%`);
        }
        matches = regex.exec(content);
    }
    return replacedContent;
};

module.exports = {
    decodeUserID,
    replaceMentions
};
