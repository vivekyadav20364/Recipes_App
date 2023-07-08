import React, { useState } from "react";
import "../styles/newrecipe.css";
import { BASE_URL } from "../helper/ref.js";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import isUrl from "is-url";

const NewRecipe = (props) => {
  const navigate = useNavigate();

  const [isUpdate, setIsUpdate] = useState(false);
  const [recipeName, setRecipeName] = useState("");
  const [recipeIngradients, setRecipeIngradients] = useState("");
  const [recipeDescription, setRecipeDescription] = useState("");
  const [recipeNote, setRecipeNote] = useState("");
  const [loading, setLoading] = useState("");

  // States for image actions
  const [imageUploading, setImageUploading] = useState(false);
  const [recipeImageUrl, setRecipeImageUrl] = useState("");
  const [recipeImageUploadUrl, setRecipeImageUploadUrl] = useState("");

  if (!isUpdate && Object.keys(props).length) {
    setIsUpdate(true);
    setRecipeName(props.data.recipeName);
    setRecipeIngradients(props.data.recipeIngradients);
    setRecipeDescription(props.data.recipeDescription);
    setRecipeNote(props.data.recipeNote);
    setRecipeImageUrl(props.data.recipeImageUrl);
    setImageUploading(true);
  }

  let user = JSON.parse(localStorage.getItem("userInfoRecipe"));
  function handleSubmit(e) {
    e.preventDefault();
    if (!recipeImageUrl || (recipeImageUrl && isUrl(recipeImageUrl))) {
      setLoading(true);

      if (isUpdate) {
        Axios.put(`${BASE_URL}/recipe/updateRecipe`, {
          userId: user.userId,
          recipeId: props.data._id,
          recipeName: recipeName,
          recipeIngradients: recipeIngradients,
          recipeDescription: recipeDescription,
          recipeNote: recipeNote,
          recipeImageUrl: recipeImageUrl,
          recipeImageUploadUrl: recipeImageUploadUrl,
        })
          .then((response) => {
            setLoading(false);
            navigate("/");
          })
          .catch((err) => {
            console.log(err);
            setLoading(false);
          });
      } else {
        Axios.post(`${BASE_URL}/recipe/addNewRecipe`, {
          userId: user.userId,
          recipeName: recipeName,
          recipeIngradients: recipeIngradients,
          recipeDescription: recipeDescription,
          recipeNote: recipeNote,
          recipeImageUrl: recipeImageUrl,
          recipeImageUploadUrl: recipeImageUploadUrl,
        })
          .then((response) => {
            setLoading(false);
            navigate("/");
          })
          .catch((err) => {
            console.log(err);
            setLoading(false);
          });
      }
    } else {
      alert("Recipe Image URL is not valid");
    }
  }

  async function handleFileInputChange(event) {
    event.preventDefault();
    setImageUploading(true);
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
        setRecipeImageUploadUrl(URL.createObjectURL(blob));
        console.log("Image Uploaded");
        setImageUploading(false);
      } else {
        console.log("Image Upload Failed");
      }
    } catch (error) {
      console.error(error);
      console.log("Image Upload Failed");
    }
  }

  return (
    <div className="newRecipe">
      {loading ? (
        <div className="loader-container">
          <div className="spinner"></div>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="left">
            <div> Add a recipe 👩‍🍳</div>
            <input
              placeholder="Name of the recipe"
              value={recipeName}
              onChange={(e) => setRecipeName(e.target.value)}
              required
            />
            <textarea
              placeholder="Ingradients"
              rows={6}
              value={recipeIngradients}
              onChange={(e) => setRecipeIngradients(e.target.value)}
              required
            ></textarea>
            <textarea
              placeholder="Recipe description and how to make it"
              rows={10}
              value={recipeDescription}
              onChange={(e) => setRecipeDescription(e.target.value)}
              required
            ></textarea>
          </div>
          <div className="right">
            <div
              className={
                recipeImageUploadUrl
                  ? "fileContainer fileUploaded"
                  : "fileContainer"
              }
            >
              <div>
                {recipeImageUploadUrl
                  ? "Image Uploaded!"
                  : imageUploading
                  ? "Uploading..."
                  : "Add Recipe Image"}
              </div>
              <input type="file" name="file" onChange={handleFileInputChange} />
              <i>(upload .png, .jpg, .jpeg image)</i>
              <p
                style={{ color: "coral", fontSize: "15px", fontWeight: "200" }}
              >
                {/* *Upload option is disabled due to some technical issue. */}
              </p>
            </div>
            <p style={{ color: "white" }}>- OR -</p>
            <textarea
              placeholder="Paste the Recipe Image URL"
              rows={1}
              value={recipeImageUrl}
              onChange={(e) => setRecipeImageUrl(e.target.value)}
            ></textarea>
            <textarea
              placeholder="Note"
              rows={6}
              value={recipeNote}
              onChange={(e) => setRecipeNote(e.target.value)}
            ></textarea>
            <button type="submit">Save</button>
          </div>
        </form>
      )}
    </div>
  );
};

export default NewRecipe;
