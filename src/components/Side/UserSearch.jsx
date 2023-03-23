import React from 'react'

// material-ui
import { Box, width } from '@mui/system'

// components
import UserItem from '../Items/UserItem'

const data = [
    {
        uid: 'michaellyu123',
        uname: 'Michael Lyu',
        icon: 'https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg',
    },
    {
        uid: 'irwinking124',
        uname: 'Irwin King',
        icon: 'https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg',
    },
    {
        uid: 'johnlui',
        uname: 'John Lui',
        icon: 'https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg',
    },
    {
        uid: 'michaellyu1234',
        uname: 'Michael Lyu',
        icon: 'https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg',
    },
    {
        uid: 'irwinking1245',
        uname: 'Irwin King',
        icon: 'https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg',
    },
    {
        uid: 'johnlui1',
        uname: 'John Lui',
        icon: 'https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg',
    },
    {
        uid: 'michaellyu1231',
        uname: 'Michael Lyu',
        icon: 'https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg',
    },
    {
        uid: 'irwinking1242',
        uname: 'Irwin King',
        icon: 'https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg',
    },
    {
        uid: 'johnlui4',
        uname: 'John Lui',
        icon: 'https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg',
    },
]

export default function UserSearch(props) {
    let input = props.input

    const filteredData = data.filter(item => item.uname.toLowerCase().includes(input.toLowerCase()))

    return (
        <Box sx={{ height: '80vh', width: '100%' }}>
            {input != '' && <Box sx={{ width: '100%', lineHeight: '20px', fontSize: '20px', textAlign: 'center' }}>
                Search for '{input.slice(0, 15)}{input.length > 15 ? '...' : ''}'
            </Box>}
            {input == '' && <Box sx={{ width: '100%', lineHeight: '20px', fontSize: '20px', textAlign: 'center' }}>
                Recommand for you
            </Box>}

            {filteredData.map(item => (
                <UserItem key={item.uid} userInfo={item} />
            ))}
        </Box>
    )
}
