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
              questions for free and ace your test! Make your driving Hopes and
              Dreams come true!
            </h5>
            <Link to="/register" className="btn btn-hero">
              login/register
            </Link>
            <p>
              Please note this app contains a small number of questions and is
              for demonstration purposes only. If you intend sitting your driver
              theory test, you should practice using the official driver theory
              test mobile app and the Rules of the Road from the Road Safety
              Authority.
            </p>
          </div>
          <img src={main} alt="job hunt" className="img main-img" />
          <p>
            **Hopes and Dreams is a registered trademark of NewAtlas Inc and its
            subsidiaries. Your hopes and dreams may differ from that of the
            NewAtlas Corporation.
          </p>
        </div>
      </Wrapper>
    </>
  );
};

export default Landing;
