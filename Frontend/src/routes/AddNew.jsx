import React from "react";
import Navbar from "../components/Navbar";
import NewRecipe from "../components/NewRecipe";

const AddNew = () => {
  return (
    <div>
      <Navbar active={"addnew"} />
      <NewRecipe />
    </div>
  );
};

export default AddNew;
