import { useState } from "react";

import LineChart from "./LineChart.js";

import Wrapper from "../assets/wrappers/ChartsContainer.js";

const ChartsContainer = () => {
  const data = [
    { count: 87.5, date: "Jan 2020" },
    { count: 40, date: "Feb 2020" },
    { count: 67.8, date: "Mar 2020" },
    { count: 85, date: "Apr 2020" },
    { count: 42, date: "May 2020" },
    { count: 60, date: "Jun 2020" },
  ];
  return (
    <Wrapper>
      <h4>Monthly Applications</h4>

      <LineChart data={data} />
    </Wrapper>
  );
};
export default ChartsContainer;
