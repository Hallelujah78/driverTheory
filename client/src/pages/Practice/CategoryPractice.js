import styled from "styled-components";
import { useState, useEffect } from "react";
import { useAppContext } from "../../context/appContext";
import { useNavigate } from "react-router-dom";
import {
  ChooseNumQuestionsStartTest,
  SmallLoading,
} from "../../components/index.js";

const CategoryPractice = () => {
  const navigate = useNavigate();
  const { authFetch } = useAppContext();
  const [questionCategory, setQuestionCategory] = useState(null);
  const [numOfQuestions, setNumOfQuestions] = useState(null);
  const [numTestQuestions, setNumTestQuestions] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { createNewTest } = useAppContext();

  const getCategoryLength = async () => {
    setIsLoading(true);
    try {
      const { data } = await authFetch.get(
        `/questions/practice/${questionCategory}`
      );
      setNumOfQuestions(data.numOfQuestions);
      setNumTestQuestions(Number(data.numOfQuestions));
    } catch (error) {}
    setIsLoading(false);
  };

  const onChange = (e) => {
    console.log(e.target.value);
    e.preventDefault();
    setNumTestQuestions(Number(e.target.value));
  };

  const onClick = (buttonId) => {
    if (buttonId === "increase" && numTestQuestions < numOfQuestions) {
      setNumTestQuestions(numTestQuestions + 1);
    }
    if (buttonId === "decrease" && numTestQuestions > 1) {
      setNumTestQuestions(numTestQuestions - 1);
    }
    if (buttonId === "start") {
      createNewTest("category practice", questionCategory, numTestQuestions);
      navigate("/category-practice/test");
    }
  };

  useEffect(() => {
    if (questionCategory) {
      getCategoryLength();
    }
  }, [questionCategory]);

  const handleClick = (e) => {
    e.preventDefault();
    const buttons = e.currentTarget.querySelectorAll("button");
    buttons.forEach((button) => {
      button.classList.remove("active");
    });
    e.target.classList.add("active");
    if (e.target.id) {
      setQuestionCategory(e.target.id);
    }
  };

  // if (isLoading) {
  //   return (
  //     <Wrapper>
  //       <Loading />
  //     </Wrapper>
  //   );
  // }

  return (
    <Wrapper className="full-page">
      <div className="category-center">
        <div className="category-container" onClick={(e) => handleClick(e)}>
          <button id="control" className="btn btn-block category-btn">
            Control of Vehicle
          </button>
          <button id="legal" className="btn btn-block category-btn">
            Legal Matters/Rules of the Road
          </button>
          <button id="risk" className="btn btn-block category-btn">
            Managing Risk
          </button>
          <button id="safe" className="btn btn-block category-btn">
            Safe and Socially Responsible Driving
          </button>
          <button id="technical" className="btn btn-block category-btn">
            Technical Matters
          </button>
        </div>
      </div>
      {!isLoading ? (
        <ChooseNumQuestionsStartTest
          onChange={onChange}
          numOfQuestions={numOfQuestions}
          onClick={onClick}
          numTestQuestions={numTestQuestions}
        />
      ) : (
        <SmallLoading />
      )}

      <div className="filler"></div>
    </Wrapper>
  );
};
export default CategoryPractice;

const Wrapper = styled.section`
  display: grid;
  grid-template-rows: 1fr 1fr;
  .category-center {
    display: grid;
    max-width: 90vw;
    margin: 0 auto;
    margin-top: 1.5rem;
  }
  .category-container {
    display: grid;
  }
  .category-btn {
    padding: 0 1rem;
    background-color: var(--primary-500);
  }
  .active {
    background-color: #f9f9f9f9;
    color: var(--primary-500);
    border: 1px solid var(--primary-500);
  }
`;
