import styled from "styled-components";
import { useAppContext } from "../../context/appContext";
import { useNavigate } from "react-router-dom";
import { Loading } from "../../components/index.js";

const Stats = () => {
  const { isLoading } = useAppContext();
  const navigate = useNavigate();

  if (isLoading) {
    return <Loading center />;
  }
  return (
    <Wrapper>
      <h3>Results</h3>
      <div className="button-container">
        <button
          onClick={() => navigate("/stats/overview")}
          className="btn btn-block"
        >
          Overview
        </button>
        <button
          onClick={() => navigate("/stats/graphs")}
          className="btn btn-block"
        >
          Graphs
        </button>
        <button
          onClick={() => navigate("/stats/previous-results")}
          className="btn btn-block"
        >
          Previous Test Results
        </button>
      </div>
    </Wrapper>
  );
};
export default Stats;

const Wrapper = styled.section`
  border-radius: var(--borderRadius);
  width: 100%;
  background: var(--white);
  padding: 3rem 2rem 4rem;
  box-shadow: var(--shadow-2);
  .btn {
    margin-top: 2rem;
  }
  @media (min-width: 992px) {
    .btn {
      max-width: var(--fixed-width);
    }
    .button-container {
      place-items: center;
      display: grid;
      grid-template-columns: 1fr;
    }
  }
`;
