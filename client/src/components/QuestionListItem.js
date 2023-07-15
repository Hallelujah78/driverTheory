import styled from "styled-components";
import { renderIconsBool } from "../utils/renderIcons";
import { useNavigate } from "react-router-dom";
const QuestionListItem = ({
  question,
  isCorrect,
  index,
  setCurrentQuestion,
}) => {
  const navigate = useNavigate();
  const handleClick = () => {
    setCurrentQuestion(index);
    navigate("/randomized-practice");
  };
  return (
    <Wrapper onClick={handleClick}>
      <span>{renderIconsBool(isCorrect, index)}</span>
      <div>{question.questionText}</div>
    </Wrapper>
  );
};
export default QuestionListItem;

const Wrapper = styled.div`
  &:hover {
    cursor: pointer;
  }
  margin-top: 1rem;

  border: 1px solid var(--grey-500);
  max-height: 3rem;
  width: 90vw;
  display: flex;
  border-radius: var(--borderRadius);
  div {
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    margin: auto 0 auto 1rem;
    font-size: 1.5rem;
  }

  span {
    display: grid;
    place-content: center;
    padding-left: 0.5rem;
    font-size: 2.25rem;
  }
`;
