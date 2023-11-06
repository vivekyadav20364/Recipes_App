import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import "../styles/edituser.css";
import isUrl from "is-url";
import { BASE_URL } from "../helper/ref";
import Axios from "axios";
import { useNavigate } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faInstagram,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";

const EditUser = () => {
  const [fullName, setFullName] = useState("");
  const [newUserName, setNewUserName] = useState("");
  const [userBio, setUserBio] = useState("");
  const [facebookURL, setFacebookURL] = useState("");
  const [instagramURL, setInstgramURL] = useState("");
  const [twitterURL, setTwitterURL] = useState("");
  const [showRedWarning, setShowRedWaring] = useState(false);
  const [userNameWarningMessage, setUserNameWarningMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [profileImageUrl, setProfileImageUrl] = useState("");

  const navigate = useNavigate();

  const localData = JSON.parse(localStorage.getItem("userInfoRecipe"));
  const userName = localData.userName;

  // fetch the data from the database if user has already
  // saved his profile before
  useEffect(() => {
    Axios.get(`${BASE_URL}/profile/getProfile`, {
      params: {
        userName: userName,
      },
    })
      .then((response) => {
        const user = response.data[0];
        setFullName(user.fullName);
        setNewUserName(user.userName);
        setUserBio(user.userBio);
        setFacebookURL(user.userSocialLinks[0]);
        setInstgramURL(user.userSocialLinks[1]);
        setTwitterURL(user.userSocialLinks[2]);
        setProfileImageUrl(user.profileImageId);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  function allLinkAreValid() {
    if (facebookURL && !isUrl(facebookURL)) {
      alert("Invalid Facebook Profile Link");
      return 0;
    } else if (instagramURL && !isUrl(instagramURL)) {
      alert("Invalid Instagram Profile Link");
      return 0;
    } else if (twitterURL && !isUrl(twitterURL)) {
      alert("Invalid Twitter Profile Link");
      return 0;
    } else {
      return 1;
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    if (allLinkAreValid() && !showRedWarning) {
      Axios.put(`${BASE_URL}/profile/updateProfile`, {
        userName: userName,
        newUserName: newUserName,
        fullName: fullName,
        userBio: userBio,
        facebookURL: facebookURL,
        instagramURL: instagramURL,
        twitterURL: twitterURL,
        profileImageUrl: profileImageUrl,
      })
        .then((response) => {
          // update the image userName with currently updated userName

          if (userName !== newUserName) {
            Axios.put(`${BASE_URL}/image/profileImageUserNameUpdate`, {
              userName: userName,
              newUserName: newUserName,
            })
              .then((response) => {
                console.log("UPDATE RESPONSE: ", response);
                localData.userName = newUserName;
                localData.fullName = fullName;
                localStorage.setItem(
                  "userInfoRecipe",
                  JSON.stringify(localData)
                );
                setLoading(false);
                navigate(`/aboutuser/${newUserName}`);
              })
              .catch((err) => {
                console.log(err);
              });
          } else {
            localData.userName = newUserName;
            localData.fullName = fullName;
            localStorage.setItem("userInfoRecipe", JSON.stringify(localData));
            navigate(`/aboutuser/${newUserName}`);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
    setLoading(false);
  }

  async function handleFileInputChange(event) {
    event.preventDefault();
    const formData = new FormData();
    formData.append("testImage", event.target.files[0]);

    try {
      const response = await fetch(`${BASE_URL}/image/photo`, {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const blob = await response.blob();
        // create a URL for the blob and log it to the console
        console.log(URL.createObjectURL(blob));
        setProfileImageUrl(URL.createObjectURL(blob));
        console.log("Profile Image Uploaded");
      } else {
        console.log("Image Upload Failed");
      }
    } catch (error) {
      console.error(error);
      console.log("Image Upload Failed");
    }
  }

  function checkUserName(e) {
    setNewUserName(e.target.value);
    if (e.target.value.length > 4) {
      if (e.target.value.match(/^[a-zA-Z0-9]+$/)) {
        setUserNameWarningMessage("");
        setTimeout(() => {
          Axios.post(`${BASE_URL}/user/userInfo`, {
            userName: e.target.value,
          })
            .then((response) => {
              if (response.data.length) {
                setUserNameWarningMessage(
                  "That username has been taken. Please choose another."
                );
                setShowRedWaring(true);
              } else {
                setUserNameWarningMessage(
                  "Congrats! The username is available"
                );
                setShowRedWaring(false);
              }
            })
            .catch((err) => {
              console.log("ERR", err);
            });
        }, 1000);
      } else {
        setUserNameWarningMessage(
          "Your username can only contain letters, numbers and '_'"
        );
        setShowRedWaring(true);
      }
    } else {
      setUserNameWarningMessage(
        "Your username must be longer than 4 characters."
      );
      setShowRedWaring(true);
    }
  }

  function handleUserBioEdit(e) {
    e.preventDefault();

    // if (e.target.value.split(" ").length <= 30) {
    setUserBio(e.target.value);
    // }
  }

  return (
    <>
      <Navbar />
      {loading ? (
        <div className="loader-container">
          <div className="spinner"></div>
        </div>
      ) : (
        <main className="EditUser">
          <form className="formContainer" onSubmit={handleSubmit}>
            <div className="formGroup">
              <label htmlFor="profileImage">Profile Image</label>
              <p
                style={{ color: "coral", fontSize: "15px", fontWeight: "200" }}
              >
                {/* *Image option is disabled due to some technical issue. */}
              </p>
              <input
                type="file"
                id="profileImage"
                onChange={handleFileInputChange}
              />
            </div>
            <div className="formGroup"></div>
            <div className="formGroup">
              <label htmlFor="fullName">Full Name</label>
              <input
                type="text"
                id="fullName"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>
            <div className="formGroup">
              <label htmlFor="userName">Username</label>
              <input
                type="text"
                id="userName"
                value={newUserName}
                onChange={checkUserName}
              />
              <p
                className={
                  showRedWarning ? "userNameExist" : "userNameNotExist"
                }
              >
                {userNameWarningMessage}
              </p>
            </div>
            <div className="formGroup">
              <label htmlFor="userBio">Add Bio</label>
              <textarea
                name=""
                id="userBio"
                cols="30"
                rows="5"
                placeholder="Tell about yourself (max 30 words)"
                value={userBio}
                onChange={handleUserBioEdit}
              ></textarea>
            </div>
            <div className="formGroup socialFormGroup">
              <label htmlFor="facebook">
                <FontAwesomeIcon
                  icon={faFacebook}
                  className="fa-2x icon-hover"
                />
              </label>
              <input
                type="text"
                id="facebook"
                placeholder="Link to facebook profile"
                value={facebookURL}
                onChange={(e) => setFacebookURL(e.target.value)}
              />
            </div>
            <div className="formGroup socialFormGroup">
              <label htmlFor="instagram">
                <FontAwesomeIcon
                  icon={faInstagram}
                  className="fa-2x icon-hover"
                />
              </label>
              <input
                type="text"
                id="instagram"
                placeholder="Link to instagram profile"
                value={instagramURL}
                onChange={(e) => setInstgramURL(e.target.value)}
              />
            </div>
            <div className="formGroup socialFormGroup">
              <label htmlFor="twitter">
                <FontAwesomeIcon
                  icon={faTwitter}
                  className="fa-2x icon-hover"
                />
              </label>
              <input
                type="text"
                id="twitter"
                placeholder="Link to twitter profile"
                value={twitterURL}
                onChange={(e) => setTwitterURL(e.target.value)}
              />
            </div>
            <div className="formGroup">
              <input type="submit" value={"Update"} />
            </div>
          </form>
        </main>
      )}
    </>
  );
};

export default EditUser;
