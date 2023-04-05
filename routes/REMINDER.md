1. Verifying current user:
    - send the BuzzerUser cookie from frontEnd
        ```react
        // send the cookie value
        userid: Cookies.get('BuzzerUser'),
        ```
    
    - decode it in backend
        ```react
        // import function
        const { decodeUserID } = require('./commonfunct');

        // call decoding function
        userid: decodeUserID(userid),
        ```