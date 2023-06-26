import { Link } from "react-router-dom";

const NoData = ({ message, linkTo, linkText }) => {
  return (
    <div className="loading-container">
      <h4>{message}</h4>
      <Link className="btn" to={linkTo}>
        {linkText}
      </Link>
    </div>
  );
};
export default NoData;
