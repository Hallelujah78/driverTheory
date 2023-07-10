import styled from "styled-components";
import { useState, useEffect } from "react";
import LineChart from "./LineChart.js";
// import Wrapper from "../assets/wrappers/ChartsContainer.js";
import { useAppContext } from "../context/appContext.js";
const ChartsContainer = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { authFetch } = useAppContext();

  const getStats = async () => {
    const { data } = await authFetch.get("/test/showStats");

    setData(data.stats);
  };

  useEffect(() => {
    if (!data) {
      getStats();
    }
    setIsLoading(false);
  });

  if (isLoading || !data) {
    return <div>loading </div>;
  }

  return (
    <Wrapper>
      {/* <h4>Test Scores</h4> */}
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
