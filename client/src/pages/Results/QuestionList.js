import { useEffect } from "react";
import styled from "styled-components";
import { useAppContext } from "../../context/appContext";
import { QuestionListItem } from "../../components/index.js";
import { Loading, NoData } from "../../components/index.js";

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
    </Wrapper>
  );
};
export default QuestionList;

const Wrapper = styled.section`
  min-height: calc(100vh - var(--nav-height) * 2);
  width: 90vw;
  display: grid;
  grid-template-rows: repeat(1fr);
  margin: calc(var(--nav-height) + 1.5rem) auto 1.5rem auto;
  overflow: auto;
  flex-grow: 1;
`;
