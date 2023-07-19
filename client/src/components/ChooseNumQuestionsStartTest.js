import styled from "styled-components";

const ChooseNumQuestionsStartTest = ({
  onClick,
  numTestQuestions,
  numOfQuestions,
  onChange,
}) => {
  const onClickHandler = (e) => {
    const buttonId = e.target.id;
    onClick(buttonId);
  };
  return (
    <Wrapper>
      <div onClick={(e) => onClickHandler(e)} className="question-selector">
        <h5>Choose Number of Questions</h5>
        <h4>{numTestQuestions}</h4>
        <div className="input-container">
          <button id="decrease">-</button>
          <input
            type="range"
            min="1"
            max={numOfQuestions}
            value={numTestQuestions}
            onChange={onChange}
          />
          <button id="increase">+</button>
        </div>
        <button id="start" className="btn btn-block">
          Start Test
        </button>
      </div>
    </Wrapper>
  );
};
export default ChooseNumQuestionsStartTest;

const Wrapper = styled.div`
  .question-selector {
    max-width: 90vw;
    margin: 0 auto;
    margin-top: 2rem;
    text-align: center;
  }
  .input-container {
    display: flex;
    justify-content: space-between;
    margin-bottom: 3rem;
  }
`;
