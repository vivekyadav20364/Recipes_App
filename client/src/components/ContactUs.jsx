import React, { useState } from "react";
import "../styles/contactus.css";
import { BASE_URL } from "../helper/ref";
import Axios from "axios"

const ContactUs = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    Axios.post(`${BASE_URL}/contact/contactMe`, {
      fullName: fullName, 
      email: email, 
      message: message,
    }).then((response) => {
      //nothing...
    }).catch((err) => {
      console.log(err);
    })
  }

  return (
    <div className="contactUs">
      <form className="inputContainer" onSubmit={handleSubmit}>
        <input
          placeholder="Full name"
          onChange={(e) => setFullName(e.target.value)}
        />
        <input placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
        <textarea
          placeholder="Message"
          rows={7}
          onChange={(e) => setMessage(e.target.value)}
        ></textarea>
        <button>Send</button>
      </form>
    </div>
  );
};

export default ContactUs;
