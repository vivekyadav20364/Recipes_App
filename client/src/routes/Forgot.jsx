import React, { useState } from "react";
import "../styles/login.css";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import "../styles/loading.css";
import { BASE_URL } from "../helper/ref.js";
import EmailOtpForm from "../components/EmailOtpForm";
import ConfirmOtpForm from "../components/ConfirmOtpForm";
import ResetPassword from "../components/ResetPassword";

const Forgot = () => {
  const [userEmail, setUserEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [sendOtp, setSendOtp] = useState(null);
  const [userOtp, setUserOtp] = useState("");
  const [otpConfirm, setOtpConfirm] = useState(false);

  // states for confirm password
  const [userPassword, setUserPassword] = useState("");
  const [userConfirmPassword, setUserConfirmPassword] = useState("");

  const navigate = useNavigate();

  const checkUserExist = () => {
    Axios.post(`${BASE_URL}/forgot/main`, {
      userEmail: userEmail,
    })
      .then((response) => {
        if (response.data === "OK") {
          Axios.post(`${BASE_URL}/forgot/otp`, {
            userEmail: userEmail,
          })
            .then((response) => {
              setSendOtp(response.data);
              setErrorMessage("An OTP has been send on your email.");
              setLoading(false);
            })
            .catch((error) => {
              console.log("OTP Error", error);
            });
        } else {
          setErrorMessage("This Email does not exist");
          setLoading(false);
        }
      })
      .catch((error) => {
        console.log("There is a problem on reset", error);
      });
  };

  const handleEmailSubmit = (event) => {
    setLoading(true);
    event.preventDefault();
    checkUserExist();
  };

  const handleOtpSubmit = (event) => {
    setLoading(true);
    console.log(sendOtp, userOtp);
    event.preventDefault();
    if (
      sendOtp &&
      userOtp &&
      userOtp.length === 4 &&
      parseInt(sendOtp) === parseInt(userOtp)
    ) {
      Axios.post(`${BASE_URL}/forgot/removeOtp`, {
        userEmail: userEmail,
      }).then((response) => {
        setOtpConfirm(true);
        setErrorMessage("");
        setLoading(false);
      });
    } else {
      console.log("Not Matched");
      setErrorMessage("OTP is not correct");
      setLoading(false);
    }
  };

  function handleConfirmPassword(event) {
    event.preventDefault();
    setLoading(true);
    if (userPassword === userConfirmPassword) {
      Axios.post(`${BASE_URL}/forgot/resetPassword`, {
        userEmail: userEmail,
        userPassword: userPassword,
      })
        .then((response) => {
          console.log("SUCCESS", response);
          navigate("/login");
          setLoading(false);
        })
        .catch((err) => {
          console.log("confirm password error");
          setLoading(false);
          setErrorMessage("Sorry, We are facing issue...");
        });
    } else {
      setErrorMessage("Password does not match");
      setLoading(false);
    }
  }

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

            {otpConfirm ? (
              <ResetPassword
                handleConfirmPassword={handleConfirmPassword}
                userPassword={userPassword}
                userConfirmPassword={userConfirmPassword}
                setUserPassword={setUserPassword}
                setUserConfirmPassword={setUserConfirmPassword}
              />
            ) : sendOtp ? (
              <ConfirmOtpForm
                handleOtpSubmit={handleOtpSubmit}
                setUserOtp={setUserOtp}
                userOtp={userOtp}
              />
            ) : (
              <EmailOtpForm
                handleEmailSubmit={handleEmailSubmit}
                userEmail={userEmail}
                setUserEmail={setUserEmail}
              />
            )}
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

export default Forgot;
