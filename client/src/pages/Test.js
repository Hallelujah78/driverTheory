import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import styled from "styled-components";
import TestNav from "../components/Test/TestNav.js";
import TestFooter from "../components/Test/TestFooter.js";
import { Loading, ModalAlert } from "../components/index.js";
import { useAppContext } from "../context/appContext.js";
import Question from "../components/Test/Question.js";
import { NoData } from "../components/index.js";
const initialState = {
  modalText: "Exiting the test now will mean that your progress will be lost!",
  buttonText1: "cancel",
  buttonText2: "continue",
};

const Test = () => {
  const navigate = useNavigate();
  const {
    creatingTest,
    exitTest,
    test,
    isLoading,
    modalAlert,
    getTest,
    testLoading,
    setModalState,
  } = useAppContext();
  const [values, setValues] = useState(initialState);

  const handleClickOne = () => {
    setModalState();
  };

  const handleClickTwo = () => {
    setModalState();
    exitTest();
    navigate("/practice");
  };

  useEffect(() => {
    if (!test && !creatingTest) {
      getTest();
    }
  }, []);

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
        <TestNav />
        <div className="loading-container">
          <Loading center />
        </div>

        <TestFooter />
      </Wrapper>
    );
  }

  if (!isLoading && !test && !creatingTest) {
    return (
      <Wrapper className="full-page">
        {modalAlert && (
          <ModalAlert
            {...values}
            handleClickOne={handleClickOne}
            handleClickTwo={handleClickTwo}
          />
        )}
        <TestNav />
        <NoData
          linkText="Back to Practice"
          message="There is no test data..."
          linkTo="/practice"
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
      <TestNav />
      {test && <Question />}

      <TestFooter />
    </Wrapper>
  );
};
export default Test;

const Wrapper = styled.div`
  .loading-container {
    height: calc(100vh - var(--nav-height) * 2);
    display: grid;
    place-items: center;
  }
`;
