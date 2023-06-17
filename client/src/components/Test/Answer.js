import styled from "styled-components";
import { AiOutlineCheck, AiOutlineClose } from "react-icons/ai";
import { useAppContext } from "../../context/appContext.js";
const Answer = ({ answer, handleClick, index }) => {
  const { test, currentQuestion } = useAppContext();
  const { userAnswer, selected, question } = test[currentQuestion];

  const ENUM_STATES = {
    correct: <AiOutlineCheck className="correct" />,
    incorrect: <AiOutlineClose className="incorrect" />,
    default: null,
  };

  const renderIcons = (question) => {
    let option;

    // if the question answer is true (correct)
    if (question.answers[index].isCorrect) {
      option = "correct";
    } else {
      option = "incorrect";
    }
    return ENUM_STATES[option];
  };

  return (
    <Wrapper>
      <label>
        <input type="radio" name="group" />
        <span
          id={index}
          className={
            userAnswer === index
              ? "answer-text submitted"
              : selected !== null && selected === index
              ? "answer-text selected"
              : "answer-text"
          }
          onClick={(e) => {
            handleClick(e);
          }}
        >
          {answer}
          {userAnswer !== null ? renderIcons(question) : null}
        </span>
      </label>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  label {
    display: block;
    height: 100%;
    width: 100%;
  }

  cursor: pointer;
  input[type="radio"] {
    display: none;
  }
  span {
    border-radius: var(--borderRadius);
    border: 1px solid gray;
    cursor: pointer;
    display: grid;
    grid-template-columns: 4fr 1fr;
    text-align: center;
    padding: 3px 7px;
    place-items: center;
  }
  .selected {
    border: 4px solid var(--primary-500);
  }
  .submitted {
    color: white;
    background-color: var(--primary-500);
    opacity: 0.8;
  }
  .correct {
    color: green;
    font-size: 2rem;
  }
  .incorrect {
    color: red;
    font-size: 2rem;
  }
`;

export default Answer;
