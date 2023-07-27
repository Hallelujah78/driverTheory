// import Wrapper from "../assets/wrappers/RegisterPage";
import { useState, useEffect } from "react";
import { Alert, FormRow, Logo, PasswordStrength } from "../components";
import { useAppContext } from "../context/appContext";
import { useNavigate, Link } from "react-router-dom";
import styled from "styled-components";
import { TbCircleCheck } from "react-icons/tb";

const initialState = {
  name: "",
  email: "",
  password: "",
  isMember: true,
  strongPassword: false,
};

const Register = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState(initialState);
  const {
    isLoading,
    displayAlert,
    registerUser,
    loginUser,
    user,
    isRegistered,
  } = useAppContext();

  const toggleMember = () => {
    setValues({ ...values, isMember: !values.isMember });
  };

  const handleChange = (e) => {
    e.preventDefault();
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    const { name, email, password, isMember, strongPassword } = values;
    if (!email || !password || (!isMember && !name)) {
      displayAlert();
      return;
    }
    if (!strongPassword) {
      // warn user

      return;
    }
    const currentUser = { name, email, password };
    if (isMember) {
      loginUser(currentUser);
    } else {
      registerUser(currentUser);
    }
  };

  const getPasswordStrength = (isStrongPassword) => {
    setValues({ ...values, strongPassword: isStrongPassword });
  };

  useEffect(() => {
    if (user) {
      setTimeout(() => {
        navigate("/");
      }, 3000);
    }
  }, [user, navigate]);
  return (
    <Wrapper className="full-page">
      <form className="form" id="login" name="login" onSubmit={onSubmit}>
        <Logo />
        {/* controls H3 content */}
        <h3>{values.isMember ? "Login" : "Register"}</h3>
        {values.showAlert && !isRegistered && <Alert />}
        <Alert />

        {/* name field */}
        {!values.isMember && (
          <FormRow
            id="name"
            type="text"
            name="name"
            handleChange={handleChange}
            value={values.name}
          />
        )}
        {/* email field */}
        <FormRow
          id="email"
          type="email"
          name="email"
          handleChange={handleChange}
          value={values.email}
        />
        <div className="password-container">
          <FormRow
            id="password"
            type="password"
            name="password"
            handleChange={handleChange}
            value={values.password}
            autocomplete={values.isMember ? "current-password" : "new-password"}
          />{" "}
          {/* password field */}
          {values.isMember ? null : (
            <PasswordStrength
              getPasswordStrength={getPasswordStrength}
              password={values.password}
              reactIcon={<TbCircleCheck />}
            />
          )}
        </div>

        <button type="submit" disabled={isLoading} className="btn btn-block">
          submit
        </button>
        <button
          type="button"
          className="btn btn-block btn-hipster"
          disabled={isLoading}
          onClick={() => {
            loginUser({
              name: "Testuser",
              email: "testuser@test.com",
              password: "secret",
            });
          }}
        >
          {isLoading ? "Loading..." : "Test Drive this App"}
        </button>
        <p>
          {values.isMember ? "Not a member yet?" : "Already a member?"}{" "}
          <button className="member-btn" onClick={toggleMember}>
            {values.isMember ? "Register" : "Login"}
          </button>
        </p>
        <p>
          Forgot your password?{" "}
          <Link to="/forgot-password" className="member-btn">
            Reset Password
          </Link>
        </p>
      </form>
    </Wrapper>
  );
};
export default Register;

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

  h3 {
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
  .member-btn {
    background: transparent;
    border: transparent;
    color: var(--primary-500);
    cursor: pointer;
    letter-spacing: var(--letterSpacing);
  }
  .password-container {
    position: relative;
  }
`;
