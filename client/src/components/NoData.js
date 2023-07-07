import { Link } from "react-router-dom";
import styled from "styled-components";

const NoData = ({ message, linkTo, linkText }) => {
  return (
    <Wrapper>
      <div className="loading-container">
        <h4>{message}</h4>
        <Link className="btn" to={linkTo}>
          {linkText}
        </Link>
      </div>
    </Wrapper>
  );
};
export default NoData;

const Wrapper = styled.section`
  margin: auto;
  width: 80vw;
  height: 60vh;
  display: grid;
  grid-template-rows: repeat(1fr);
  place-content: center;
  text-align: center;
`;
