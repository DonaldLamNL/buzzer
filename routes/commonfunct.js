const jwt = require('jsonwebtoken');

function decodeUserID(token){
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


module.exports = {
    decodeUserID
};
