import { Box } from '@mui/system'
import React from 'react'

import UserItem from './UserItem.jsx'


const data = [
    {
        uid: 'michaellyu123',
        uname: 'Michael Lyu',
        icon: 'https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium excepturi sed odit fuga repellendus! Facere nam sequi eum quasi nisi!',
        isFollow: true,
    },
    {
        uid: 'irwinking124',
        uname: 'Irwin King',
        icon: 'https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium excepturi sed odit fuga repellendus! Facere nam sequi eum quasi nisi!',
        isFollow: false,
    },
    {
        uid: 'johnlui',
        uname: 'John Lui',
        icon: 'https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium excepturi sed odit fuga repellendus! Facere nam sequi eum quasi nisi!',
        isFollow: true,
    },
    {
        uid: 'michaellyu1234',
        uname: 'Michael Lyu',
        icon: 'https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium excepturi sed odit fuga repellendus! Facere nam sequi eum quasi nisi!',
        isFollow: true,
    },
    {
        uid: 'irwinking1245',
        uname: 'Irwin King',
        icon: 'https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium excepturi sed odit fuga repellendus! Facere nam sequi eum quasi nisi!',
        isFollow: true,
    },
    {
        uid: 'johnlui1',
        uname: 'John Lui',
        icon: 'https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium excepturi sed odit fuga repellendus! Facere nam sequi eum quasi nisi!',
        isFollow: false,
    },
    {
        uid: 'michaellyu1231',
        uname: 'Michael Lyu',
        icon: 'https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium excepturi sed odit fuga repellendus! Facere nam sequi eum quasi nisi!',
        isFollow: true,
    },
    {
        uid: 'irwinking1242',
        uname: 'Irwin King',
        icon: 'https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium excepturi sed odit fuga repellendus! Facere nam sequi eum quasi nisi!',
        isFollow: true,
    },
    {
        uid: 'johnlui4',
        uname: 'John Lui',
        icon: 'https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium excepturi sed odit fuga repellendus! Facere nam sequi eum quasi nisi!',
        isFollow: true,
    },
]

export default function Follower() {
    return (
        <Box>
            {data.map(c => {
                return (
                    <UserItem key={c.uid} {...c} />
                )
            })}
        </Box>
    )
}
