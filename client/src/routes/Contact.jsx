import React from "react";
import Navbar from "../components/Navbar";
import ContactUs from "../components/ContactUs";

const Contact = () => {
  return (
    <div>
      <Navbar active={"contact"} />
      <ContactUs />
    </div>
  );
};

export default Contact;
