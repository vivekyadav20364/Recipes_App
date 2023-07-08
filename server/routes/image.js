const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const multer = require("multer");
const fs = require("fs");
const path = require("path");

const ProfileImageModel = require("../Db/profileimage");

const { MongoClient, GridFSBucket } = require("mongodb");

require("dotenv").config();
const databaseUrl = process.env.DATABASE_URL;

const upload = multer({ dest: "uploads/" });
router.post("/photo", upload.single("testImage"), async (req, res) => {
  try {
    const client = await MongoClient.connect(databaseUrl);
    const db = client.db("recipeapp2");
    const bucket = new GridFSBucket(db);
    const uploadStream = bucket.openUploadStream(req.file.originalname);
    const readStream = fs.createReadStream(req.file.path);
    readStream.pipe(uploadStream);
    uploadStream.on("finish", () => {
      fs.unlink(req.file.path, () => {
        // retrieve the saved file from GridFSBucket and send it as a response
        const downloadStream = bucket.openDownloadStreamByName(
          req.file.originalname
        );
        res.set("Content-Type", req.file.mimetype);
        downloadStream.pipe(res);
        downloadStream.on("end", () => {
          client.close();
        });
      });
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

router.post(
  "/profileImageUpload",
  upload.single("profileImage"),
  (req, res) => {
    let fileName = req.file.filename;

    ProfileImageModel.find({ userName: req.body.userName }, (err, result) => {
      if (err) res.send("ERROR");

      if (result.length) {
        result[0].img = {
          data: fs.readFileSync("uploads/" + fileName),
          contentType: "image/png",
        };
        result[0]
          .save()
          .then((response) => {
            fs.unlink("uploads/" + fileName, (err) => {
              if (err) {
                res.send("Error to update new image...");
              }
            });
            res.send(response);
          })
          .catch((err) => {
            res.send("error to save");
          });
      } else {
        const saveImage = new ProfileImageModel({
          userName: req.body.userName,
          img: {
            data: fs.readFileSync("uploads/" + fileName),
            contentType: "image/png",
          },
        });

        saveImage
          .save()
          .then((response) => {
            fs.unlink("uploads/" + fileName, (err) => {
              if (err) {
                res.send("error to save the new image");
              }
            });
            res.send(response);
          })
          .catch((err) => {
            res.send("error to save");
          });
      }
    });
  }
);

router.get("/getImage", async (req, res) => {
  let recipeImageId = req.query.recipeImageId;
  if (recipeImageId) {
    let result = await ImageModel.find({
      _id: recipeImageId,
    });

    try {
      res.send(result);
    } catch (e) {
      res.send(e);
    }
  } else {
    res.send("EMPTY");
  }
});

router.get("/profileImage", async (req, res) => {
  let userName = req.query.userName;
  ProfileImageModel.find(
    {
      userName: userName,
    },
    (err, result) => {
      if (err) res.send("ERROR");
      res.send(result);
    }
  );
});

router.put("/profileImageUserNameUpdate", async (req, res) => {
  let userName = req.body.userName;
  let newUserName = req.body.newUserName;

  try {
    let profileImageData = await ProfileImageModel.find({
      userName: userName,
    });
    if (profileImageData.length) {
      profileImageData[0].userName = newUserName;
      profileImageData[0].save();
    }
    res.send(profileImageData);
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
