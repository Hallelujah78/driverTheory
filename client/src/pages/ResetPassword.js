import Wrapper from "../assets/wrappers/ResetPassword";
import { useAppContext } from "../context/appContext";
import { Logo } from "../components";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FormRow, Alert } from "../components/index.js";
import { useState } from "react";
import axios from "axios";

const ResetPassword = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const { isLoading, displayAlert, showAlert } = useAppContext();

  const handleChange = (e) => {
    e.preventDefault();
    const name = e.target.name;
    const value = e.target.value;
    if (name === "newPassword") {
      setNewPassword(value);
    }
    if (name === "confirmPassword") {
      setConfirmPassword(value);
    }
  };

  const resetPassword = async () => {
    setLoading(true);
    const queryParams = new URLSearchParams(location.search);
    const passwordToken = queryParams.get("token");
    const email = queryParams.get("email");
    try {
      const { data } = await axios.post("/api/v1/auth/reset-password", {
        passwordToken,
        email,
        confirmPassword,
      });
      displayAlert(
        "Password reset successfully! Redirecting ...",
        true,
        "success"
      );
      setTimeout(() => {
        navigate("/register");
      }, 5000);
      const { msg } = data;
    } catch (error) {
      displayAlert(error.response.data.msg, "danger");
      setTimeout(() => {
        navigate("/");
      }, 5000);
    }
    setLoading(false);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (!newPassword || !confirmPassword) {
      displayAlert();
      return;
    }
    if (newPassword !== confirmPassword) {
      displayAlert("Passwords do not match!");
      return;
    }
    resetPassword();
  };

  return (
    <>
      <Wrapper className="full-page">
        <form className="form" onSubmit={onSubmit}>
          <Logo />
          <h4>Reset Password</h4>
          {showAlert && <Alert />}

          <div className="form-center">
            {/* new password */}
            <FormRow
              labelText="new password"
              type="text"
              name="newPassword"
              value={newPassword}
              handleChange={(e) => handleChange(e)}
            />
            <FormRow
              labelText="confirm new password"
              type="text"
              name="confirmPassword"
              value={confirmPassword}
              handleChange={(e) => handleChange(e)}
            />

            <button type="submit" className="btn btn-block" disabled={loading}>
              Submit
            </button>
          </div>
        </form>
      </Wrapper>
    </>
  );
};

export default ResetPassword;
