import { Link } from "react-router-dom";
import errorImage from "../assets/images/not-found.svg";
import Wrapper from "../assets/wrappers/ErrorPage";
const Error = () => {
  return (
    <Wrapper className="full-page">
      <div>
        <img src={errorImage} alt="404 page not found" className="img" />
        <h3>Ohh! Page Not Found</h3>
        <p>We can't seem to find the page you're looking for</p>

        <Link to="/">Back Home</Link>
      </div>
    </Wrapper>
  );
};
export default Error;
