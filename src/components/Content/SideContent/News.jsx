import { Box } from '@mui/system'
import { Button, IconButton } from '@mui/material'
import TagIcon from '@mui/icons-material/Tag'

import React from 'react'
import { Link } from 'react-router-dom'

// Demonstrate buzz data
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

const categories = [ 'Food', 'Music', 'Movie', 'News', 'Gaming', 'Business', 'Sport', 'Education', 'Social', 'Blog']

export default function News() {
    return (
        <Box sx={{ height: '80vh', width: '100%' }}>
            <Box sx={{ 
                width: '100%',
                height: '400px',
                borderRadius: '20px',
                boxShadow: '2px 2px 4px rgba(0, 0, 0, 0.2)',
                margin: '20px 0',
                backgroundColor: '#fffbfb'
            }}>
                <h1 style={{ lineHeight: '30px', fontSize: '20px', textAlign: 'center' }} >Popular Buzzes</h1>

                <Box sx={{ width: '100%', height: '300px', lineHeight: '20px', fontSize: '20px', textAlign: 'center' }}>
                    {data.map(p => {
                        return( <Box sx={{ width: '90%', height: '100px', backgroundColor: '#bfa', margin: '10px auto' }}>
                            {/* {p.content.slice(0, 100)} */}
                        </Box>)
                    })}
                </Box>
            </Box>
            <Box sx={{ 
                width: '100%',
                height: '200px',
                borderRadius: '20px',
                boxShadow: '2px 2px 4px rgba(0, 0, 0, 0.2)',
                backgroundColor: '#fffbfb'
            }}>
                <h1 style={{ lineHeight: '30px', fontSize: '20px', textAlign: 'center' }} >Categories</h1>

                <Box sx={{ 
                    width: '100%',
                    height: '300px',
                    textAlign: 'left',
                    display: 'block',
                }}>
                    <Box sx={{width: '90%', margin: '20px auto'}}>
                        {categories.map(c => {
                            return (
                                <Link to={`/search?category=${c.toLowerCase()}`} style={{ margin: '5px', fontSize: '20px', lineHeight: '20px', display: 'inline-block' }}>
                                #{c} 
                                </Link>
                            )
                        })}
                    </Box>
                </Box>

            </Box>
        </Box>
    )
}
