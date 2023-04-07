import React, { useEffect, useState } from 'react'
import { LinearProgress } from '@mui/material'

// components
import NewBuzzItem from '../Items/NewBuzzItem'
import Post from './Post'
import Cookies from 'js-cookie'

// Get buzzes
export default function Home() {
    const [buzzList, setBuzzList] = useState([]);

    const getBuzzes = async () => {
        try {
            fetch(`http://localhost:3000/buzzes/follow?userid=${Cookies.get('BuzzerUser')}`)
                .then(response => response.json())
                .then(responseData => {
                    setBuzzList(responseData);
                })
                .catch(error => {
                    console.log(error);
                });
        } catch (err) {
            console.error(err);
        }
    }

    useEffect(() => {
        getBuzzes();
    }, []);

    return (
        <div>
            <Post />
            {buzzList && buzzList.map((post) => (
                <NewBuzzItem key={post.buzzid} {...post} />
            ))}
            {/* <LinearProgress /> */}
        </div>
    )
}

