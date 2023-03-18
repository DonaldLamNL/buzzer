import React, { Component } from 'react'
import Buzz from './MainContent/Buzz'
import PostBuzz from './MainContent/Post'
import { LinearProgress } from '@mui/material'

export default function MainContent() {
    // Demonstrate buzz data
    const data = [
        {
            pid: 123,
            like: 123,
            comment: 456,
            icon: 'https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg',
            content: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Excepturi voluptate exercitationem molestiae sunt, esse, officia saepe reiciendis id odio error eveniet dolorem consequuntur natus, optio temporibus accusamus quae aut alias eos eius adipisci deleniti pariatur suscipit minus? At laboriosam labore voluptas consectetur fugiat nostrum. Dolor laborum nostrum quas eos a.',
            image: 'https://p.ipic.vip/9j6cd6.png',
            video: null,
            uid: 'michaellyu123',
            uname: 'Michael Lyu',
        },
        {
            pid: 124,
            like: 143,
            comment: 534,
            icon: 'https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg',
            content: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Excepturi voluptate exercitationem molestiae sunt, esse, officia saepe reiciendis id odio error eveniet dolorem consequuntur natus, optio temporibus accusamus quae aut alias eos eius adipisci deleniti pariatur suscipit minus? At laboriosam labore voluptas consectetur fugiat nostrum. Dolor laborum nostrum quas eos a.',
            image: 'https://p.ipic.vip/9j6cd6.png',
            video: null,
            uid: 'irwinking124',
            uname: 'Irwin King',
        },
        {
            pid: 125,
            like: 324,
            comment: 635,
            icon: 'https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg',
            content: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Excepturi voluptate exercitationem molestiae sunt, esse, officia saepe reiciendis id odio error eveniet dolorem consequuntur natus, optio temporibus accusamus quae aut alias eos eius adipisci deleniti pariatur suscipit minus? At laboriosam labore voluptas consectetur fugiat nostrum. Dolor laborum nostrum quas eos a.',
            image: 'https://p.ipic.vip/9j6cd6.png',
            video: null,
            uid: 'johnlui',
            uname: 'John Lui',
        },
    ]
    return (
        <div>
            <PostBuzz />
            {data.map((post) => (
                <Buzz key={post.pid} {...post} />
            ))}
            <LinearProgress />
        </div>
    )
}

