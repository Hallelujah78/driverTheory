import styled from "styled-components";
import { useAppContext } from "../../context/appContext";
import { useNavigate, Link } from "react-router-dom";
import { Loading } from "../../components/index.js";

const PracticePaper = () => {
  const { createNewTest, isLoading } = useAppContext();
  const navigate = useNavigate();

  const handleClick = (e) => {
    if (e.target.id === "practice") {
      createNewTest("practice", null, 20);
      navigate("/randomized-practice");
    }

    if (e.target.id === "official") {
      createNewTest("official test");
    }
  };

  if (isLoading) {
    return <Loading center />;
  }
  return (
    <Wrapper>
      <h3>Practice</h3>
      <div onClick={(e) => handleClick(e)} className="button-container">
        <Link to="/read" className="btn btn-block">
          Read the questions
        </Link>
        <button id="practice" className="btn btn-block">
          Randomized practice paper
        </button>
        <Link to="/category-practice" className="btn btn-block">
          Practice by category
        </Link>
        <Link to="/least-seen" className="btn btn-block">
          Questions Seen the Least
        </Link>
        <Link to="/flagged" className="btn btn-block">
          Flagged for Practice
        </Link>
        <Link to="/incorrect" className="btn btn-block">
          Answered Incorrectly
        </Link>
        <Link id="official" to="/official-test" className="btn btn-block">
          Official Style Test
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
  padding: 1rem 2rem 3rem;
  box-shadow: var(--shadow-2);
  .btn {
    margin-top: 1.75rem;
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
