import { Avatar } from '@mui/material'
import React from 'react'

export default function Icon(paras) {

    return (
        <div>
            <Avatar
                src={icon}
                sx={{ width: 50, height: 50, margin: "20px", cursor: "pointer" }}
                onClick={jumpToUserprofile}
            >
                {username[0]}
            </Avatar>
        </div>
    )
}
