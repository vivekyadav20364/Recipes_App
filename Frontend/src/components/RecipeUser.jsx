import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import "../styles/recipeUser.css";
import Axios from "axios";
import { BASE_URL } from "../helper/ref";
// import ProfileImage from "../helper/profile1.png";
import Avatar from "react-avatar";

const RecipeUser = ({ userId, recipeSaveTime }) => {
  const date = new Date(recipeSaveTime);
  const month = date.toLocaleString("default", { month: "short" });

  const [userName, setUserName] = useState("");
  const [fullName, setFullName] = useState("");
  const [profileImageUrl, setProfileImageUrl] = useState("");

  useEffect(() => {
    Axios.get(`${BASE_URL}/profile/getProfileByUserId`, {
      params: {
        userId: userId,
      },
    })
      .then((response) => {
        console.log(response);
        setUserName(response.data[0].userName);
        setFullName(response.data[0].fullName);
        setProfileImageUrl(response.data[0].profileImageUrl);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <NavLink to={"/aboutuser/" + userName}>
      <div className="userRecipeProfile">
        <div className="imageContainer">
          {profileImageUrl && profileImageUrl.length ? (
            <img src={profileImageUrl} alt={userName} />
          ) : (
            <Avatar
              color={Avatar.getRandomColor("sitebase", [
                "red",
                "green",
                "blue",
                "pink",
                "yellow",
              ])}
              name={fullName}
              size="40"
              round={true}
              src=""
            />
          )}
        </div>
        <div className="userDataContainer">
          <div className="user"> {fullName} </div>
          <div className="username">
            {date.getDate()} {month}, {date.getFullYear()}
          </div>
        </div>
      </div>
    </NavLink>
  );
};

export default RecipeUser;
