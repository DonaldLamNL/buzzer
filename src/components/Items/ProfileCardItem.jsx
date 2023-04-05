import React from 'react'

export default function ProfileCardItem(props) {
    const { userid, username, icon, followersCount, followingCount, isFollow } = props

    const link = "#/user/" + userid;

    return (
        <div className="card">
            {icon === null ?
                (
                    <div className='charBx'
                        style={{
                            background: "#1776d2",
                            color: "white",
                        }}>
                        {username[0]}
                    </div>

                ) :
                (
                    <div className="imgBx">
                        <img src={icon}></img>
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
                        {isFollow ? 
                            <button>Unfollow</button> : <button>Follow</button>
                        }
                        <a href={link}>
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
                        </a>
                    </div>
                </div>
            </div>
        </div >
    )
}
