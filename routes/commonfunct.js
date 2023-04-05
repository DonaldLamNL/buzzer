const jwt = require('jsonwebtoken');

function decodeUserID(token){
    const JWT_SECRET = '12345';
    const decodedUserID = jwt.verify(token, JWT_SECRET);
    return decodedUserID.userid;
}

module.exports = {
    decodeUserID
};
