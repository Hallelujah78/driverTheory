import styled from "styled-components";
const SmallLoading = ({ center }) => {
  return (
    <Wrapper>
      <div className="loading-container">
        <div className={center ? "loading loading-center" : "loading"}></div>
      </div>
    </Wrapper>
  );
};
export default SmallLoading;

const Wrapper = styled.div`
  display: grid;
  place-content: center;
  /* .loading-container {
    height: calc(100vh - var(--nav-height) * 2);
    display: grid;
    place-content: center;
  } */
`;
