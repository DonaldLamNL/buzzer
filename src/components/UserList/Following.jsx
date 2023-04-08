import { Box } from '@mui/system'
import React, { useEffect, useState } from 'react'
import UserPreview from './UserPreview.jsx'
import Cookies from 'js-cookie';

export default function Following(props) {
    const { userid } = props;
    const [UserList, setUserList] = useState([]);

    const getFollowers = async () => {
        try {
            const response = await fetch(`http://localhost:3000/users/followlist?userid=${userid}&currentid=${Cookies.get('BuzzerUser')}&type=${'following'}`);
            const data = await response.json();
            setUserList(data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getFollowers();
    }, []);

    return (
        <Box>
            {UserList && UserList.map(c => {
                return (
                    <UserPreview key={c.userid} {...c} />
                )
            })}
        </Box>
    )
}
