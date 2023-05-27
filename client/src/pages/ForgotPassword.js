import Wrapper from "../assets/wrappers/ResetPassword";
import { useAppContext } from "../context/appContext";
//
import { Link, useNavigate } from "react-router-dom";
import { FormRow, Alert, Logo } from "../components/index.js";
import { useState } from "react";
import axios from "axios";

// where you enter email

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const { isLoading, displayAlert, showAlert } = useAppContext();

  const handleChange = (e) => {
    e.preventDefault();
    setEmail(e.target.value);
  };

  const resetPassword = async () => {
    try {
      await axios.post("/api/v1/auth/forgot-password", {
        email,
      });
    } catch (error) {
      console.log(error.response.data.msg);
      displayAlert(error.response.data.msg);
    }
    if (email === "testuser@test.com") return;
    displayAlert(
      "Success! Please check your email to reset password. Redirecting...",
      true,
      "success"
    );
    setTimeout(() => {
      navigate("/register");
    }, 3000);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (!email) {
      displayAlert();
      return;
    }

    resetPassword();
  };
  return (
    <>
      <Wrapper className="full-page">
        <form className="form" onSubmit={onSubmit}>
          <Logo />

          <h4>Forgot Password</h4>
          {showAlert && <Alert />}
          <div className="form-center">
            {/* email */}
            <FormRow
              labelText="email address"
              type="email"
              name="email"
              value={email}
              handleChange={(e) => {
                handleChange(e);
              }}
            />
            <button
              type="submit"
              className="btn btn-block"
              disabled={isLoading}
            >
              Submit
            </button>
          </div>
          <p>
            Back to{" "}
            <Link to="/register" className="member-btn">
              Register/Login
            </Link>
          </p>
        </form>
      </Wrapper>
    </>
  );
};

export default ForgotPassword;
