import styled from "styled-components";
import { useAppContext } from "../../context/appContext";
import { useNavigate } from "react-router-dom";
import { Loading } from "../../components/index.js";

const PracticePaper = () => {
  const { createNewTest, isLoading } = useAppContext();
  const navigate = useNavigate();

  const handleClick = () => {
    createNewTest("practice", 20);
    navigate("/randomized-practice");
  };

  if (isLoading) {
    return <Loading center />;
  }
  return (
    <Wrapper>
      <h3>Practice</h3>
      <div className="button-container">
        <button className="btn btn-block">Read the questions</button>
        <button onClick={() => handleClick()} className="btn btn-block">
          Randomized practice paper
        </button>
        <button className="btn btn-block">Practice by category</button>
      </div>
    </Wrapper>
  );
};
export default PracticePaper;

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
