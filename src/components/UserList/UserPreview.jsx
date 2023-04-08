import { CheckCircle } from '@mui/icons-material'
import { Avatar, Typography, Button } from '@mui/material'
import { Box } from '@mui/system'
import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react'

export default function UserPreview(props) {

    const { userid, username, icon, follow, isDelete = false, isVerify } = props;
    const [isExecuting, setIsExecuting] = useState(false);
    const [isFollow, setIsFollow] = useState(null);

    const handleFollowButton = () => {
        handleFollow();
    }

    const deleteUserComfirm = (e) => {
        const result = window.confirm(`Are you sure to delete @${userid}?`);
        if (result) {
            console.log('yes');
        }
    }

    const verifyUserComfirm = (e) => {
        if(isVerify){
            const result = window.confirm(`Are you sure to unverify @${userid}?`);
        }else{
            const result = window.confirm(`Are you sure to verify @${userid}?`);
        }
        if (result) {
            console.log('yes');
        }
    }

    const handleFollow = async () => {
        if (isExecuting) {
            return;
        }
        setIsExecuting(true);
        try {
            const response = await fetch('http://localhost:3000/users/follow', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    targetid: userid,
                    userid: Cookies.get('BuzzerUser'),
                    isFollow,
                }),
            });
            const responseData = await response.json();
            if (responseData.state) {
                setIsFollow(responseData.follow);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setIsExecuting(false);
        }
    }

    useEffect(() => {
        setIsFollow(follow)
    }, []);

    return (
        <Box>
            <Box sx={{
                display: 'flex',
                width: '100%',
                position: 'relative',
                justifyContent: 'space-between',
            }}>
                {/* Icon */}
                <Box sx={{ width: '70px' }}>
                    <Avatar
                        src={icon}
                        sx={{ width: 40, height: 40, margin: '15px' }}
                    >
                        {username[0]}
                    </Avatar>
                </Box>

                {/* Info */}
                <Box sx={{ display: 'flex', flexDirection: 'column', }}>
                    <Box sx={{ height: '60px', }}>
                        <Typography sx={{ fontSize: '18px', lineHeight: '46px' }}>
                            {username}
                            {isVerify && (
                                <CheckCircle sx={{ color: 'orange', ml: 1 }} />
                            )}
                        </Typography>
                        <Typography sx={{ fontSize: '14px', lineHeight: '0', color: '#7e7e7e' }}>@{userid}</Typography>
                    </Box>
                </Box>

                {/* Button */}
                {isDelete ?
                    <Box sx={{ display: 'flex', }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', marginLeft: 'auto' }}>
                            <Button variant="contained" sx={{ borderRadius: '18px', }} onClick={verifyUserComfirm}>{isVerify ? 'UnVerify' : 'Verify'}</Button>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', marginLeft: '5px' }}>
                            <Button variant="contained" color="secondary" sx={{ borderRadius: '18px', bgcolor: 'error.main', '&:hover': { bgcolor: 'error.dark' } }} onClick={deleteUserComfirm}>Delete</Button>
                        </Box>
                    </Box>
                    :
                    <Box sx={{ display: 'flex', alignItems: 'center', marginLeft: 'auto' }}>
                        <Button variant="contained" color="primary" sx={{ borderRadius: '18px' }} onClick={handleFollowButton}>{isFollow ? 'unfollow' : 'follow'}</Button>
                    </Box>

                }
            </Box>
        </Box>
    )
}
