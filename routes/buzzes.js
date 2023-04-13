var express = require("express");
var router = express.Router();
const { Buzzes, Users } = require("../databaseSchema");
const { decodeUserID, replaceMentions } = require("./commonfunct");

const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Buzz Page
router.get("/", async (req, res) => {
  const { buzzid, userid } = req.query;
  let decodedUser = decodeUserID(userid);

  try {
    const buzz = await Buzzes.findOne({ buzzid });
    const userLike = buzz.like.includes(decodedUser)
      ? 1
      : buzz.dislike.includes(decodedUser)
        ? -1
        : 0;
    const author = await Users.findOne({ userid: buzz.userid });
    const responseData = {
      buzzid,
      userLike,
      userid: buzz.userid,
      username: author.username,
      icon: author.avatar ? author.avatar.name : null,
      isVerify: author.isVerify ? author.isVerify : false,
      content: buzz.content,
      category: buzz.category,
      numOfLike: buzz.like.length - buzz.dislike.length,
      image: buzz.image ? buzz.image.name : null,
      video: buzz.video ? buzz.video.name : null,
      comment: buzz.comment ? buzz.comment : null,
      commentCount: buzz.comment.length,
      rebuzz: buzz.rebuzz,
    };
    res.send(responseData);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
});

// Posting System
router.post(
  "/post",
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "video", maxCount: 1 },
  ]),
  async (req, res) => {
    const { content, category, userid, rebuzz } = req.body;
    const decodedUser = decodeUserID(userid);
    const rebuzzid = isNaN(rebuzz) ? 0 : parseInt(rebuzz);

    try {
      // Generate new buzzid
      const replacedContent = await replaceMentions(content);
      const highestBuzz = await Buzzes.findOne().sort({ buzzid: -1 }).exec();
      const newBuzzid = highestBuzz ? highestBuzz.buzzid + 1 : 1;

      const newBuzz = new Buzzes({
        buzzid: newBuzzid,
        userid: decodedUser,
        content: replacedContent,
        category,
        like: [],
        dislike: [],
        comment: [],
        rebuzz: rebuzzid,
      });

      // Check contains image / video
      if (req.files.image) {
        const { originalname, buffer, mimetype } = req.files.image[0];
        newBuzz.image = {
          name: Math.random(100000000) + originalname,
          data: buffer,
          contentType: mimetype,
        };
      }
      if (req.files.video) {
        const { originalname, buffer, mimetype } = req.files.video[0];
        newBuzz.video = {
          name: Math.random(100000000) + originalname,
          data: buffer,
          contentType: mimetype,
        };
      }

      await newBuzz.save();
      res.send({
        state: true,
        message: "Buzz post successfully!",
        buzzid: newBuzzid,
      });
    } catch (err) {
      console.error(err);
      res.send({ state: false, message: "Failed to post Buzz." });
    }
  }
);

