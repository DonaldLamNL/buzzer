import { IconButton } from '@mui/material'
import { Box } from '@mui/system'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import React from 'react'

import BuzzPreview from './BuzzPreview'

// Demonstrate buzz data
const data = [
    {
        pid: 123,
        like: 123,
        comment: 456,
        content: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Excepturi voluptate exercitationem molestiae sunt, esse, officia saepe reiciendis id odio error eveniet dolorem consequuntur natus, optio temporibus accusamus quae aut alias eos eius adipisci deleniti pariatur suscipit minus? At laboriosam labore voluptas consectetur fugiat nostrum. Dolor laborum nostrum quas eos a.',
        image: null,
        video: null,
        uid: 'johnlui001',
        uname: 'John Lui',
        isVerify: false,
        icon: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbMVxTCb03CByfk6S2yGQJLpyrARrPJofuRg&usqp=CAUU',
    },
    {
        pid: 124,
        like: 143,
        comment: 534,
        content: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Mollitia repellat, ad molestiae dolore hic consequatur incidunt facilis modi ea nulla, tempore totam voluptate sequi fugiat saepe quasi officiis ipsa laborum sapiente molestias quia veniam pariatur! Esse exercitationem vel praesentium. Voluptatibus!',
        image: 'https://p.ipic.vip/e72rar.png',
        video: null,
        uid: 'amychan001',
        uname: 'Amy Chan',
        isVerify: true,
        icon: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTabrl2VTWfpp7MbwZp6gVKWPv5C_3Xkx-VlQ&usqp=CAU',
    },
    {
        pid: 125,
        like: 324,
        comment: 635,
        content: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Excepturi voluptate exercitationem molestiae sunt, esse, officia saepe reiciendis id odio error eveniet dolorem consequuntur natus, optio temporibus accusamus quae aut alias eos eius adipisci deleniti pariatur suscipit minus? At laboriosam labore voluptas consectetur fugiat nostrum. Dolor laborum nostrum quas eos a.',
        image: 'https://p.ipic.vip/phxapn.png',
        video: null,
        uid: 'tomlui002',
        uname: 'Tom Lui',
        isVerify: false,
        icon: null,
    },
]

export default function BuzzManagement() {
    return (
        <Box sx={{ width: '100%' }}>
            <Box >
                {data.map(c => {
                    return (
                        <BuzzPreview key={c.uid} {...c} isDelete={true} />
                    )
                })}
            </Box>
        </Box>

    )
}
