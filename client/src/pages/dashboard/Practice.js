import styled from "styled-components";
import { useAppContext } from "../../context/appContext";
import { useNavigate, Link } from "react-router-dom";
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
        <Link to="/read" className="btn btn-block">
          Read the questions
        </Link>
        <button onClick={() => handleClick()} className="btn btn-block">
          Randomized practice paper
        </button>
        <Link to="/category-practice" className="btn btn-block">
          Practice by category
        </Link>
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
    text-align: center;
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
  a {
    margin: auto;
    line-height: normal;
  }
`;
