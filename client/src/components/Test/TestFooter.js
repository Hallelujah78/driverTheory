import styled from "styled-components";
import { useAppContext } from "../../context/appContext";
import {
  TbFlag,
  TbArrowBigLeftLine,
  TbArrowBigRightLine,
} from "react-icons/tb";
import { AiOutlineFileDone } from "react-icons/ai";
const TestFooter = () => {
  const {
    currentQuestion,
    incrementQuestion,
    decrementQuestion,
    test,
    isComplete,
  } = useAppContext();

  const handleClick = (e) => {
    if (!test || !test.length) {
      return;
    }
    if (e.currentTarget.classList.contains("prev") && currentQuestion !== 0) {
      decrementQuestion();
    }
    if (
      e.currentTarget.classList.contains("next") &&
      currentQuestion < test.length - 1 &&
      test?.[currentQuestion].userAnswer !== null
    ) {
      incrementQuestion();
    }
  };

  return (
    <Wrapper>
      <div className="footer-center">
        <div className="button-container">
          <div
            onClick={currentQuestion < 1 ? null : (e) => handleClick(e)}
            className={currentQuestion < 1 ? "gray prev" : "prev"}
          >
            <TbArrowBigLeftLine className="nav-btn" />
            <p>prev</p>
          </div>
          <div className="flag">
            <TbFlag className="nav-btn" />
            <p>flag</p>
          </div>
          <div className={isComplete ? "results" : "hidden results"}>
            <AiOutlineFileDone className="nav-btn" />
            <p>Results</p>
          </div>
          <div
            onClick={
              currentQuestion === test?.length - 1
                ? null
                : (e) => handleClick(e)
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
        </div>
      </div>
    </Wrapper>
  );
};
export default TestFooter;

const Wrapper = styled.footer`
  display: flex;
  height: var(--nav-height);
  width: 100%;
  background-color: var(--primary-500);
  position: fixed;
  color: white;
  bottom: 0;
  .footer-center {
    width: var(--fluid-width);
    margin: 0 auto;
    .button-container {
      height: 100%;
      display: flex;
      justify-content: space-between;
      .prev,
      .next,
      .results,
      .flag {
        cursor: pointer;
        display: grid;
        grid-template-rows: 1fr 1fr;
        .nav-btn {
          font-size: 2.5rem;
          align-self: center;
        }
        p {
          margin: 0 auto;
        }
      }

      .hidden {
        visibility: hidden;
      }
    }
  }
  .gray {
    opacity: 0.5;
  }
`;
