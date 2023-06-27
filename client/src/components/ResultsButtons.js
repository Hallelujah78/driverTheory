import { Link } from "react-router-dom";

const ResultsButtons = () => {
  return (
    <>
      <div>
        <Link to="/randomized-practice" className="questions">
          <p>questions</p>
        </Link>
      </div>
      <div>
        <Link to="/results/question-list" className="questions">
          <p>question list</p>
        </Link>
      </div>

      <div>
        <Link to="/results" className="results">
          <p>categories</p>
        </Link>
      </div>
    </>
  );
};
export default ResultsButtons;
