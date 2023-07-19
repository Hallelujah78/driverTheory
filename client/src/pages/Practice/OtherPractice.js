import styled from "styled-components";
import { useNavigate, useLocation } from "react-router-dom";
import {
  ChooseNumQuestionsStartTest,
  Loading,
} from "../../components/index.js";
import { useAppContext } from "../../context/appContext.js";
import { useState, useEffect } from "react";

const OtherPractice = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { authFetch } = useAppContext();

  const [numOfQuestions, setNumOfQuestions] = useState(null);
  const [numTestQuestions, setNumTestQuestions] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { createNewTest } = useAppContext();

  const getQuestionsLength = async () => {
    const testType = location.pathname;
    console.log(testType);
    // this needs to get the number of questions for least-seen, flagged, incorrect etc
    setIsLoading(true);
    const { data } = await authFetch.post("/questions/practice/other", {
      testType,
    });
    console.log(data);

    setNumOfQuestions(data.numOfQuestions);
    setNumTestQuestions(Number(data.numOfQuestions));
    setIsLoading(false);
  };

  const onChange = (e) => {
    console.log(e.target.value);
    e.preventDefault();
    setNumTestQuestions(Number(e.target.value));
  };

  const onClick = (buttonId) => {
    const testType = location.pathname;
    if (buttonId === "increase" && numTestQuestions < numOfQuestions) {
      setNumTestQuestions(numTestQuestions + 1);
    }
    if (buttonId === "decrease" && numTestQuestions > 1) {
      setNumTestQuestions(numTestQuestions - 1);
    }
    if (buttonId === "start") {
      createNewTest(testType, testType, numTestQuestions);
      navigate(`${testType}/test`);
    }
  };

  useEffect(() => {
    getQuestionsLength();
  }, []);

  if (isLoading) {
    return (
      <Wrapper className="full-page">
        <Loading center />
      </Wrapper>
    );
  }

  return (
    <Wrapper className="full-page">
      <div className="other-practice">
        <div className="practice-container">
          <ChooseNumQuestionsStartTest
            onChange={onChange}
            numOfQuestions={numOfQuestions}
            onClick={onClick}
            numTestQuestions={numTestQuestions}
          />
        </div>
      </div>
      <div className="filler"></div>
    </Wrapper>
  );
};
export default OtherPractice;

const Wrapper = styled.section`
  display: grid;
  place-content: center;
  margin-top: calc(var(--nav-height));

  .practice-container {
    text-align: center;
    width: 90vw;
    display: grid;
    place-content: center;
    height: calc(100vh - var(--nav-height) * 2 - 5rem);
    margin-bottom: 5rem;
  }
  a {
    margin-top: 1.75rem;
    max-width: 85vw;
    line-height: normal;
  }
  .filler {
    height: var(--nav-height);
  }
`;
