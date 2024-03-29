import styled from "styled-components";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useAppContext } from "../../context/appContext";

const Read = () => {
  const { setCurrentQuestion } = useAppContext();
  useEffect(() => {
    setCurrentQuestion(0);
  }, []);
  return (
    <Wrapper className="full-page">
      <div className="reading">
        <div className="read-container">
          <Link className="btn btn-block" to="/read/all">
            All
          </Link>
          <Link className="btn btn-block" to="/read/control">
            Control of Vehicle
          </Link>
          <Link className="btn btn-block" to="/read/legal">
            Legal Matters/Rules of the Road
          </Link>
          <Link className="btn btn-block" to="/read/risk">
            Managing Risk
          </Link>
          <Link className="btn btn-block" to="/read/safe">
            Safe and Socially Responsible driving
          </Link>
          <Link className="btn btn-block" to="/read/technical">
            Technical Matters
          </Link>
        </div>
      </div>
      <div className="filler"></div>
    </Wrapper>
  );
};
export default Read;

const Wrapper = styled.section`
  display: grid;
  place-content: center;
  margin-top: calc(var(--nav-height));

  .read-container {
    text-align: center;
    width: 90vw;
    display: grid;
    place-content: center;
    height: calc(100vh - var(--nav-height) * 2 - 5rem);
    margin-bottom: 5rem;
  }
  a {
    margin-top: 1.75rem;
    max-width: 85vw;
    line-height: normal;
  }
  .filler {
    height: var(--nav-height);
  }
`;
