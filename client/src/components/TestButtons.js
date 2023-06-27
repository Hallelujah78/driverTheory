import {
  TbFlag,
  TbArrowBigLeftLine,
  TbArrowBigRightLine,
  TbNotes,
} from "react-icons/tb";
import { Link } from "react-router-dom";

const TestButtons = ({ currentQuestion, isComplete, handleClick, test }) => {
  return (
    <>
      <div
        onClick={currentQuestion < 1 ? null : (e) => handleClick(e)}
        className={currentQuestion < 1 ? "gray prev" : "prev"}
      >
        <TbArrowBigLeftLine className="nav-btn" />
        <p>prev</p>
      </div>
      <div
        className={
          test?.[currentQuestion].isFlagged ? "flag flag-true" : "flag"
        }
        onClick={(e) => handleClick(e)}
      >
        <TbFlag className="nav-btn" />
        <p>{test?.[currentQuestion].isFlagged ? "unflag" : "flag"}</p>
      </div>
      <div>
        <Link
          to="/results"
          className={isComplete ? "results" : "hidden results"}
        >
          <TbNotes className="nav-btn" />
          <p>results</p>
        </Link>
      </div>

      <div
        onClick={
          currentQuestion === test?.length - 1 ? null : (e) => handleClick(e)
        }
        className={
          currentQuestion === test?.length - 1 ||
          test?.[currentQuestion].userAnswer === null ||
          !test
            ? "gray next"
            : "next"
        }
      >
        <TbArrowBigRightLine className="nav-btn" />
        <p>next</p>
      </div>
    </>
  );
};
export default TestButtons;
