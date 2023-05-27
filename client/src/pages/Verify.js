import Wrapper from "../assets/wrappers/VerifyPage.js";
import { useAppContext } from "../context/appContext.js";
import { useEffect, useState } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { Loading } from "../components/index.js";
import axios from "axios";
import { Logo, Alert } from "../components/index.js";

const Verify = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isLoading, userLoading, displayAlert, showAlert } = useAppContext();
  const [loading, setLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState("");

  const verifyEmail = async () => {
    setLoading(true);
    const queryParams = new URLSearchParams(location.search);
    const verificationToken = queryParams.get("token");
    const email = queryParams.get("email");
    try {
      const { data } = await axios.post("/api/v1/auth/verify-email", {
        verificationToken,
        email,
      });
      const { msg, user } = data;
      setMessage(msg);
      setUser(user);
    } catch (error) {
      setIsError(true);
      displayAlert(error.response.data.msg, true);
      setTimeout(() => {
        navigate("/");
      }, 5000);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (!isLoading) {
      verifyEmail();
    }
  }, [userLoading]);

  if (userLoading)
    return (
      <Wrapper className="full-page">
        <Loading center />
      </Wrapper>
    );

  if (!isError && user)
    return (
      <Wrapper className="full-page">
        <div className="form">
          <Logo className="logo" />
          <h4>{message}</h4>
          <Link to="/register" className="btn btn-block">
            Please Log In
          </Link>
        </div>
      </Wrapper>
    );
  if (isError)
    return (
      <Wrapper className="full-page">
        <div className="form">
          <Logo className="logo" />

          {showAlert && <Alert />}
        </div>
      </Wrapper>
    );
};
export default Verify;
