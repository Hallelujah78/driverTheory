import styled from "styled-components";
import { useState, useEffect } from "react";
import LineChart from "./LineChart.js";
import { NoData, Loading } from "./index.js";
import { useAppContext } from "../context/appContext.js";

const ChartsContainer = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { authFetch } = useAppContext();

  const getStats = async () => {
    try {
      const { data } = await authFetch.get("/test/showStats");
      setData(data.stats);
    } catch (error) {
      console.log("GET_STATS_ERROR");
      console.log(error.response.data.msg);
    }
  };

  useEffect(() => {
    if (!data) {
      getStats();
    }
    setIsLoading(false);
  });

  if (isLoading) {
    return (
      <Wrapper>
        <Loading />
      </Wrapper>
    );
  }

  if (!isLoading && !data) {
    return (
      <Wrapper>
        <NoData
          message="No previous test results to display..."
          linkTo="/stats"
          linkText="Back to Results"
        />
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <LineChart className="chart" data={data} />
    </Wrapper>
  );
};
export default ChartsContainer;

const Wrapper = styled.div`
  height: calc(100vh - var(--nav-height) * 2 - 1rem);

  width: 90vw;
  overflow-x: scroll;
`;
