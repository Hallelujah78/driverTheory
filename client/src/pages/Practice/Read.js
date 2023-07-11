import styled from "styled-components";
import { Link } from "react-router-dom";

const Read = () => {
  return (
    <Wrapper className="full-page">
      <div className="reading">
        <div className="read-container">Read the questions</div>
      </div>
      <div className="filler"></div>
    </Wrapper>
  );
};
export default Read;

const Wrapper = styled.section`
  display: grid;
  grid-template-rows: 1fr 4fr;
  margin-top: calc(var(--nav-height));

  .reading {
    display: grid;
    justify-content: center;
  }
  .read-container {
    margin-top: 2rem;
    max-width: 90vw;
  }
`;