// Buzz Searching System
router.get("/search", async (req, res) => {
  const { keywords, userid } = req.query;
  const decodedUser = decodeUserID(userid);

  // Check category search
  const categorySearch = keywords && keywords[0] == "*" ? true : false;
  try {
    let buzzes;
    if (categorySearch) {
      buzzes = await Buzzes.find({
        category: keywords.substring(1),
      });
    } else {
      buzzes = await Buzzes.find({
        content: { $regex: keywords, $options: "i" },
      });
    }

    const responseData = await getBuzzesList(buzzes, decodedUser);

    res.send(responseData);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
});

// Like Button
router.post("/like", async (req, res) => {
  const { buzzid, userid, isLike, isDislike } = req.body;
  const decodedUser = decodeUserID(userid);

  try {
    if (isDislike) {
      await Buzzes.updateOne({ buzzid }, { $pull: { dislike: decodedUser } });
    }

    if (isLike) {
      await Buzzes.updateOne({ buzzid }, { $pull: { like: decodedUser } });
    } else {
      await Buzzes.updateOne({ buzzid }, { $addToSet: { like: decodedUser } });
    }

    const buzz = await Buzzes.findOne({ buzzid });

    res.json({
      state: true,
      isLike: !isLike,
      isDislike: false,
      likeCount: buzz.like.length - buzz.dislike.length,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ state: false, error: "Internal Server Error" });
  }
});

// Dislike Button
router.post("/dislike", async (req, res) => {
  const { buzzid, userid, isLike, isDislike } = req.body;
  const decodedUser = decodeUserID(userid);

  try {
    if (isLike) {
      await Buzzes.updateOne({ buzzid }, { $pull: { like: decodedUser } });
    }

    if (isDislike) {
      await Buzzes.updateOne({ buzzid }, { $pull: { dislike: decodedUser } });
    } else {
      await Buzzes.updateOne(
        { buzzid },
        { $addToSet: { dislike: decodedUser } }
      );
    }

    const buzz = await Buzzes.findOne({ buzzid });

    res.json({
      state: true,
      isLike: false,
      isDislike: !isDislike,
      likeCount: buzz.like.length - buzz.dislike.length,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ state: false, error: "Internal Server Error" });
  }
});

const getBuzzesList = async (buzzes, decodedUser) => {
  try {
    const responseData = await Promise.all(
      buzzes.map(async (buzz) => {
        const userLike = buzz.like.includes(decodedUser)
          ? 1
          : buzz.dislike.includes(decodedUser)
            ? -1
            : 0;
        const author = await Users.findOne({ userid: buzz.userid });
        return {
          buzzid: buzz.buzzid,
          userLike,
          userid: buzz.userid,
          username: author.username,
          icon: author.avatar ? author.avatar.name : null,
          isVerify: author.isVerify ? author.isVerify : null,
          content: buzz.content,
          category: buzz.category,
          numOfLike: buzz.like.length - buzz.dislike.length,
          image: buzz.image ? buzz.image.name : null,
          video: buzz.video ? buzz.video.name : null,
          comment: buzz.comment ? buzz.comment : null,
          commentCount: buzz.comment.length,
          rebuzz: buzz.rebuzz,
        };
      })
    );
    return responseData;
  } catch (error) {
    console.error(error);
    return {};
  }
};

router.get("/follow", async (req, res) => {
  const { userid } = req.query;
  let decodedUser = decodeUserID(userid);

  try {
    const user = await Users.findOne({ userid: decodedUser });
    const buzzes = await Buzzes.find({ userid: { $in: user.following } });
    // if (buzzes.length < 10) {
    //     const randomBuzzes = await Buzzes.aggregate([
    //         {
    //             $match: {
    //                 userid: { $nin: [decodedUser, ...user.following] },
    //                 buzzid: { $nin: buzzes.map(buzz => buzz.buzzid) }
    //             }
    //         },
    //         { $sample: { size: 10 - buzzes.length } }
    //     ]);
    //     buzzes.push(...randomBuzzes);

    // }
    const responseData = await getBuzzesList(buzzes, decodedUser);
    res.send(responseData);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
});

router.get("/home", async (req, res) => {
  const { userid } = req.query;
  let decodedUser = decodeUserID(userid);

  try {
    // const user = await Users.find({ userid: decodedUser });
    const buzzes = await Buzzes.find();
    const randomElements = [];
    const numberOfElementsToSelect = 10;

    if (buzzes.length <= 10) {
      var responseData = await getBuzzesList(buzzes, decodedUser);
    } else {
      while (randomElements.length < numberOfElementsToSelect) {
        const randomIndex = Math.floor(Math.random() * buzzes.length);
        const randomElement = buzzes[randomIndex];

        if (!randomElements.includes(randomElement)) {
          randomElements.push(randomElement);
        }
      }
      responseData = await getBuzzesList(randomElements, decodedUser);
    }
    res.send(responseData);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
});

// Get User Buzzes
router.get("/user", async (req, res) => {
  const { userid, currentid } = req.query;
  const decodedUser = decodeUserID(currentid);

  try {
    const buzzes = await Buzzes.find({ userid });
    const responseData = await getBuzzesList(buzzes, decodedUser);
    res.send(responseData);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
});

// Image Endpoint
router.get("/image/:imageName", async (req, res) => {
  const { imageName } = req.params;

  try {
    const buzz = await Buzzes.findOne({ "image.name": imageName });
    if (buzz) {
      res.contentType(buzz.image.contentType);
      res.send(buzz.image.data);
    } else {
      res.status(404).send("Image not found");
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
});

// Video Endpoint
router.get("/video/:videoName", async (req, res) => {
  const { videoName } = req.params;

  try {
    const buzz = await Buzzes.findOne({ "video.name": videoName });
    if (buzz) {
      res.contentType(buzz.video.contentType);
      res.send(buzz.video.data);
    } else {
      res.status(404).send("Video not found");
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
