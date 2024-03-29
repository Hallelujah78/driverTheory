import styled from "styled-components";
import { useAppContext } from "../../context/appContext";
import Answer from "./Answer.js";

const Question = () => {
  const { test, currentQuestion, submitAnswer, selectAnswer, isComplete } =
    useAppContext();

  const {
    question: { questionText, answers, imageURL },
  } = test?.[currentQuestion] ?? {};

  const handleClick = (e) => {
    e.preventDefault();
    if (isComplete) {
      return;
    }
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
              <img src={imageURL} alt="" />
            </div>
          ) : null}
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
    min-height: 150px;
    padding-top: 1rem;
    width: var(--fluid-width);
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    .text-container {
      width: 50%;
      text-align: center;
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
