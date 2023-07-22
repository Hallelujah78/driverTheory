import styled from "styled-components";
import { useEffect, useState } from "react";
import { useAppContext } from "../../context/appContext.js";
import { Loading, NoData, TestListItem } from "../../components/index.js";

const PreviousTests = () => {
  const [previousTests, setPreviousTests] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { authFetch } = useAppContext();

  const getPreviousTests = async () => {
    try {
      const { data } = await authFetch.get("test/prev-results");
      setPreviousTests(data.prevTestArray);
    } catch (error) {
      console.log("GET_PREV_TESTS_ERROR");
      console.log(error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    if (!previousTests) {
      getPreviousTests();
    }
  }, []);

  if (isLoading || !previousTests) {
    return (
      <Wrapper className="full-page">
        <Loading center />
      </Wrapper>
    );
  }
  if (!isLoading && !previousTests?.length) {
    return (
      <Wrapper className="full-page">
        <NoData
          linkText="Back to Results"
          message="There are no previous tests..."
          linkTo="/stats"
        />
      </Wrapper>
    );
  }
  return (
    <Wrapper className="full-page">
      <div className="categories">
        <div className="cat-container">
          {previousTests?.map((test, index) => {
            return <TestListItem key={test.testId} {...test} />;
          })}
        </div>
      </div>
      <div className="whitespace"></div>
    </Wrapper>
  );
};
export default PreviousTests;

const Wrapper = styled.section`
  margin-top: calc(var(--nav-height) * 1.2);
  place-content: center;

  .overview {
    background: var(--primary-500);
    color: white;
    border-top: var(--primary-600) 5px solid;
    display: grid;
    place-content: center;
  }

  .overview-center {
    display: grid;
    place-content: center;
    width: 80vw;
    h4 {
      text-align: center;
      margin: auto auto;
    }
  }
  .categories {
    display: grid;
    justify-content: center;
  }
  .cat-container {
    max-width: 90vw;
  }
  .whitespace {
    height: 10rem;
  }
`;
