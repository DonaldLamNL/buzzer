import React from 'react'

// material-ui
import { Box, width } from '@mui/system'
import { Stack } from '@mui/material'

// components
import ProfileCardItem from '../Items/ProfileCardItem'

const users = [
    {
        uid: 'johnlui001',
        uname: 'John Lui',
        icon: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbMVxTCb03CByfk6S2yGQJLpyrARrPJofuRg&usqp=CAUU',
        postsCount: 123,
        followersCount: 456,
        followingCount: 789,
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, se do eiusmod tempor incididunt ut labore et dolore magnaaliqua.",
    },
    {
        uid: 'amywong124',
        uname: 'Amy Wong',
        icon: null,
        postsCount: 123,
        followersCount: 456,
        followingCount: 789,
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, se do eiusmod tempor incididunt ut labore et dolore magnaaliqua.",
    },
    {
        uid: 'amychan001',
        uname: 'Amy Chan',
        icon: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTabrl2VTWfpp7MbwZp6gVKWPv5C_3Xkx-VlQ&usqp=CAU',
        postsCount: 123,
        followersCount: 456,
        followingCount: 789,
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, se do eiusmod tempor incididunt ut labore et dolore magnaaliqua.",
    },
    {
        uid: 'tomlui002',
        uname: 'Tom Lui',
        icon: null,
        postsCount: 123,
        followersCount: 456,
        followingCount: 789,
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, se do eiusmod tempor incididunt ut labore et dolore magnaaliqua.",
    },
    {
        uid: 'michaellam331',
        uname: 'Michael Lam',
        icon: 'https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg',
        postsCount: 123,
        followersCount: 456,
        followingCount: 789,
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, se do eiusmod tempor incididunt ut labore et dolore magnaaliqua.",
    },
    {
        uid: 'chriswong123',
        uname: 'Chris Wong',
        icon: null,
        postsCount: 123,
        followersCount: 456,
        followingCount: 789,
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, se do eiusmod tempor incididunt ut labore et dolore magnaaliqua.",
    },
    {
        uid: 'jimmylau342',
        uname: 'Jimmy Lau',
        icon: null,
        postsCount: 123,
        followersCount: 456,
        followingCount: 789,
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, se do eiusmod tempor incididunt ut labore et dolore magnaaliqua.",
    },
    {
        uid: 'irwinking1242',
        uname: 'Irwin King',
        icon: 'https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg',
        postsCount: 123,
        followersCount: 456,
        followingCount: 789,
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, se do eiusmod tempor incididunt ut labore et dolore magnaaliqua.",
    },
    {
        uid: 'johnlui4',
        uname: 'John Lui',
        icon: 'https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg',
        postsCount: 123,
        followersCount: 456,
        followingCount: 789,
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, se do eiusmod tempor incididunt ut labore et dolore magnaaliqua.",
    },
    {
        uid: "elonmusk103",
        uname: "Elon Musk",
        icon: "ElonMusk.jpg",
        postsCount: 123,
        followersCount: 456,
        followingCount: 789,
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, se do eiusmod tempor incididunt ut labore et dolore magnaaliqua.",
    },
]

export { users };

export default function UserSearch(props) {
    let input = props.input
    const filteredData = users.filter(item => item.uname.toLowerCase().includes(input.toLowerCase()))

    return (
        <Box
            sx={{
                height: '90vh',
                width: '100%',
            }}>
            {input != '' && <Box sx={{ width: '100%', lineHeight: '20px', fontSize: '20px', textAlign: 'center' }}>
                Search for '{input.slice(0, 15)}{input.length > 15 ? '...' : ''}'
            </Box>}
            {input == '' && <Box sx={{ width: '100%', lineHeight: '20px', fontSize: '20px', textAlign: 'center' }}>
                Recommand for you
            </Box>}

            {filteredData.map((item) => (
                <ProfileCardItem key={item.uid} {...item} />
            ))}

            <Box sx={{
                height: "100px",
            }}>
                
            </Box>
        </Box>
    )
}
