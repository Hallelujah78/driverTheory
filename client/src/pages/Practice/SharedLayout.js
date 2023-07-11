import { Outlet, useNavigate } from "react-router-dom";
import TestFooter from "../../components/Test/TestFooter.js";
import { useAppContext } from "../../context/appContext.js";
import ModalAlert from "../../components/ModalAlert.js";
import { useState } from "react";
import styled from "styled-components";
import { Nav } from "../dashboard/index.js";

const initialState = {
  modalText: "Exiting the test now will mean that your progress will be lost!",
  buttonText1: "cancel",
  buttonText2: "continue",
};

const PracticeSharedLayout = () => {
  const navigate = useNavigate();
  const { modalAlert, exitTest, setModalState } = useAppContext();
  const [values, setValues] = useState(initialState);

  const handleExit = () => {
    navigate("/");
  };

  const handleClickOne = () => {
    setModalState();
  };

  const handleClickTwo = () => {
    setModalState();
    exitTest();
    navigate("/");
  };

  return (
    <Wrapper className="full-page">
      {modalAlert && (
        <ModalAlert
          {...values}
          handleClickOne={handleClickOne}
          handleClickTwo={handleClickTwo}
        />
      )}
      <Nav handleExit={handleExit} />
      <Outlet />
      <TestFooter />
    </Wrapper>
  );
};

export default PracticeSharedLayout;

const Wrapper = styled.section`
  margin-top: var(--nav-height);
`;
