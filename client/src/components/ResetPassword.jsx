import React from "react";

const ResetPassword = ({
  handleConfirmPassword,
  userPassword,
  setUserPassword,
  userConfirmPassword,
  setUserConfirmPassword,
}) => {
  return (
    <form className="loginContainer" onSubmit={handleConfirmPassword}>
      <h1> Update Password 🔑</h1>
      <input
        type="password"
        placeholder="Password"
        value={userPassword}
        onChange={(e) => setUserPassword(e.target.value)}
        required
      />

      <input
        type="password"
        placeholder="Confirm Password"
        value={userConfirmPassword}
        onChange={(e) => setUserConfirmPassword(e.target.value)}
        required
      />

      <button type="submit" className="firstButton">
        Update Password
      </button>
    </form>
  );
};

export default ResetPassword;
