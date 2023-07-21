import {
  TbFlag,
  TbArrowBigLeftLine,
  TbArrowBigRightLine,
} from "react-icons/tb";

const PreviousTestButtons = ({
  currentQuestion,
  handleClick,
  test,
  isComplete,
}) => {
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

      <div
        onClick={
          currentQuestion === test?.length - 1 ? null : (e) => handleClick(e)
        }
        className={
          currentQuestion === test?.length - 1 ||
          (!isComplete &&
            currentQuestion !== test?.length - 1 &&
            test?.[currentQuestion].userAnswer === null)
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
export default PreviousTestButtons;
