import styled from "styled-components";
import { useNavigate } from "react-router-dom";
const TestListItem = ({
  category,
  correctAns,
  totalQuestions,
  pass,
  date,
  testId,
}) => {
  const navigate = useNavigate();
  const handleClick = (e) => {
    const testId = e.currentTarget.id;
    navigate(`/stats/previous-results/${testId}`);
  };
  return (
    <Wrapper
      id={testId}
      onClick={(e) => {
        handleClick(e);
      }}
    >
      <div className="title">
        <div className="category">
          {category.charAt(0).toUpperCase() + category.slice(1)} -{" "}
          {pass ? "Pass" : "Fail"}
        </div>
        <div>{date}</div>
      </div>
      <div className="progress-score">
        <div className="progress">
          <div
            className="score"
            style={{
              height: "100%",
              width: `${(correctAns / totalQuestions) * 100}%`,
              backgroundColor: `${
                pass ? "var(--green-dark)" : "var(--red-dark)"
              }`,
            }}
          ></div>
        </div>
        <div className="numerator-total">
          {correctAns} / {totalQuestions}
        </div>
      </div>
    </Wrapper>
  );
};
export default TestListItem;

const Wrapper = styled.div`
  cursor: pointer;
  border: 1px gray solid;
  font-size: 1.1rem;
  width: 80vw;
  margin-bottom: 1.5rem;
  padding: 1rem;
  .title {
    display: flex;
    justify-content: space-between;
  }
  .numerator-total {
    text-align: right;
  }
  .progress-score {
    display: grid;
    grid-template-columns: 7fr 2fr;
  }
  .progress {
    margin: auto 0;
    height: 1.3rem;
    background-color: lightgray;
    width: 100%;
  }
`;
