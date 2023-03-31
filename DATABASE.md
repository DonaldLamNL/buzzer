# Users
- uid: INT
- uname: STRING
- email: STRING
- password: STRING
- avater: URL
- description: STRING
- following: [uid]
- count
- follower: [uid]
- count
- favour: [uid]
- isVerify: BOOL
- chatted: [uid]
- sendHive: BOOL

# Buzz
- bid: INT
- uid: INT
- like: [uid]
- dislike: [uid]
- content: STRING
- image: URL
- video: URL
- categeory: STRING
- rebuzz: bid

# Comment
- cid
- bid
- user_id
- author_id
- content

# Chat Room
- rid
- user1
- user2
- chat: [{content, time, sender}, {}]

# Hive
- hid
- uid
- content
- like: []