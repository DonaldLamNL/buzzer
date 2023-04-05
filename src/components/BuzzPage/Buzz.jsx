// const buzz = {
//     buzzid: 124,
//     like: 143,
//     comment: 534,
//     content: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Mollitia repellat, ad molestiae dolore hic consequatur incidunt facilis modi ea nulla, tempore totam voluptate sequi fugiat saepe quasi officiis ipsa laborum sapiente molestias quia veniam pariatur! Esse exercitationem vel praesentium. Voluptatibus!',
//     image: 'https://p.ipic.vip/e72rar.png',
//     video: null,
//     uid: 'amychan001',
//     uname: 'Amy Chan',
//     isVerify: true,
//     icon: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTabrl2VTWfpp7MbwZp6gVKWPv5C_3Xkx-VlQ&usqp=CAU',
// }

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import NewBuzzItem from '../Items/NewBuzzItem'
import Cookies from 'js-cookie';

export default function Buzz() {
    const { buzzid } = useParams();
    const [buzzData, setBuzzData] = useState(null);

    useEffect(() => {
        fetch(`http://localhost:3000/buzzes?buzzid=${buzzid}&userid=${Cookies.get('BuzzerUser')}`)
            .then(response => response.json())
            .then(data => {
                setBuzzData(data);
            })
            .catch(error => {
                console.log(error);
            });
    }, [buzzid]);

    return (
        <>
            {buzzData && <NewBuzzItem {...buzzData} displayComment={true} />}
        </>
    )
}
