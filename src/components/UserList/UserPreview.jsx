import { Avatar, Typography, Button } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'

export default function UserItem(props) {

    const { uid, uname, icon, description, isFollow, isDelete = false } = props

    const handleFollowButton = () => {
        if (isDelete) {
            alert(`bye bye ${uname}`)
            return
        }
        // handle follow state
    }

    const deleteUserComfirm = (e) => {
        const result = window.confirm(`Are you sure to delete @${uid}?`);
        if (result) {
            console.log('yes');
        }
    }
    const verifyUserComfirm = (e) => {
        const result = window.confirm(`Are you sure to verify @${uid}?`);
        if (result) {
            console.log('yes');
        }
    }

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
                        {uname[0]}
                    </Avatar>
                </Box>

                {/* Info */}
                <Box sx={{ display: 'flex', flexDirection: 'column', }}>
                    <Box sx={{ height: '60px', }}>
                        <Typography sx={{ fontSize: '18px', lineHeight: '46px' }}>{uname} </Typography>
                        <Typography sx={{ fontSize: '14px', lineHeight: '0', color: '#7e7e7e' }}>@{uid}</Typography>
                    </Box>
                </Box>

                {/* Button */}
                {isDelete ?
                    <Box sx={{ display: 'flex', }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', marginLeft: 'auto' }}>
                            <Button variant="contained" sx={{ borderRadius: '18px', }} onClick={verifyUserComfirm}>Verify</Button>
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
            <Box margin={'0 0 20px 70px'}>{description}</Box>
        </Box>
    )
}
