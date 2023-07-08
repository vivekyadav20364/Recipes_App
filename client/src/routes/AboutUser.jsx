import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import UserInfo from "../components/UserInfo";
import Axios from "axios";
import { BASE_URL } from "../helper/ref.js";

const AboutUser = () => {
  const { user } = useParams();
  const [loading, setLoading] = useState(true);

  const [userData, setUserData] = useState({});
  const [allUserRecipes, setAllUserRecipes] = useState([]);
  let localData = JSON.parse(localStorage.getItem("userInfoRecipe"));

  useEffect(() => {
    setLoading(true);

    Axios.post(`${BASE_URL}/user/userInfo`, {
      userName: user,
    })
      .then((userIdResponse) => {
        Axios.get(`${BASE_URL}/profile/getProfile`, {
          params: {
            userName: user,
          },
        })
          .then((userResponse) => {
            Axios.post(`${BASE_URL}/recipe/recipeFindByUserId`, {
              userId: userIdResponse.data[0]._id,
            }).then((recipeResponse) => {
              setUserData(userResponse.data[0]);
              setAllUserRecipes(recipeResponse.data);
              setLoading(false);
            });
          })
          .catch((err) => {
            console.log(err);
            setLoading(false);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  }, [user]);

  return (
    <>
      <Navbar />
      {loading ? (
        <div className="loader-container">
          <div className="spinner"></div>
        </div>
      ) : (
        <UserInfo userData={userData} allUserRecipes={allUserRecipes} />
      )}
    </>
  );
};

export default AboutUser;
