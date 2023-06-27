import styled from "styled-components";
import { useAppContext } from "../../context/appContext";
import { useLocation } from "react-router-dom";
import { TestButtons, ResultsButtons } from "../index.js";

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
        color: white;
        cursor: pointer;
        display: grid;
        grid-template-rows: 1fr 1fr;
        .nav-btn {
          margin-top: 0.25rem;
          font-size: 2.5rem;
          align-self: center;
        }

        p {
          margin: 0.5rem auto;
        }
      }
      .flag-true {
        color: var(--green-dark);
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
