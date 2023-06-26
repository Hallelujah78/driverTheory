import styled from "styled-components";
import { ModalAlert } from "../../components/index.js";
import { useLocation, useNavigate } from "react-router";
import { TbCircleLetterX } from "react-icons/tb";
import { useState } from "react";

import { useAppContext } from "../../context/appContext.js";

const initialState = {
  modalText: "Exiting the test now will mean that your progress will be lost!",
  buttonText1: "cancel",
  buttonText2: "continue",
};
const TestNav = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { currentQuestion, setModalState, modalAlert, exitTest } =
    useAppContext();
  const [values, setValues] = useState(initialState);

  const handleClick = () => {
    setModalState();
  };

  const handleClickOne = () => {
    setModalState();
  };

  const handleClickTwo = () => {
    setModalState();
    exitTest();
    navigate("/practice");
  };

  return (
    <Wrapper>
      {modalAlert && (
        <ModalAlert
          {...values}
          handleClickOne={handleClickOne}
          handleClickTwo={handleClickTwo}
        />
      )}
      <div className="nav-center">
        <div className="container">
          <TbCircleLetterX className="exit" onClick={() => handleClick()} />
          <h3>Practice Paper</h3>

          {location.pathname === "/randomized-practice" && (
            <h3>
              Q<span> {currentQuestion + 1}</span>
            </h3>
          )}
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.nav`
  color: white;
  height: var(--nav-height);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 1px 0px 0px rgba(0, 0, 0, 0.1);
  .exit {
    font-size: 2.5rem;
    color: white;
  }

  .container {
    display: flex;
    align-content: center;
    justify-content: space-between;
    h3 {
      margin: auto 0;
      font-size: 1.5rem;
    }
  }

  .nav-center {
    display: flex;
    width: 90vw;
    align-items: center;
    justify-content: space-between;
  }

  background: var(--primary-500);
  .btn-container {
    position: relative;
  }

  .btn {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0 0.5rem;
    position: relative;
    box-shadow: var(--shadow-2);
  }

  @media (min-width: 992px) {
    position: sticky;
    top: 0;

    .nav-center {
      width: 90%;
    }
  }
`;
export default TestNav;
