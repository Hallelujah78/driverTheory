import { useState, useEffect } from "react";
import { FormRow, Logo, PasswordStrength } from "../components";
import { useAppContext } from "../context/appContext";
import { useNavigate, Link } from "react-router-dom";
import styled from "styled-components";
import { TbCircleCheck, TbCircleX, TbEye, TbEyeOff } from "react-icons/tb";

const initialState = {
  name: "",
  email: "",
  password: "",
  isMember: true,
  strongPassword: false,
  showPassword: false,
};

const Register = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState(initialState);
  const { isLoading, registerUser, loginUser, user, notifyWarning } =
    useAppContext();

  const toggleMember = () => {
    setValues({ ...values, isMember: !values.isMember });
  };

  const toggleShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleChange = (e) => {
    e.preventDefault();
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    const { name, email, password, isMember, strongPassword } = values;
    if (!email || !password || (!isMember && !name)) {
      notifyWarning("Please enter all values");
      return;
    }

    const currentUser = { name, email, password };
    if (isMember) {
      loginUser(currentUser);
    }
    registerUser(currentUser);
  };

  const getPasswordStrength = (isStrongPassword) => {
    setValues({
      ...values,
      strongPassword: isStrongPassword,
    });
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
        <h4>{values.isMember ? "Login" : "Register"}</h4>

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
          {values.isMember ? null : (
            <PasswordStrength
              getPasswordStrength={getPasswordStrength}
              password={values.password}
              reactIconGood={<TbCircleCheck />}
              reactIconBad={<TbCircleX />}
            />
          )}
          <FormRow
            id="password"
            type={values.showPassword ? "text" : "password"}
            name="password"
            handleChange={handleChange}
            value={values.password}
            autocomplete={values.isMember ? "current-password" : "new-password"}
          />{" "}
          <div className="password-message">
            {!values.isMember && values.password.length > 0 ? (
              <p className={values.strongPassword ? "strong" : "weak"}>
                {values.strongPassword ? "Good" : "Too weak"}
              </p>
            ) : null}
          </div>
          <div onClick={toggleShowPassword}>
            {values.showPassword ? <TbEyeOff /> : <TbEye />}
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading || (!values.strongPassword && !values.isMember)}
          className={
            isLoading || (!values.strongPassword && !values.isMember)
              ? "disabled btn btn-block"
              : "btn btn-block"
          }
        >
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
  .password-message {
    position: absolute;
    top: 11.2rem;
    right: 10px;
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
`;
