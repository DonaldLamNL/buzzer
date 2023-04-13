const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  userid: { type: String, required: true },
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  avatar: {
    name: String,
    data: Buffer,
    contentType: String,
  },
  description: { type: String },
  following: [{ type: String }],
  followers: [{ type: String }],
  favour: [{ type: String }],
  isVerify: { type: Boolean },
  isAdmin: { type: Boolean },
  verificationCode: { type: String },
  bgimage: {
    name: String,
    data: Buffer,
    contentType: String,
  },
});

const buzzSchema = new mongoose.Schema({
  buzzid: { type: Number, required: true },
  userid: { type: String, required: true },
  content: { type: String },
  image: {
    name: String,
    data: Buffer,
    contentType: String,
  },
  video: {
    name: String,
    data: Buffer,
    contentType: String,
  },
  category: { type: String },
  like: [{ type: String }],
  dislike: [{ type: String }],
  comment: [{ type: Number }],
  rebuzz: { type: Number },
});

const hiveSchema = new mongoose.Schema({
  cellid: { type: Number, required: true },
  userid: { type: String, required: true },
  username: { type: String, required: true },
  content: { type: String },
  like: { type: Number },
});

const commentSchema = new mongoose.Schema({
  commentid: { type: Number, required: true },
  buzzid: { type: Number, required: true },
  userid: { type: String, required: true },
  content: { type: String, required: true },
});

const categorySchema = new mongoose.Schema({
  name: { type: String, required: true },
});

const Users = mongoose.model("Users", userSchema);
const Buzzes = mongoose.model("Buzzes", buzzSchema);
const Comments = mongoose.model("Comments", commentSchema);
const Categories = mongoose.model("Categories", categorySchema);
const Hive = mongoose.model("Hive", hiveSchema);

module.exports = {
  Users,
  Buzzes,
  Comments,
  Categories,
  Hive,
};
