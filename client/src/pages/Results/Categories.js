import { CategoryListItem } from "../../components/index.js";
import { useAppContext } from "../../context/appContext.js";
import styled from "styled-components";
import { useEffect } from "react";

const Categories = () => {
  const { test, getTest, creatingTest, isLoading } = useAppContext();

  useEffect(() => {
    if (!test && !creatingTest) {
      getTest();
    }
  }, []);

  if (isLoading) {
    return <p>loading...</p>;
  }
  return (
    <Wrapper>
      <div className="totals">Totals</div>
      <div className="categories">
        {[
          ...new Set(
            test?.map((question) => {
              return question?.question.category;
            })
          ),
        ].map((category, index) => {
          return (
            <CategoryListItem key={index} test={test} category={category} />
          );
        })}
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
    border: red solid 1px;
  }
`;
