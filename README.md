# Buzzer
- CSCI3100 Software Enigeering Group Project in the 2022-2023 2nd semester
- Project Name: Buzzer
- Project Group: A1
- Authors:
    - LAM Man Ho <1155159171@link.cuhk.edu.hk>
    - MA Yu Ying <1155157879@link.cuhk.edu.hk>
    - CHEUNG Ka Ho <1155158622@link.cuhk.edu.hk>
    - FUNG Ngai Man <1155158312@link.cuhk.edu.hk>
    - LI Eric John <1155159116@link.cuhk.edu.hk>
- Project Description: 
    Buzzer is a microblogging and social networking service that allows users to share their thoughts, opinions, and ideas in real-time. Inspired by the popular platform Twitter, Buzzer boasts a sleek and intuitive interface that allows users to easily engage with their friends, family, and followers.

    With Buzzer, users can create profiles, post updates, share photos and videos, follow other users, and engage in conversations on a variety of topics. The platform features a powerful search function that allows users to discover new content and find others with similar interests.


## General info
This file is the cliend side of Buzzer. The codes are mainly in the src folder. We used react.js as the tool for the user interface. Documents about the project are in the document folder. 

## Setup
Please make sure the server was launched, you can change the server path in ServerPath.jsx in src folder. You can also launch the server in local. Here is the [server](https://github.com/DonaldLamNL/buzzer/tree/server) side of this project.

To launch this project in local, install it using `yarn`
```bash
$ yarn
$ yarn dev
```

## Catalogue
```
.
├── images
│   └── ...
├── node_modules
│   └── ...
├── public
│   └── ...
├── src
│   ├── components
│   │   ├── BuzzFollowing
│   │   │   └── BuzzFollowing.jsx
│   │   ├── BuzzPage
│   │   │   ├── Buzz.jsx
│   │   │   └── Comment.jsx
│   │   ├── ChatRoom
│   │   │   ├── ChatBox.jsx
│   │   │   ├── ChatBubble.jsx
│   │   │   ├── ChatRoom.jsx
│   │   │   └── FriendList.jsx
│   │   ├── Home
│   │   │   ├── Home.jsx
│   │   │   └── Post.jsx
│   │   ├── Items
│   │   │   ├── BuzzIcon.jsx
│   │   │   ├── BuzzItem.jsx
│   │   │   ├── NavItem.jsx
│   │   │   ├── NewBuzzItem.jsx
│   │   │   ├── ProfileCardItem.jsx
│   │   │   ├── RebuzzContent.jsx
│   │   │   └── UserItem.jsx
│   │   ├── Searching
│   │   │   └── BuzzSearch.jsx
│   │   ├── Side
│   │   │   ├── News.jsx
│   │   │   ├── SideContent.jsx
│   │   │   └── UserSearch.jsx
│   │   ├── User
│   │   │   ├── EditProfile.jsx
│   │   │   ├── ForgotPassword.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── NewEditProfile.jsx
│   │   │   ├── ResetPassword.jsx
│   │   │   ├── Signup.jsx
│   │   │   └── UserProfile.jsx
│   │   ├── UserList
│   │   │   ├── Admin.jsx
│   │   │   ├── BuzzManagement.jsx
│   │   │   ├── BuzzPreview.jsx
│   │   │   ├── Follower.jsx
│   │   │   ├── Following.jsx
│   │   │   ├── UserList.jsx
│   │   │   ├── UserManagement.jsx
│   │   │   └── UserPreview.jsx
│   │   ├── ChatButton.jsx
│   │   ├── Hive.jsx
│   │   ├── HoneyColorPalette.css
│   │   ├── Main.jsx
│   │   └── Nav.jsx
│   ├── App.jsx
│   ├── index.css
│   ├── main.jsx
│   ├── router.jsx
│   └── ServerPath.jsx
├── document
│   ├── DFD Specification Document.pdf
│   ├── High-Level Design Document.pdf
│   └── UML Specification and UI Design Document.pdf
├── index.html
├── package-lock.json
├── package.json
├── README.md
└── vite.config.js
```