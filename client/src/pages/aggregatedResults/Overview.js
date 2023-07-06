import { OverviewListItem } from "../../components/index.js";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { useAppContext } from "../../context/appContext.js";
import { TbThumbDown, TbThumbUp } from "react-icons/tb";
import { Loading, NoData } from "../../components/index.js";

const Overview = () => {
  const [stats, setStats] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { authFetch } = useAppContext();

  const getStats = async () => {
    try {
      const { data } = await authFetch.get("questionData/overview");
      setStats(data.stats);
    } catch (error) {
      console.log("GET_STATS_ERROR");
      console.log(error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    getStats();
  }, []);

  if (isLoading) {
    return (
      <Wrapper className="full-page">
        <Loading center />
      </Wrapper>
    );
  }
  if (!isLoading && !stats) {
    return (
      <Wrapper className="full-page">
        <NoData
          linkText="Back to Results"
          message="There are no results..."
          linkTo="/stats"
        />
      </Wrapper>
    );
  }
  return (
    <Wrapper className="full-page">
      <header className="overview">
        <div className="overview-center">
          <h4>Based on {stats[0].numerator} questions</h4>
        </div>
      </header>
      <div className="categories">
        <div className="cat-container">
          {stats?.map((item, index) => {
            return <OverviewListItem key={index} {...item} />;
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
    margin-top: 2rem;
    max-width: 90vw;
  }
`;
