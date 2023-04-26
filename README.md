# Buzzer server
- CSCI3100 Software Enigeering Group Project in the 2022-2023 2nd semester
- Project Name: Buzzer
- Project Group: A1
- Author:
    - LAM Man Ho <1155159171@link.cuhk.edu.hk>
    - MA Yu Ying <1155157879@link.cuhk.edu.hk>
    - CHEUNG Ka Ho <1155158622@link.cuhk.edu.hk>
    - FUNG Ngai Man <1155158312@link.cuhk.edu.hk>
    - LI Eric John <1155159116@link.cuhk.edu.hk>
- Project Description: 
    Buzzer is a microblogging and social networking service that allows users to share their thoughts, opinions, and ideas in real-time. Inspired by the popular platform Twitter, Buzzer boasts a sleek and intuitive interface that allows users to easily engage with their friends, family, and followers.

    With Buzzer, users can create profiles, post updates, share photos and videos, follow other users, and engage in conversations on a variety of topics. The platform features a powerful search function that allows users to discover new content and find others with similar interests.


## General info
This file is the server side of Buzzer. The codes are mainly in the routes folder. We used Node.js as the tool for the server and Mongo database for the database server. Here is the [client](https://github.com/DonaldLamNL/buzzer/tree/frontEnd) side of this project.

## Setup
Clone the project from github
```bash
$ git clone -b server git@github.com:DonaldLamNL/buzzer.git server
```

To launch this project in local (defaultly open in local port: 3000), install it using `npm`
```bash
$ npm i
$ DEBUG=server:* npm start
```

If npm install ERROR, the following statements can solve the npm install package problem.
```bash
$ sudo chown -R 501:20 "/Users/[Username]/.npm"
```
or
```bash
$ sudo npm start
```

## Catalogue
```
.
├── bin
│   └── www
├── dist
│   └── ...
├── node_modules
│   └── ...
├── public
│   └── ...
├── routes
│   ├── account.js
│   ├── admin.js
│   ├── buzzes.js
│   ├── categories.js
│   ├── comments.js
│   ├── commentfunct.js
│   ├── hive.js
│   ├── index.js
│   └── users.js
├── views
│   ├── error.pug
│   ├── index.pug
│   └── layout.pug
├── app.js
├── databaseSchema.js
├── package-lock.json
├── package.json
└── README.md
```