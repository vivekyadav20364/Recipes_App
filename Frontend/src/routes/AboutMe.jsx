import React, { useEffect, useState } from "react";
import "../styles/aboutme.css";
import Navbar from "../components/Navbar";
import Avatar from "react-avatar";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLinkedinIn,
  faInstagram,
  faTwitter,
  faGithub,
  faCodepen,
} from "@fortawesome/free-brands-svg-icons";

import { faCode } from "@fortawesome/free-solid-svg-icons";

function AboutMe() {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(false);
  }, []);

  return (
    <div className="AboutMe">
      {loading ? (
        <div className="loader-container">
          <div className="spinner"></div>
        </div>
      ) : (
        <>
          <Navbar active={"aboutme"} />
          <div className="aboutMeContainer">
            <div className="avatarContainer">
              <Avatar size="200" round={true} />
            </div>
            {/* <div className="nameContainer">vivek</div> */}
            <div className="aboutMeText">
              <p>
                Welcome to my recipe website! My name is Vivek, and I'm the
                developer of this website. I am from Mughalsarai, Uttar Pradesh, India. I'm a final year IT student with a passion for web developement in MERN technologies. 
              </p>
              <p>
                I'm always looking for new challenges and
                opportunities to apply my skills and knowledge. I'm open to
                collaborating with other developers and designers, and I'm
                excited to work on projects that have a positive impact on
                society.
              </p>
              <p>
                Thank you for taking the time to read about me. If
                you're interested in learning more about my experiences or
                collaborating on a project, please don't hesitate to reach out.
                I'm looking forward to hearing from you!
              </p>
            </div>
            <div className="socialMediaLinkContainer">
              <a
                href={"https://www.linkedin.com/in/vivek-kumar-yadav-70651320b/"}
                target="_black"
                rel="noopener noreferrer"
              >
                <FontAwesomeIcon
                  icon={faLinkedinIn}
                  className="fa-2x icon-hover"
                />
              </a>
              <a
                href={"https://www.instagram.com/vivek_yadav__vk/?hl=en"}
                target="_black"
                rel="noopener noreferrer"
              >
                <FontAwesomeIcon
                  icon={faInstagram}
                  className="fa-2x icon-hover"
                />
              </a>
              <a
                href={"https://twitter.com/Vivekmgs"}
                target="_black"
                rel="noopener noreferrer"
              >
                <FontAwesomeIcon
                  icon={faTwitter}
                  className="fa-2x icon-hover"
                />
              </a>
              <a
                href={"https://github.com/vivekyadav20364"}
                target="_black"
                rel="noopener noreferrer"
              >
                <FontAwesomeIcon icon={faGithub} className="fa-2x icon-hover" />
              </a>
             
              <a
                href={"https://auth.geeksforgeeks.org/user/vivekmgs27/practice"}
                target="_black"
                rel="noopener noreferrer"
              >
                <FontAwesomeIcon icon={faCode} className="fa-2x icon-hover" />
              </a>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default AboutMe;