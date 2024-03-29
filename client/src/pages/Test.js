import { useState, useEffect } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import styled from "styled-components";
import TestNav from "../components/Test/TestNav.js";
import TestFooter from "../components/Test/TestFooter.js";
import { useAppContext } from "../context/appContext.js";
import Question from "../components/Test/Question.js";
import { NoData, Loading, ModalAlert } from "../components/index.js";

const initialState = {
  modalText: "Exiting the test now will mean that your progress will be lost!",
  buttonText1: "cancel",
  buttonText2: "continue",
};

const Test = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const {
    currentQuestion,
    testTitle,
    isComplete,
    creatingTest,
    exitTest,
    test,
    isLoading,
    modalAlert,
    getTest,
    testLoading,
    setModalState,
    getQuestionsRead,
  } = useAppContext();
  const [values, setValues] = useState(initialState);

  const testId = useParams().testId;
  const category = useParams().category;

  const handleExit = () => {
    if (testId) {
      exitTest();
      navigate("/stats/previous-results");
      return;
    }
    if (location.pathname.includes("/read/")) {
      navigate("/read");
      return;
    }
    if (isComplete) {
      setValues({ ...values, modalText: "Are you sure you want to exit?" });
    }
    if (!isLoading && !test && !creatingTest) {
      exitTest();
      navigate("/");
      return;
    }
    setModalState();
  };

  const handleClickOne = () => {
    setModalState();
  };

  const handleClickTwo = () => {
    setModalState();
    exitTest();
    navigate("/");
  };

  useEffect(() => {
    if (!test && !creatingTest && !testId && !category) {
      getTest();
    }
    if (testId) {
      getTest(testId);
    }
    if (category) {
      getQuestionsRead(category);
    }
  }, [testId, category]);

  if (testLoading || isLoading) {
    return (
      <Wrapper className="full-page">
        {modalAlert && (
          <ModalAlert
            {...values}
            handleClickOne={handleClickOne}
            handleClickTwo={handleClickTwo}
          />
        )}
        <TestNav
          isComplete={isComplete}
          currentQuestion={currentQuestion}
          testTitle={testTitle}
          handleExit={handleExit}
          setValues={setValues}
        />
        <div className="loading-container">
          <Loading center />
        </div>

        <TestFooter />
      </Wrapper>
    );
  }

  if (!isLoading && !test && !creatingTest && !!testId) {
    return (
      <Wrapper className="full-page">
        {modalAlert && (
          <ModalAlert
            {...values}
            handleClickOne={handleClickOne}
            handleClickTwo={handleClickTwo}
          />
        )}
        <TestNav
          isComplete={isComplete}
          currentQuestion={currentQuestion}
          testTitle={testTitle}
          handleExit={handleExit}
          setValues={setValues}
        />
        <NoData
          linkText="Back to Practice"
          message="There is no test data..."
          linkTo={testId ? "/stats/previous-results" : "/"}
        />

        <TestFooter />
      </Wrapper>
    );
  }

  return (
    <Wrapper className="full-page">
      {modalAlert && (
        <ModalAlert
          {...values}
          handleClickOne={handleClickOne}
          handleClickTwo={handleClickTwo}
        />
      )}
      <TestNav
        isComplete={isComplete}
        currentQuestion={currentQuestion}
        testTitle={testTitle}
        handleExit={handleExit}
        setValues={setValues}
      />
      {test && <Question />}

      <TestFooter />
    </Wrapper>
  );
};
export default Test;

const Wrapper = styled.div`
  margin: calc(var(--nav-height) + 1.5rem) auto 0rem auto;
  .loading-container {
    height: calc(100vh - var(--nav-height) * 2);
    display: grid;
    place-items: center;
  }
`;
