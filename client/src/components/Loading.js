import styled from "styled-components";
const Loading = ({ center }) => {
  return (
    <Wrapper>
      <div className="loading-container">
        <div className={center ? "loading loading-center" : "loading"}></div>
      </div>
    </Wrapper>
  );
};
export default Loading;

const Wrapper = styled.div`
  .loading-container {
    height: calc(100vh - var(--nav-height) * 2);
    display: grid;
    place-content: center;
  }
`;
