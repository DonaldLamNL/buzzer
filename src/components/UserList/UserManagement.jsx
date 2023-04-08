import { IconButton } from '@mui/material'
import { Box } from '@mui/system'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import React from 'react'

import UserPreview from './UserPreview.jsx'


const users = [
    {
        userid: 'johnlui001',
        username: 'John Lui',
        icon: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbMVxTCb03CByfk6S2yGQJLpyrARrPJofuRg&usqp=CAUU',
        postsCount: 123,
        followersCount: 456,
        followingCount: 789,
        isVerify: false,
        follow: true,
    },
    {
        userid: 'amywong124',
        username: 'Amy Wong',
        icon: null,
        postsCount: 123,
        followersCount: 456,
        followingCount: 789,
        isVerify: true,
        follow: false,
    },
    {
        userid: 'amychan001',
        username: 'Amy Chan',
        icon: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTabrl2VTWfpp7MbwZp6gVKWPv5C_3Xkx-VlQ&usqp=CAU',
        postsCount: 123,
        followersCount: 456,
        followingCount: 789,
        isVerify: true,
        follow: false,
    },
    {
        userid: 'tomlui002',
        username: 'Tom Lui',
        icon: null,
        postsCount: 123,
        followersCount: 456,
        followingCount: 789,
        isVerify: false,
        follow: true,
    },
    {
        userid: 'michaellam331',
        username: 'Michael Lam',
        icon: 'https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg',
        postsCount: 123,
        followersCount: 456,
        followingCount: 789,
        isVerify: true,
        follow: false,
    },
    {
        userid: 'chriswong123',
        username: 'Chris Wong',
        icon: null,
        postsCount: 123,
        followersCount: 456,
        followingCount: 789,
        isVerify: true,
        follow: true,
    },
    {
        userid: 'jimmylau342',
        username: 'Jimmy Lau',
        icon: null,
        postsCount: 123,
        followersCount: 456,
        followingCount: 789,
        isVerify: false,
        follow: false,
    },
    {
        userid: 'irwinking1242',
        username: 'Irwin King',
        icon: 'https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg',
        postsCount: 123,
        followersCount: 456,
        followingCount: 789,
        isVerify: false,
        follow: true,
    },
    {
        userid: 'johnlui4',
        username: 'John Lui',
        icon: 'https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg',
        postsCount: 123,
        followersCount: 456,
        followingCount: 789,
        isVerify: false,
        follow: true,
    },
    {
        userid: "elonmusk103",
        username: "Elon Musk",
        icon: "ElonMusk.jpg",
        postsCount: 123,
        followersCount: 456,
        followingCount: 789,
        isVerify: true,
        follow: true,
    },
]

export default function UserManagement() {

    return (
        <Box sx={{ width: '90%' }}>
            <Box>
                {users.map(c => {
                    return (
                        <UserPreview key={c.userid} {...c} isDelete={true} />
                    )
                })}
            </Box>
        </Box>

    )
}
