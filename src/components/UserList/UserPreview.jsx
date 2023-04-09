import { CheckCircle } from '@mui/icons-material'
import { Avatar, Typography, Button } from '@mui/material'
import { Box } from '@mui/system'
import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react'

export default function UserPreview(props) {

    const { userid, username, icon, follow, isDelete = false, isVerify, deletedUser } = props;
    const [isExecuting, setIsExecuting] = useState(false);
    const [isFollow, setIsFollow] = useState(null);
    const [isUserVerified, setIsUserVerified] = useState(null);

    const handleFollowButton = () => {
        handleFollow();
    }

    const deleteUserComfirm = async (e) => {
        const result = window.confirm(`Are you sure to delete @${userid}?`);
        if (result) {
            try {
                const response = await fetch('http://localhost:3000/admin/delete', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ userid: Cookies.get('BuzzerUser'), targetid: userid })
                });

                const data = await response.json();

                deletedUser(userid);

                if (data.state) {
                    alert('User deleted successfully');
                } else {
                    alert('Failed to delete user');
                }

            } catch (error) {
                console.error(error);
                alert('An error occurred while deleting user');
            }
        }
    }


    const verifyUserComfirm = async (e) => {
        let result = null;
        if (isUserVerified) {
            result = window.confirm(`Are you sure to unverify @${userid}?`);
        } else {
            result = window.confirm(`Are you sure to verify @${userid}?`);
        }

        if (result) {
            console.log('yes');
            try {
                const response = await fetch('http://localhost:3000/admin/verify', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ userid: Cookies.get('BuzzerUser'), targetid: userid })
                });

                const data = await response.json();

                setIsUserVerified(!isUserVerified);

                if (data.state) {
                    alert('User update successfully');
                } else {
                    alert('Failed to update user');
                }
            } catch (error) {
                console.error(error);
                alert('An error occurred while updating user');
            }
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
        setIsFollow(follow);
        setIsUserVerified(isVerify);
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
                            {isUserVerified && (
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
                            <Button variant="contained" sx={{ borderRadius: '18px', }} onClick={verifyUserComfirm}>{isUserVerified ? 'UnVerify' : 'Verify'}</Button>
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
