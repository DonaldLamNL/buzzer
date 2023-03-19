import { Box, width } from '@mui/system'
import React from 'react'
import UserItem from './UserItem'

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
    }
]

export default function UserSearch(props) {
    let input = props.input

    const filteredData = data.filter(item => item.uname.toLowerCase().includes(input.toLowerCase()));

    return (
        <div style={{ height: '100px', width: '100%' }}>
            {input != '' && <Box sx={{
                paddingLeft: '20px',
                height: '20px',
                width: '100%',
                lineHeight: '20px',
                fontSize: '20px',
                whiteSpace: 'pre-wrap',
                textOverflow: 'ellipsis',
            }}>
                Search for '{input.slice(0, 15)}{input.length > 15 ? '...' : ''}'
            </Box>}

            {filteredData.map(item => (
                <UserItem key={item.uid} userInfo={item} />
            ))}
        </div>
    )
}
