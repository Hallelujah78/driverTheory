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
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Similique, id blanditiis repellat atque nobis corporis fuga
              asperiores eius reiciendis recusandae.
            </p>
            <Link to="/register" className="btn btn-hero">
              login/register
            </Link>
          </div>
          <img src={main} alt="job hunt" className="img main-img" />
        </div>
      </Wrapper>
    </>
  );
};

export default Landing;
