const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const multer = require("multer");
const fs = require("fs");

const ProfileModel = require("../Db/profile");
const UserModel = require("../Db/user");

router.put("/updateProfile", async (req, res) => {
  const userName = req.body.userName;
  const newUserName = req.body.newUserName;
  const fullName = req.body.fullName;
  const userBio = req.body.userBio;
  const facebookURL = req.body.facebookURL;
  const instagramURL = req.body.instagramURL;
  const twitterURL = req.body.twitterURL;
  const profileImageUrl = req.body.profileImageUrl;

  try {
    let profileData = await ProfileModel.find({
      userName: userName,
    });

    profileData[0].userName = newUserName;
    profileData[0].fullName = fullName;
    profileData[0].userBio = userBio;
    profileData[0].userSocialLinks = [facebookURL, instagramURL, twitterURL];
    // update the image when the user has uploaded
    if (profileImageUrl) {
      profileData[0].profileImageUrl = profileImageUrl;
    }

    // updating user
    let userData = await UserModel.find({
      userName: userName,
    });

    userData[0].userName = newUserName;
    userData[0].fullName = fullName;
    userData[0].save();
    profileData[0].save();
    res.send("updated successfully");
  } catch (err) {
    console.log(err);
  }
});

router.get("/getProfile", (req, res) => {
  ProfileModel.find({ userName: req.query.userName }, (err, result) => {
    if (err) res.send("ERR");
    res.send(result);
  });
});

router.get("/getProfileByUserId", (req, res) => {
  ProfileModel.find({ userId: req.query.userId }, (err, result) => {
    if (err) res.send("ERR");
    res.send(result);
  });
});

module.exports = router;
