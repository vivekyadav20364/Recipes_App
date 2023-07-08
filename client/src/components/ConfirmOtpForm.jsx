import React from "react";

const ConfirmOtpForm = ({ handleOtpSubmit, setUserOtp, userOtp }) => {
  return (
    <form className="loginContainer" onSubmit={handleOtpSubmit}>
      <h1> Confirm OTP 🔐 </h1>
      <input
        type="text"
        placeholder="OTP"
        value={userOtp}
        onChange={(e) => setUserOtp(e.target.value)}
        required
      />

      <button type="submit" className="firstButton">
        Verify
      </button>
    </form>
  );
};

export default ConfirmOtpForm;
