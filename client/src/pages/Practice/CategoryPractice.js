import styled from "styled-components";
import { useState, useEffect } from "react";
import { useAppContext } from "../../context/appContext";

const CategoryPractice = () => {
  const { authFetch } = useAppContext();
  const [category, setCategory] = useState(null);
  const [numOfQuestions, setNumOfQuestions] = useState(null);

  const getCategoryLength = async () => {
    const { data } = await authFetch.get(`/questions/practice/${category}`);
    setNumOfQuestions(data.numOfQuestions);
  };

  useEffect(() => {
    getCategoryLength();
  }, [category]);

  const handleClick = (e) => {
    e.preventDefault();
    const buttons = e.currentTarget.querySelectorAll("button");
    buttons.forEach((button) => {
      button.classList.remove("active");
    });
    e.target.classList.add("active");
    setCategory(e.target.id);
  };

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
      {numOfQuestions ? (
        <div className="question-selector">
          <h5>Choose Number of Questions</h5>
          <h4>{numOfQuestions}</h4>
          <div className="input-container">
            <button>-</button>
            <input type="range" value={numOfQuestions} />
            <button>+</button>
          </div>
          <button className="btn btn-block">Start Test</button>
        </div>
      ) : null}

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
