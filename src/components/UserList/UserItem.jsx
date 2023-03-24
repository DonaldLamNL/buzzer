import { Avatar, Typography, Button } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'

export default function UserItem(props) {
    const { uid, uname, icon, description, isFollow, isDelete = false } = props

    const handleButton = () => {
        if (isDelete) {
            alert(`bye bye ${uname}`)
            return
        }
        // handle follow state
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
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <Box sx={{ height: '60px', }}>
                        <Typography sx={{ fontSize: '18px', lineHeight: '46px' }}>{uname} </Typography>
                        <Typography sx={{ fontSize: '14px', lineHeight: '0', color: '#7e7e7e' }}>@{uid}</Typography>
                    </Box>
                </Box>

                {/* Button */}
                {isDelete ?
                    <Box sx={{ display: 'flex', alignItems: 'center', marginLeft: 'auto' }}>
                        <Button variant="contained" color="primary" sx={{ borderRadius: '18px' }} onClick={handleButton}>Delete</Button>
                    </Box>
                    :
                    <Box sx={{ display: 'flex', alignItems: 'center', marginLeft: 'auto' }}>
                        <Button variant="contained" color="primary" sx={{ borderRadius: '18px' }} onClick={handleButton}>{isFollow ? 'unfollow' : 'follow'}</Button>
                    </Box>
                }
            </Box>
            <Box margin={'0 0 20px 70px'}>{description}</Box>
        </Box>
    )
}
