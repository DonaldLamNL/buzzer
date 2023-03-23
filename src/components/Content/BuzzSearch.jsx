import React, { useState, useEffect } from 'react'

// material-ui
import { LinearProgress } from '@mui/material'

// components
import Buzz from './MainContent/BuzzItem'

const data = [
    {
        pid: 123,
        like: 123,
        comment: 456,
        content: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Excepturi voluptate exercitationem molestiae sunt, esse, officia saepe reiciendis id odio error eveniet dolorem consequuntur natus, optio temporibus accusamus quae aut alias eos eius adipisci deleniti pariatur suscipit minus? At laboriosam labore voluptas consectetur fugiat nostrum. Dolor laborum nostrum quas eos a.',
        image: 'https://p.ipic.vip/9j6cd6.png',
        video: null,
        uid: 'michaellyu123',
        uname: 'Michael Lyu',
        icon: 'https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg',
    },
    {
        pid: 124,
        like: 143,
        comment: 534,
        content: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Excepturi voluptate exercitationem molestiae sunt, esse, officia saepe reiciendis id odio error eveniet dolorem consequuntur natus, optio temporibus accusamus quae aut alias eos eius adipisci deleniti pariatur suscipit minus? At laboriosam labore voluptas consectetur fugiat nostrum. Dolor laborum nostrum quas eos a.',
        image: 'https://p.ipic.vip/e72rar.png',
        video: null,
        uid: 'irwinking124',
        uname: 'Irwin King',
        icon: 'https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg',
    },
    {
        pid: 125,
        like: 324,
        comment: 635,
        content: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Excepturi voluptate exercitationem molestiae sunt, esse, officia saepe reiciendis id odio error eveniet dolorem consequuntur natus, optio temporibus accusamus quae aut alias eos eius adipisci deleniti pariatur suscipit minus? At laboriosam labore voluptas consectetur fugiat nostrum. Dolor laborum nostrum quas eos a.',
        image: 'https://p.ipic.vip/phxapn.png',
        video: null,
        uid: 'johnlui',
        uname: 'John Lui',
        icon: 'https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg',
    },
]

export default function BuzzSearch() {
    const [searchKey, setSearchKey] = useState('')
    const urlParams = new URLSearchParams(window.location.search)
  
    useEffect(() => {
        let urlParams = new URLSearchParams(window.location.search)
        let searchValue = urlParams.get('search')
        setSearchKey(searchValue)
    }, [urlParams])
    

    return (
        <div>
            <h1 style={{ height: '40px', lineHeight: '40px', fontSize: '20px', textAlign: 'center', marginTop: '20px' }}>Searching for {searchKey}...</h1>
            {data.map((post) => (
                <Buzz key={post.pid} {...post} />
            ))}
            <LinearProgress />
        </div>
    )
}
