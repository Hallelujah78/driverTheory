import { ChartsContainer } from "../../components/index.js";
import styled from "styled-components";
const Graphs = () => {
  return (
    <Wrapper>
      <ChartsContainer />
    </Wrapper>
  );
};
export default Graphs;

const Wrapper = styled.section`
  display: grid;
  place-content: center;

  padding-top: 0.5rem;
`;
