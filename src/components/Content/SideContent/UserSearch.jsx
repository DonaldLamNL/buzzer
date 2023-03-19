import React from 'react'

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

export default function UserSearch() {
    return (
        <div style={{height: '100px', width: '100%', backgroundColor:'#bfa'}}>
        User searching results (default user recommendation)
        </div>
    )
}
