import { Outlet, useNavigate } from "react-router-dom";
// import Wrapper from "../../assets/wrappers/SharedLayout.js";
import TestNav from "../../components/Test/TestNav.js";
import TestFooter from "../../components/Test/TestFooter.js";
import { useAppContext } from "../../context/appContext.js";
import ModalAlert from "../../components/ModalAlert.js";
import { useState } from "react";

const initialState = {
  modalText: "Exiting the test now will mean that your progress will be lost!",
  buttonText1: "cancel",
  buttonText2: "continue",
};

const ResultsSharedLayout = () => {
  const navigate = useNavigate();
  const {
    test,
    modalAlert,
    isComplete,
    isLoading,
    creatingTest,
    exitTest,
    setModalState,
  } = useAppContext();
  const [values, setValues] = useState(initialState);

  const handleExit = () => {
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
  return (
    <div className="full-page">
      {modalAlert && (
        <ModalAlert
          {...values}
          handleClickOne={handleClickOne}
          handleClickTwo={handleClickTwo}
        />
      )}
      <TestNav handleExit={handleExit} />
      <Outlet />
      <TestFooter />
    </div>
  );
};
export default ResultsSharedLayout;
