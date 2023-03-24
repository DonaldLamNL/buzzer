import React from 'react'

export default function ProfileCardItem(props) {
    const { uid, uname, icon, postsCount, followersCount, followingCount } = props

    return (
        <div className="card">
            <div className="imgBx">
                <img src={icon}></img>
            </div>
            <div className="content">
                <div className="details">
                    <h2>{uname}<br></br><span>@{uid}</span></h2>
                    <div className="data">
                        <h3>{postsCount}<br></br><span>Posts</span></h3>
                        <h3>{followersCount}<br></br><span>Followers</span></h3>
                        <h3>{followingCount}<br></br><span>Following</span></h3>
                    </div>
                    <div className="actionBtn">
                        <button>Follow</button>
                        <button>Profile</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
