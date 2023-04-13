import { Avatar } from '@mui/material'
import React, { useEffect, useState } from 'react'
import serverPath from '../../ServerPath';

export default function BuzzIcon(paras) {
    const { userid, username, icon } = paras;
    const [iconDisplay, setIconDisplay] = useState(null);

    const getIcon = async (imageName) => {
        if (imageName) {
            fetch(`${serverPath}/users/icon/${imageName}`)
                .then((response) => response.blob())
                .then((image) => {
                    setIconDisplay(URL.createObjectURL(image));
                })
                .catch((error) => {
                    console.log(error);
                });
        } else {
            setIconDisplay(null);
        }
    };

    const jumpToUserprofile = () => {
        if (!userid) {
            return;
        }
        navigate(`/user/${userid}`);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };


    useEffect(() => {
        console.log(paras)
        getIcon(icon);
    }, [icon]);

    return (
        <div>
            <Avatar
                src={iconDisplay}
                sx={{ width: 50, height: 50, margin: "20px", cursor: "pointer" }}
                onClick={jumpToUserprofile}
            >
                {!icon && username ? username[0] : null}
            </Avatar>
        </div>
    )
}
