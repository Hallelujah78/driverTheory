import { OverviewListItem } from "../../components/index.js";
import { useAppContext } from "../../context/appContext.js";
import styled from "styled-components";
import { useEffect } from "react";
import { TbThumbDown, TbThumbUp } from "react-icons/tb";
import { Loading, NoData } from "../../components/index.js";

const Overview = () => {
  const { test, getTest, creatingTest, isLoading, results } = useAppContext();

  useEffect(() => {
    if (!test && !creatingTest) {
      getTest();
    }
  }, []);

  if (isLoading) {
    return (
      <Wrapper className="full-page">
        <Loading center />
      </Wrapper>
    );
  }
  if (!isLoading && !test && !creatingTest) {
    return (
      <Wrapper className="full-page">
        <NoData
          linkText="Back to Practice"
          message="There are no results..."
          linkTo="/practice"
        />
      </Wrapper>
    );
  }
  return (
    <Wrapper className="full-page">
      <header className="overview">
        <div className="overview-center">
          <div className="pass">
            <h4>
              {results.correct} / {results.totalQuestions}
            </h4>
            <h5>{results.pass}</h5>
          </div>
          <div className="right-wrong">
            <div className="correct">
              <TbThumbUp className="icon" />
              <span>{results.correct}</span>
            </div>

            <div className="incorrect">
              <TbThumbDown className="icon" />
              <span>{results.incorrect}</span>
            </div>
          </div>
        </div>
      </header>
      <div className="categories">
        <div className="cat-container">
          {results?.categories.map((category, index) => {
            return <OverviewListItem key={index} {...category} />;
          })}
        </div>
      </div>
    </Wrapper>
  );
};
export default Overview;

const Wrapper = styled.section`
  display: grid;
  grid-template-rows: 1fr 4fr;

  margin-top: calc(var(--nav-height));

  .overview {
    background: var(--primary-500);
    color: white;
    border-top: var(--primary-600) 5px solid;
    .pass {
    }
    h3,
    h4 {
      margin: 1rem 0;
    }
  }
  .right-wrong {
    display: grid;
    align-items: center;
  }
  .correct,
  .incorrect {
    display: grid;
    grid-template-columns: 6fr 1fr;
    align-items: center;
    justify-content: right;

    .icon {
      font-size: 1.6rem;
      justify-self: right;
    }

    span {
      justify-self: right;

      font-size: 1.6rem;
      text-align: right;
      width: 1.6rem;
      margin-left: -1.6rem;
    }
  }
  .correct .icon {
    color: var(--green-dark);
  }
  .incorrect .icon {
    color: var(--red-dark);
  }

  .overview-center {
    display: grid;
    grid-template-columns: 1fr 1fr;
    align-content: space-between;
    width: 80vw;
    margin: 0 auto;
  }
  .categories {
    display: grid;
    justify-content: center;
  }
  .cat-container {
    margin-top: 2rem;
    max-width: 90vw;
  }
`;
