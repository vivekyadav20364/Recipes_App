import React, { useState, useEffect } from "react";
import Recipe from "./Recipe";
import { BASE_URL } from "../helper/ref";
import Axios from "axios";
import Profile from "../helper/profile1.png";
import "../styles/userInfo.css";
import Avatar from "react-avatar";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faInstagram,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";

import { faPencil } from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom";

const UserInfo = ({ userData, allUserRecipes }) => {
  let localData = JSON.parse(localStorage.getItem("userInfoRecipe"));

  console.log(userData);

  return (
    <>
      <div className="UserInfo">
        <div className="topSection">
          <div className="left">
            {userData.profileImageUrl &&
            userData.profileImageUrl.length !== 0 ? (
              <img src={userData.profileImageUrl} alt={userData.fullName} />
            ) : (
              <Avatar
                color={Avatar.getRandomColor("sitebase", [
                  "red",
                  "green",
                  "blue",
                ])}
                name={userData.fullName}
                size="200"
                round={true}
                src=""
              />
            )}
          </div>
          <div className="right">
            <h1>{userData.fullName}</h1>
            <h3 className="userName">@{userData.userName}</h3>
            <p>{userData.userBio}</p>
            <div className="socialMediaLinkContainer">
              <a
                href={
                  userData.userSocialLinks[0]
                    ? userData.userSocialLinks[0]
                    : "#"
                }
                target={userData.userSocialLinks[0] ? "_black" : ""}
                rel="noopener noreferrer"
              >
                <FontAwesomeIcon
                  icon={faFacebook}
                  className="fa-2x icon-hover"
                />
              </a>
              <a
                href={
                  userData.userSocialLinks[1]
                    ? userData.userSocialLinks[1]
                    : "#"
                }
                target={userData.userSocialLinks[1] ? "_black" : ""}
                rel="noopener noreferrer"
              >
                <FontAwesomeIcon
                  icon={faInstagram}
                  className="fa-2x icon-hover"
                />
              </a>

              <a
                href={
                  userData.userSocialLinks[2]
                    ? userData.userSocialLinks[2]
                    : "#"
                }
                target={userData.userSocialLinks[2] ? "_black" : ""}
                rel="noopener noreferrer"
              >
                <FontAwesomeIcon
                  icon={faTwitter}
                  className="fa-2x icon-hover"
                />
              </a>
            </div>
            {localData && userData.userName === localData.userName ? (
              <NavLink
                className={"editLink"}
                to={"/aboutrecipe/edit/" + userData.userName}
              >
                Edit Profile <FontAwesomeIcon icon={faPencil} />
              </NavLink>
            ) : (
              ""
            )}
          </div>
        </div>
        <div className="bottomSection">
          <div className="text">
            <span>My Recipes </span>{" "}
          </div>
          <div className="recipeContainerAll">
            {/* {allUserRecipes.map((recipe, index) => {
              return (
                <Recipe
                  key={recipe._id}
                  recipeName={recipe.recipeName}
                  recipeIngradients={recipe.recipeIngradients}
                  recipeDescription={recipe.recipeDescription}
                  recipeNote={recipe.recipeNote}
                  recipeImageId={recipe.recipeImageId}
                  recipeImageUrl={recipe.recipeImageUrl}
                  recipeId={recipe._id}
                />
              );
            })} */}
          </div>
        </div>
      </div>
    </>
  );
};

export default UserInfo;
