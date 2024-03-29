import { useAppContext } from "../../context/appContext";
import Wrapper from "../../assets/wrappers/DashboardFormPage";
import {
  FormRow,
  FormRowSelect,
  Unauthorized,
} from "../../components/index.js";

const AddQuestion = () => {
  const {
    notifyWarning,
    user,
    isLoading,
    handleChange,
    clearValues,
    createQuestion,
    questionCategory,
    questionCategoryOptions,
    questionText,
    correctAnswer,
    answerTwo,
    answerThree,
    answerFour,
    imageURL,
  } = useAppContext();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !questionText ||
      !correctAnswer ||
      !answerTwo ||
      !answerThree ||
      !answerFour
    ) {
      notifyWarning("please provide all values!");

      return;
    }

    createQuestion();
  };

  const handleJobChange = (e) => {
    handleChange({ name: e.target.name, value: e.target.value });
  };

  if (user.role !== "admin") {
    return (
      <Unauthorized
        message="You do not have permission to access this page. Redirecting ..."
        navigateTo="/"
      />
    );
  }

  return (
    <Wrapper>
      <form className="form">
        <h3>add question</h3>

        <div className="form-center">
          {/* question text */}
          <FormRow
            labelText="question text"
            type="text"
            name="questionText"
            value={questionText}
            handleChange={handleJobChange}
          />
          {/* imageURL */}
          <FormRow
            labelText="image URL"
            type="text"
            name="imageURL"
            value={imageURL}
            handleChange={handleJobChange}
          />

          {/* answer one*/}
          <FormRow
            labelText="correct answer"
            type="text"
            name="correctAnswer"
            value={correctAnswer}
            handleChange={handleJobChange}
          />
          {/* answer two */}
          <FormRow
            labelText="answer two"
            type="text"
            name="answerTwo"
            value={answerTwo}
            handleChange={handleJobChange}
          />
          {/* answer three */}
          <FormRow
            labelText="answer three"
            type="text"
            name="answerThree"
            value={answerThree}
            handleChange={handleJobChange}
          />
          {/* answer four */}
          <FormRow
            labelText="answer four"
            type="text"
            name="answerFour"
            value={answerFour}
            handleChange={handleJobChange}
          />

          {/* question category */}
          <FormRowSelect
            labelText="question category"
            name="questionCategory"
            list={questionCategoryOptions}
            value={questionCategory}
            handleChange={handleJobChange}
          />

          <div className="btn-container">
            <button
              disabled={isLoading}
              className="btn btn-block submit-btn"
              type="submit"
              onClick={handleSubmit}
            >
              submit
            </button>
            <button
              disabled={isLoading}
              onClick={(e) => {
                e.preventDefault();
                clearValues();
              }}
              className="btn btn-block clear-btn"
            >
              clear
            </button>
          </div>
        </div>
      </form>
    </Wrapper>
  );
};
export default AddQuestion;
