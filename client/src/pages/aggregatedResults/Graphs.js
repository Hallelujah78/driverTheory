import { ChartsContainer } from "../../components/index.js";
import styled from "styled-components";
import { useState } from "react";
const Graphs = () => {
  const [graphFilter, setGraphFilter] = useState("all");
  const handleClick = (e) => {
    e.preventDefault();
    if (!e.target.id) {
      return;
    }
    const buttons = e.currentTarget.querySelectorAll("button");
    buttons.forEach((button) => {
      button.classList.remove("active");
    });
    if (e.target.id) {
      e.target.classList.add("active");
    }
    if (e.target.id) {
      setGraphFilter(e.target.id);
    }
  };
  return (
    <Wrapper>
      <ChartsContainer graphFilter={graphFilter} />
      <div
        className="button-container"
        onClick={(e) => {
          handleClick(e);
        }}
      >
        <button id="all" className="btn active">
          All
        </button>
        <button id="mock" className="btn">
          Mock Test
        </button>
        <button id="practice" className="btn">
          Practice
        </button>
      </div>
    </Wrapper>
  );
};
export default Graphs;

const Wrapper = styled.section`
  position: relative;
  display: grid;
  place-content: center;
  padding-top: 0.5rem;
  button {
    margin-left: 1rem;
    margin-right: 1rem;
    background-color: var(--primary-500);
  }
  .button-container {
    position: absolute;
    bottom: 4rem;
    width: 100%;
    display: flex;
    justify-content: center;
  }

  .active {
    background-color: #f9f9f9f9;
    color: var(--primary-500);
    border: 1px solid var(--primary-500);
  }
`;
