import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

export default function ProfileCardItem(props) {
    let { userid, username, icon, numOfFollowing, numOfFollowers, follow } = props
    const [isExecuting, setIsExecuting] = useState(false);
    const [isFollow, setIsFollow] = useState(null);
    const [followersCount, setFollowersCount] = useState(null);
    const [followingCount, setFollowingCount] = useState(null);

    const handleFollow = async () => {
        if (isExecuting) {
            return;
        }
        setIsExecuting(true);
        try {
            const response = await fetch('http://localhost:3000/users/follow', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    targetid: userid,
                    userid: Cookies.get('BuzzerUser'),
                    isFollow,
                    followersCount,
                }),
            });
            const responseData = await response.json();
            if (responseData.state) {
                setIsFollow(responseData.follow);
                setFollowersCount(responseData.numOfFollowers);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setIsExecuting(false);
        }
    }

    useEffect(() => {
        setIsFollow(follow);
        setFollowersCount(numOfFollowers);
        setFollowingCount(numOfFollowing);
    }, [userid]);

    return (
        <div className="card">
            {icon ?
                (
                    <div className="imgBx">
                        <img src={icon}></img>
                    </div>
                )
                :
                (
                    <div className='charBx'
                        style={{
                            background: "#BDBDBD",
                            color: "white",
                        }}>
                        {username[0]}
                    </div>
                )
            }
            < div className="content">
                <div className="details">
                    <h2>{username}<br></br><span>@{userid}</span></h2>
                    <div className="data">
                        {/* <h3>{postsCount}<br></br><span>Posts</span></h3> */}
                        <h3>{followersCount}<br></br><span>Followers</span></h3>
                        <h3>{followingCount}<br></br><span>Following</span></h3>
                    </div>
                    <div className="actionBtn">
                        <div onClick={handleFollow}>
                            {isFollow ?
                                <button>Unfollow</button> : <button>Follow</button>
                            }
                        </div>
                        <Link to={`/user/${userid}`}>
                            <button style={{
                                padding: "15px 25px",
                                borderRadius: "30px",
                                border: "1px solid #1776d2",
                                outline: "none",
                                fontSize: "1em",
                                fontWeight: "500",
                                background: "transparent",
                                color: "#1776d2",
                                cursor: "pointer",
                            }}>Profile</button>
                        </Link>
                    </div>
                </div>
            </div>
        </div >
    )
}
