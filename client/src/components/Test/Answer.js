import styled from "styled-components";
import { renderIcons } from "../../utils/renderIcons.js";
import { useAppContext } from "../../context/appContext.js";

const Answer = ({ answer, handleClick, index }) => {
  const { test, currentQuestion } = useAppContext();
  const { userAnswer, selected, question } = test[currentQuestion];

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
          {userAnswer !== null ? renderIcons(question, index) : null}
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
`;

export default Answer;
