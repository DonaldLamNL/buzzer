var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

/* GET users listing. */
router.get('/', (req, res, next) => {
  const input = req.query.input;
  res.send({input});
});

module.exports = router;
