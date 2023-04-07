import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

// material-ui
import { Typography } from '@mui/material';

// components
import NewBuzzItem from '../Items/NewBuzzItem';
import Cookies from 'js-cookie';

export default function BuzzSearch() {
    const { search } = useParams();
    const [buzzList, setBuzzList] = useState([]);
    const [filteredData, setFilteredData] = useState([]);

    const searchBuzz = async () => {
        try {
            fetch(`http://localhost:3000/buzzes/search?keywords=${search}&userid=${Cookies.get('BuzzerUser')}`)
                .then(response => response.json())
                .then(data => {
                    setBuzzList(data);
                })
                .catch(error => {
                    console.log(error);
                });
        } catch (err) {
            console.error(err);
        }
    }

    useEffect(() => {
        searchBuzz();
    }, [search]);

    return (
        <div>
            <h1 style={{ height: '40px', lineHeight: '40px', fontSize: '20px', textAlign: 'center', marginTop: '20px' }}
                onClick={() => { console.log(buzzList) }}
            >
                Search for {search[0] === '*' ? `${search.slice(1).charAt(0).toUpperCase()}${search.slice(2)} Category` : ` ${search} buzzes ...`}
            </h1>

            {buzzList ? (
                <>
                    {buzzList.map((post) => (
                        <NewBuzzItem
                            key={post.buzzid}
                            {...post}
                            content={post.content.replace(
                                new RegExp(`(${search})`, 'gi'),
                                '<span style="background-color: #FFFF00;">$1</span>'
                            )}
                        />
                    ))}
                </>
            ) : (
                <Typography variant="h6" align="center" mt={2}>
                    No search results found.
                </Typography>
            )}
        </div>
    );
}