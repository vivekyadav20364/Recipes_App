import React, { useEffect, useState } from "react";
import Axios from "axios";
import "../styles/user.css";
import { BASE_URL } from "../helper/ref.js";
import { NavLink } from "react-router-dom";
import Avatar from "react-avatar";

const User = () => {
  const [fullName, setFullName] = useState("");
  const [userName, setUserName] = useState("");
  const [profileImageUrl, setProfileImageUrl] = useState("");

  let localData = JSON.parse(localStorage.getItem("userInfoRecipe"));
  useEffect(() => {
    if (localData) {
      console.log("ypoo!");
      if (localData) {
        Axios.get(`${BASE_URL}/profile/getProfile`, {
          params: {
            userName: localData.userName,
          },
        })
          .then((response) => {
            console.log(response.data[0]);
            setFullName(response.data[0].fullName);
            setUserName(response.data[0].userName);
            setProfileImageUrl(response.data[0].profileImageUrl);
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        setFullName(localData.fullName);
        setUserName(localData.userName);
      }
    } else {
      setFullName("Guest User");
      setUserName("guest");
    }
  }, []);

  return (
    <div className="userProfile">
      <>
        <div className="imageContainer">
          {profileImageUrl ? (
            <img src={profileImageUrl} alt={localData.userName} />
          ) : (
            <Avatar name={fullName} size="50" round={true} src="" />
          )}
        </div>
        <div className="userDataContainer">
          <div className="user">
            {" "}
            {fullName.length ? fullName.split(" ")[0] : "..."}{" "}
          </div>
          <div className="username">
            @
            {userName.length ? (
              <NavLink to={localData ? `/aboutuser/${userName}` : "/login"}>
                {userName}
              </NavLink>
            ) : (
              "..."
            )}
          </div>
        </div>
      </>
      {/* )} */}
    </div>
  );
};

export default User;
