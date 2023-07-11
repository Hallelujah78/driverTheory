import main from "../assets/images/main5.png";
import Wrapper from "../assets/wrappers/LandingPage";
import { useAppContext } from "../context/appContext";
import { Logo } from "../components";
import { Link, Navigate } from "react-router-dom";
const Landing = () => {
  const { user } = useAppContext();

  return (
    <>
      {user && <Navigate to="/" />}
      <Wrapper>
        <nav>
          <Logo />
        </nav>
        <div className="container page">
          <div className="info">
            <h1>
              driver <span>theory</span> test
            </h1>
            <h5>
              Irish driver theory questions for car drivers. Practice answering
              questions for free and ace your test!
            </h5>
            <Link to="/register" className="btn btn-hero">
              login/register
            </Link>
            <p>
              Please note this app only contains a small number of questions and
              is for demonstration purposes only. If you intend sitting your
              driver theory test, you should practice using the official driver
              theory test mobile app from the Road Safety Authority.
            </p>
          </div>
          <img src={main} alt="job hunt" className="img main-img" />
        </div>
      </Wrapper>
    </>
  );
};

export default Landing;
