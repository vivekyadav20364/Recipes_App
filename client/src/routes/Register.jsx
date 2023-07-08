import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Axios from "axios";
import "../styles/login.css";
import "../styles/loading.css";
import { BASE_URL } from "../helper/ref.js";
import { passwordStrength } from "check-password-strength";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const Register = () => {
  const [fullName, setFullName] = useState("");
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [userConfirmPassword, setUserConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [passwordStrengthMessage, setPasswordStrengthMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
  const [loading, setLoading] = useState(false);

  const colorPatterns = {
    "Too weak": "red",
    Weak: "coral",
    Medium: "yellow",
    Strong: "greenyellow",
  };

  const navigate = useNavigate();

  const checkUserAvailability = () => {
    if (passwordStrengthMessage === "Strong") {
      if (userPassword === userConfirmPassword) {
        Axios.post(`${BASE_URL}/user/registerValidate`, {
          userName: userName,
          userEmail: userEmail,
        })
          .then((response) => {
            if (response.data === "username") {
              setErrorMessage("This username already exists.");
              setLoading(false);
            } else if (response.data === "email") {
              setErrorMessage("This email is already used.");
              setLoading(false);
            } else {
              Axios.post(`${BASE_URL}/user/register`, {
                fullName: fullName,
                userName: userName,
                userEmail: userEmail,
                userPassword: userPassword,
              })
                .then((dataSaveResponse) => {
                  navigate("/login");
                  setLoading(false);
                })
                .catch((saveDataError) => {
                  console.log("Error to save!", saveDataError);
                });
            }
          })
          .catch((error) => {
            console.error("There was an error!", error);
          });
      } else {
        setErrorMessage("Password does not match.");
        setLoading(false);
      }
    } else {
      setErrorMessage("Please make your password Strong.");
      setLoading(false);
    }
  };

  const handleSubmit = async (event) => {
    setLoading(true);
    event.preventDefault();
    checkUserAvailability();
  };

  const handlePasswordStrongness = (e) => {
    setUserPassword(e.target.value);

    setPasswordStrengthMessage(passwordStrength(e.target.value).value);
  };

  return (
    <div className="mainLoginContainer">
      {loading ? (
        <div className="loader-container">
          <div className="spinner"></div>
        </div>
      ) : (
        <>
          <div className="left">
            <p className="warningMessage">{errorMessage}</p>
            <form className="loginContainer" onSubmit={handleSubmit}>
              <h1> Register 🍫</h1>
              <input
                type="text"
                placeholder="Full Name"
                onChange={(e) => setFullName(e.target.value)}
                value={fullName}
                required
              />
              <input
                type="text"
                placeholder="Username"
                onChange={(e) => setUserName(e.target.value)}
                value={userName}
                required
              />
              <input
                type="email"
                placeholder="Email"
                value={userEmail}
                onChange={(e) => setUserEmail(e.target.value)}
                required
              />
              <div className="passwordInputContainer">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={userPassword}
                  onChange={handlePasswordStrongness}
                  required
                />
                <div
                  onClick={() => {
                    setShowPassword(!showPassword);
                  }}
                >
                  {!showPassword ? (
                    <FontAwesomeIcon icon={faEye} style={{ color: "grey" }} />
                  ) : (
                    <FontAwesomeIcon
                      icon={faEyeSlash}
                      style={{ color: "grey" }}
                    />
                  )}
                </div>
              </div>
              {userPassword && (
                <div
                  className="passwordStrengthMessage"
                  style={{ color: colorPatterns[passwordStrengthMessage] }}
                >
                  {passwordStrengthMessage === "Too weak" && (
                    <div className="strengthBars tooWeakBar"></div>
                  )}
                  {passwordStrengthMessage === "Weak" && (
                    <>
                      <div className="strengthBars tooWeakBar"></div>
                      <div className="strengthBars weakBar"></div>
                    </>
                  )}
                  {passwordStrengthMessage === "Medium" && (
                    <>
                      <div className="strengthBars tooWeakBar"></div>
                      <div className="strengthBars weakBar"></div>
                      <div className="strengthBars mediumBar"></div>
                    </>
                  )}
                  {passwordStrengthMessage === "Strong" && (
                    <>
                      <div className="strengthBars tooWeakBar"></div>
                      <div className="strengthBars weakBar"></div>
                      <div className="strengthBars mediumBar"></div>
                      <div className="strengthBars strongBar"></div>
                    </>
                  )}
                </div>
              )}

              <div className="passwordInputContainer">
                <input
                  type={showPasswordConfirm ? "text" : "password"}
                  placeholder="Confirm Password"
                  value={userConfirmPassword}
                  onChange={(e) => setUserConfirmPassword(e.target.value)}
                  required
                />

                <div
                  onClick={() => {
                    setShowPasswordConfirm(!showPasswordConfirm);
                  }}
                >
                  {!showPasswordConfirm ? (
                    <FontAwesomeIcon icon={faEye} style={{ color: "grey" }} />
                  ) : (
                    <FontAwesomeIcon
                      icon={faEyeSlash}
                      style={{ color: "grey" }}
                    />
                  )}
                </div>
              </div>

              <button type="submit" className="firstButton">
                Register
              </button>
              <Link className="pageRouter" to={"/login"}>
                <button type="submit">Login</button>
              </Link>
            </form>
          </div>
          <div className="right">
            <img
              src="https://www.oliviascuisine.com/wp-content/uploads/2019/01/double-chocolate-chili.jpg"
              alt="img"
            />
          </div>
        </>
      )}
    </div>
  );
};

export default Register;
