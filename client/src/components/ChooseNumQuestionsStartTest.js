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
  );
};
export default ChooseNumQuestionsStartTest;
