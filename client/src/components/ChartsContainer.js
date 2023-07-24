import styled from "styled-components";
import { useState, useEffect } from "react";
import LineChart from "./LineChart.js";
import { NoData, Loading } from "./index.js";
import { useAppContext } from "../context/appContext.js";

const ChartsContainer = (graphFilter) => {
  const [isLoading, setIsLoading] = useState();
  const { authFetch } = useAppContext();
  const [chartData, setChartData] = useState();

  const getStats = async () => {
    setIsLoading(true);
    try {
      console.log(graphFilter);
      const { data } = await authFetch.post("/test/showStats", { graphFilter });
      setChartData(data.stats);
    } catch (error) {
      console.log("GET_STATS_ERROR");
      console.log(error.response.data.msg);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    getStats();
  }, [graphFilter]);

  if (isLoading || !chartData) {
    return (
      <Wrapper>
        <Loading />
      </Wrapper>
    );
  }

  if (!isLoading && !chartData?.length) {
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
      <LineChart className="chart" chartData={chartData} />
    </Wrapper>
  );
};
export default ChartsContainer;

const Wrapper = styled.div`
  height: calc(100vh - var(--nav-height) - 1rem);
  width: 90vw;
  overflow-x: scroll;
`;
