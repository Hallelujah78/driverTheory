import styled from "styled-components";
import { useAppContext } from "../../context/appContext";
import { useLocation } from "react-router-dom";
import { TestButtons, ResultsButtons, PreviousTestButtons } from "../index.js";

const TestFooter = () => {
  const {
    currentQuestion,
    incrementQuestion,
    decrementQuestion,
    test,
    isComplete,
    toggleIsFlagged,
  } = useAppContext();

  const location = useLocation();

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
    if (e.currentTarget.classList.contains("flag")) {
      const questionId = test[currentQuestion].question._id;
      toggleIsFlagged(questionId);
    }
  };

  return (
    <Wrapper>
      <div className="footer-center">
        <div className="button-container">
          {location.pathname === "/randomized-practice" && (
            <TestButtons
              isComplete={isComplete}
              handleClick={handleClick}
              currentQuestion={currentQuestion}
              test={test}
            />
          )}
          {location.pathname === "/results" ||
          location.pathname === "/results/question-list" ? (
            <ResultsButtons
              isComplete={isComplete}
              handleClick={handleClick}
              currentQuestion={currentQuestion}
              test={test}
            />
          ) : null}
          {location.pathname.includes("/stats/previous-tests/") && (
            <PreviousTestButtons
              isComplete={isComplete}
              handleClick={handleClick}
              currentQuestion={currentQuestion}
              test={test}
            />
          )}
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
      .flag,
      .nav-link,
      .link {
        height: 100%;
        color: white;
        cursor: pointer;
        display: grid;
        grid-template-rows: 1fr 1fr;
        justify-content: center;
        .nav-btn {
          margin: 0.5rem auto 0 auto;
          font-size: 2.5rem;
        }
      }
      .flag-true {
        color: var(--green-flagged);
      }
      a {
        overflow: visible;
        white-space: nowrap;
      }
      .active {
        color: var(--grey-300);
        background: var(--primary-600);
        border-radius: 50%;
        width: 5rem;
      }
    }
  }

  .hidden {
    visibility: hidden;
  }
  div {
    height: 100%;
  }
  .gray {
    opacity: 0.5;
  }
  p {
    font-size: 1rem;
    margin: 0.25rem auto 0 auto;
    line-height: 1.15;
  }
`;
