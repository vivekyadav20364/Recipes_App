import React from "react";

const EmailOtpForm = ({ handleEmailSubmit, userEmail, setUserEmail }) => {
  return (
    <form className="loginContainer" onSubmit={handleEmailSubmit}>
      <h1> Reset Password ⚙ </h1>
      <input
        type="email"
        placeholder="Email"
        value={userEmail}
        onChange={(e) => setUserEmail(e.target.value)}
        required
      />

      <button type="submit" className="firstButton">
        Send OTP
      </button>
    </form>
  );
};

export default EmailOtpForm;
