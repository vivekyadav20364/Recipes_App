const mongoose = require("mongoose");

const ProfileImageSchema = new mongoose.Schema({
  userName:{
    type: String, 
    required: true, 
  },    
  img: {
    data: Buffer,
    contentType: String,
  },
});

const Image = mongoose.model("profileimages", ProfileImageSchema);
module.exports = Image;
