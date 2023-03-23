import React from 'react'
import BuzzItem from '../Items/BuzzItem'

const buzz = {
    pid: 124,
    like: 143,
    comment: 534,
    content: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Excepturi voluptate exercitationem molestiae sunt, esse, officia saepe reiciendis id odio error eveniet dolorem consequuntur natus, optio temporibus accusamus quae aut alias eos eius adipisci deleniti pariatur suscipit minus? At laboriosam labore voluptas consectetur fugiat nostrum. Dolor laborum nostrum quas eos a.',
    image: 'https://p.ipic.vip/e72rar.png',
    video: null,
    uid: 'irwinking124',
    uname: 'Irwin King',
    icon: 'https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg',
}

export default function Buzz() {
  return (
    <BuzzItem {...buzz} displayComment = {true} />
  )
}
