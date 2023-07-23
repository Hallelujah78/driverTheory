import { Outlet, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Nav } from "../dashboard/index.js";

const AggResultsSharedLayout = () => {
  const navigate = useNavigate();

  const handleExit = () => {
    navigate("/stats");
  };

  return (
    <Wrapper className="full-page">
      <Nav handleExit={handleExit} />
      <Outlet />
    </Wrapper>
  );
};

export default AggResultsSharedLayout;

const Wrapper = styled.section`
  margin-top: var(--nav-height);
`;
