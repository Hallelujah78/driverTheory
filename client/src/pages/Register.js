import Wrapper from "../assets/wrappers/RegisterPage";
import { useState, useEffect } from "react";
import { Alert, FormRow, Logo } from "../components";
import { useAppContext } from "../context/appContext";
import { useNavigate, Link, useLocation } from "react-router-dom";

const initialState = {
  name: "",
  email: "",
  password: "",
  isMember: true,
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
    const { name, email, password, isMember } = values;
    if (!email || !password || (!isMember && !name)) {
      displayAlert();
      return;
    }
    const currentUser = { name, email, password };
    if (isMember) {
      loginUser(currentUser);
    } else {
      registerUser(currentUser);
    }
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
        {/* password field */}
        <FormRow
          id="password"
          type="password"
          name="password"
          handleChange={handleChange}
          value={values.password}
          autocomplete={values.isMember ? "current-password" : "new-password"}
        />
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
          {isLoading ? "Loading..." : "Demo App"}
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
