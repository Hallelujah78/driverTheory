import styled from "styled-components";
import { useAppContext } from "../context/appContext";
import { Logo } from "../components";
import { useNavigate, useLocation } from "react-router-dom";
import { FormRow, PasswordStrength } from "../components/index.js";
import { TbCircleCheck, TbCircleX, TbEye, TbEyeOff } from "react-icons/tb";
import { useState } from "react";
import axios from "axios";

const ResetPassword = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [strongPassword, setStrongPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const { notifyWarning, notifySuccess } = useAppContext();

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

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const getPasswordStrength = (isStrongPassword) => {
    setStrongPassword(isStrongPassword);
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
      notifySuccess("Password reset successfully! Redirecting ...");
      setTimeout(() => {
        navigate("/register");
      }, 5000);
      const { msg } = data;
    } catch (error) {
      notifyWarning(error.response.data.msg);

      setTimeout(() => {
        navigate("/");
      }, 5000);
    }
    setLoading(false);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (!newPassword || !confirmPassword) {
      notifyWarning("Please provide all values!");
      return;
    }
    if (newPassword !== confirmPassword) {
      notifyWarning("Passwords do not match!");
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

          <div className="form-center">
            {/* new password */}
            <div className="password-container">
              <PasswordStrength
                getPasswordStrength={getPasswordStrength}
                password={newPassword}
                reactIconGood={<TbCircleCheck />}
                reactIconBad={<TbCircleX />}
              />
              <FormRow
                type={showPassword ? "text" : "password"}
                labelText="new password"
                autocomplete="new-password"
                name="newPassword"
                value={newPassword}
                handleChange={(e) => handleChange(e)}
              />
              <div className="password-message">
                {newPassword.length > 0 ? (
                  <p className={strongPassword ? "strong" : "weak"}>
                    {strongPassword ? "Good" : "Too weak"}
                  </p>
                ) : null}
              </div>
              <div
                className="register password-icon"
                onClick={toggleShowPassword}
              >
                {showPassword ? <TbEyeOff /> : <TbEye />}
              </div>
            </div>
            <FormRow
              labelText="confirm new password"
              type="password"
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

const Wrapper = styled.section`
  display: grid;
  align-items: center;
  height: 100vh;

  .logo {
    display: block;
    margin: 0 auto;
    margin-bottom: 0.75rem;
  }
  .form {
    max-width: 400px;
    border-top: 5px solid var(--primary-500);
  }

  h4 {
    text-align: center;
  }

  p {
    margin: 0;
    margin-top: 0.25rem;
    margin-bottom: 0.25rem;
    text-align: center;
  }
  .btn {
    margin-top: 0.4rem;
    margin-bottom: 0.4rem;
  }

  .password-container {
    position: relative;
  }
  .password-message {
    position: absolute;
    top: 11.2rem;
    right: 40px;
  }
  .weak {
    color: red;
  }
  .strong {
    color: green;
  }
  .disabled {
    background-color: var(--primary-100);
  }
  .password-icon {
    position: absolute;

    font-size: 1.5rem;
    cursor: pointer;
  }
  .register {
    top: 11.35rem;
    right: 0.4rem;
  }
  .login {
    top: 2.25rem;
    right: 0.4rem;
  }
`;
