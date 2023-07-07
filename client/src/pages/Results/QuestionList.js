import { useEffect } from "react";
import styled from "styled-components";
import { useAppContext } from "../../context/appContext";
import { Loading, NoData, QuestionListItem } from "../../components/index.js";

const QuestionList = () => {
  const { test, getTest, creatingTest, isLoading, setCurrentQuestion } =
    useAppContext();

  useEffect(() => {
    if (!test && !creatingTest) {
      getTest();
    }
  }, []);

  if (isLoading) {
    return (
      <Wrapper>
        <Loading center />
      </Wrapper>
    );
  }
  if (!isLoading && !test && !creatingTest) {
    return (
      <Wrapper>
        <NoData
          linkText="Back to Practice"
          message="There are no results..."
          linkTo="/practice"
        />
      </Wrapper>
    );
  }
  return (
    <Wrapper>
      {test?.map((question, index) => {
        return (
          <QuestionListItem
            key={index}
            {...question}
            index={index}
            setCurrentQuestion={setCurrentQuestion}
          />
        );
      })}
      <div className="whitespace"></div>
    </Wrapper>
  );
};
export default QuestionList;

const Wrapper = styled.section`
  height: 100vh;

  width: 90vw;
  margin-top: calc(var(--nav-height) + 2rem);
  margin-left: auto;
  margin-right: auto;
  display: grid;
  grid-template-columns: 1fr;
  .whitespace {
    height: 10rem;
  }
`;
