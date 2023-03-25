import React from 'react'
import BuzzItem from '../Items/BuzzItem'

const buzz = {
  pid: 124,
  like: 143,
  comment: 534,
  content: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Mollitia repellat, ad molestiae dolore hic consequatur incidunt facilis modi ea nulla, tempore totam voluptate sequi fugiat saepe quasi officiis ipsa laborum sapiente molestias quia veniam pariatur! Esse exercitationem vel praesentium. Voluptatibus!',
  image: 'https://p.ipic.vip/e72rar.png',
  video: null,
  uid: 'amychan001',
  uname: 'Amy Chan',
  icon: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTabrl2VTWfpp7MbwZp6gVKWPv5C_3Xkx-VlQ&usqp=CAU',
}

export default function Buzz() {
  return (
    <BuzzItem {...buzz} displayComment={true} />
  )
}
