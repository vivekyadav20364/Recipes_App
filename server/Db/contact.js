const mongoose = require("mongoose");

const ContactSchema = new mongoose.Schema({
  senderFullName: {
    type: String,
    required: true,
  },
  senderEmail: {
    type: String,
    required: true,
  },
  senderMessage: {
    type: String,
    required: true,
  },
});

const Contact = mongoose.model("contact", ContactSchema);
module.exports = Contact;
