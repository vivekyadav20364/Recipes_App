import "./styles/App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./routes/Home";
import Login from "./routes/Login";
import Register from "./routes/Register";
import AddNew from "./routes/AddNew";
import Contact from "./routes/Contact";
import Forgot from "./routes/Forgot";
import AboutRecipe from "./routes/AboutRecipe";
import AboutUser from "./routes/AboutUser";
import EditUser from "./routes/EditUser";
import EditRecipe from "./routes/EditRecipe";
import DeleteRecipe from "./routes/DeleteRecipe";
import Logout from "./routes/Logout";
import AboutMe from "./routes/AboutMe";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/addnew" element={<AddNew />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot" element={<Forgot />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/aboutme" element={<AboutMe />} />
          <Route path="/aboutuser/:user" element={<AboutUser />} />
          <Route path="/aboutrecipe/:id" element={<AboutRecipe />} />
          <Route path="/aboutrecipe/edit/:user" element={<EditUser />} />
          <Route path="/edit/:recipeId" element={<EditRecipe />} />
          <Route path="/delete/:recipeId" element={<DeleteRecipe />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
