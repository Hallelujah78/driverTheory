import { CategoryListItem } from "../../components/index.js";
import { useAppContext } from "../../context/appContext.js";
import styled from "styled-components";
import { useEffect } from "react";

const Categories = () => {
  const { test, getTest, creatingTest, isLoading, results } = useAppContext();

  useEffect(() => {
    if (!test && !creatingTest) {
      getTest();
    }
  }, []);

  if (isLoading || !results) {
    return <p>loading...</p>;
  }
  return (
    <Wrapper>
      <div className="totals">
        <h1>
          {results.correct}/{results.totalQuestions}
        </h1>
        <h2>{results.pass}</h2>
      </div>
      <div className="categories">
        <div className="cat-container">
          {results?.categories.map((category, index) => {
            return <CategoryListItem key={index} {...category} />;
          })}
        </div>
      </div>
    </Wrapper>
  );
};
export default Categories;

const Wrapper = styled.section`
  display: grid;
  grid-template-rows: 1fr 3fr;
  height: calc(100vh - var(--nav-height) * 2);
  border: red 1px solid;
  .totals {
    border: red solid 1px;
    background: var(--primary-500);
    color: white;
    border-top: gray solid 5px;
  }
  .categories {
    display: grid;
    place-content: center;
  }
  .cat-container {
    max-width: 90vw;
  }
`;
