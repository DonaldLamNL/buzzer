var express = require('express');
var router = express.Router();
const { Buzzes, Categories } = require('../databaseSchema');
const { decodeUserID } = require('./commonfunct');
const multer = require('multer');
const upload = multer();

// Get Categories
router.get('/', async (req, res) => {
    try {
      const categories = await Categories.find({});
      const responseData = await Promise.all(
        categories.map(async c => {
          const count = await Buzzes.countDocuments({ category: c.name });
          return { name: c.name, count };
        })
      );
      res.json(responseData);
    } catch (error) {
      console.log(error);
      res.status(500).send('Internal Server Error');
    }
  });
  

module.exports = router;
