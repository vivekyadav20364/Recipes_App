import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import { BASE_URL } from "../helper/ref";
import "../styles/deleteRecipe.css";
import Axios from "axios";


const DeleteRecipe = () => {
  const { recipeId } = useParams();
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();

    Axios.delete(`${BASE_URL}/recipe/delete/${recipeId}`)
      .then((response) => {
        console.log(response);
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <>
      <Navbar />
      <form className="DeleteRecipe" onSubmit={handleSubmit}>
        <div className="messageGrid">
          <h1>Warning!</h1>
          <p>
            Are you sure want to delete this recipe? This recipe will be deleted permanenty from this website and you'll lose the following things:
          </p>
          <ul>
            <li>Rating will be lost.</li>
            <li>All the reviews will be lost.</li>
            <li>Recipe can't be retrived once if deleted.</li>
          </ul>

          <button>I understood, delete this recipe</button>
        </div>
      </form>
    </>
  );
};

export default DeleteRecipe;
