import { IconButton } from '@mui/material'
import { Box } from '@mui/system'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import React from 'react'

import UserItem from './UserPreview.jsx'


const users = [
    {
        uid: 'johnlui001',
        uname: 'John Lui',
        icon: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbMVxTCb03CByfk6S2yGQJLpyrARrPJofuRg&usqp=CAUU',
        postsCount: 123,
        followersCount: 456,
        followingCount: 789,
        isFollow: true
    },
    {
        uid: 'amywong124',
        uname: 'Amy Wong',
        icon: null,
        postsCount: 123,
        followersCount: 456,
        followingCount: 789,
        isFollow: false
    },
    {
        uid: 'amychan001',
        uname: 'Amy Chan',
        icon: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTabrl2VTWfpp7MbwZp6gVKWPv5C_3Xkx-VlQ&usqp=CAU',
        postsCount: 123,
        followersCount: 456,
        followingCount: 789,
        isFollow: false
    },
    {
        uid: 'tomlui002',
        uname: 'Tom Lui',
        icon: null,
        postsCount: 123,
        followersCount: 456,
        followingCount: 789,
        isFollow: true
    },
    {
        uid: 'michaellam331',
        uname: 'Michael Lam',
        icon: 'https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg',
        postsCount: 123,
        followersCount: 456,
        followingCount: 789,
        isFollow: false
    },
    {
        uid: 'chriswong123',
        uname: 'Chris Wong',
        icon: null,
        postsCount: 123,
        followersCount: 456,
        followingCount: 789,
        isFollow: true
    },
    {
        uid: 'jimmylau342',
        uname: 'Jimmy Lau',
        icon: null,
        postsCount: 123,
        followersCount: 456,
        followingCount: 789,
        isFollow: false
    },
    {
        uid: 'irwinking1242',
        uname: 'Irwin King',
        icon: 'https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg',
        postsCount: 123,
        followersCount: 456,
        followingCount: 789,
        isFollow: true
    },
    {
        uid: 'johnlui4',
        uname: 'John Lui',
        icon: 'https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg',
        postsCount: 123,
        followersCount: 456,
        followingCount: 789,
        isFollow: true
    },
    {
        uid: "elonmusk103",
        uname: "Elon Musk",
        icon: "ElonMusk.jpg",
        postsCount: 123,
        followersCount: 456,
        followingCount: 789,
        isFollow: true
    },
]

export default function UserManagement() {

    return (
        <Box sx={{ width: '90%' }}>
            <Box>
                {users.map(c => {
                    return (
                        <UserItem key={c.uid} {...c} isDelete={true} />
                    )
                })}
            </Box>
        </Box>

    )
}
