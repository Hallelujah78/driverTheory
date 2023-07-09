import { useState, useEffect } from "react";
import LineChart from "./LineChart.js";
import Wrapper from "../assets/wrappers/ChartsContainer.js";
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
      <h4>Test Scores</h4>

      <LineChart data={data} />
    </Wrapper>
  );
};
export default ChartsContainer;
