import styled from "styled-components";

import { useAppContext } from "../../context/appContext";

import Answer from "./Answer.js";

const Question = () => {
  const { getTest, test, currentQuestion, submitAnswer, selectAnswer } =
    useAppContext();

  const {
    userAnswer,
    isCorrect,
    selected,
    question: { imageURL, questionText, answers },
  } = test?.[currentQuestion] ?? {};

  const handleClick = (e) => {
    e.preventDefault();
    const answerIndex = +e.target.id;

    if (test[currentQuestion].userAnswer !== null) {
      return;
    }

    if (e.target.classList.contains("selected")) {
      e.target.classList.remove("selected");

      submitAnswer(answerIndex, currentQuestion);
      return;
    }

    selectAnswer(answerIndex);
  };

  return (
    <Wrapper>
      <div>
        <div className="question-container">
          <div className="text-container">
            <p>{questionText}</p>
          </div>
          {imageURL ? (
            <div className="image-container">
              <img src={imageURL} />
            </div>
          ) : (
            <div className="image-fill"></div>
          )}
        </div>
        <div className="answer-container">
          {answers.map((item, index) => {
            item.index = index;
            return <Answer key={index} {...item} handleClick={handleClick} />;
          })}
        </div>
      </div>
    </Wrapper>
  );
};
export default Question;

const Wrapper = styled.div`
  .question-container {
    padding-top: 1rem;
    width: var(--fluid-width);
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    .text-container {
      width: 50%;
    }
    img {
      width: 125px;
      height: 125px;
    }
    .image-fill {
      height: 125px;
      width: 125px;
    }
  }
  .answer-container {
    width: var(--fluid-width);
    margin: 0 auto;
    display: grid;
    grid-template-columns: 1fr;
    align-content: space-around;
    justify-content: space-around;
    height: 40vh;
  }
`;
