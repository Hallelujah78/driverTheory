import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import styled from "styled-components";

const Unauthorized = ({ message }) => {
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      navigate("/");
    }, 3000);
  });

  return (
    <Wrapper>
      <h4>{message}</h4>
    </Wrapper>
  );
};
export default Unauthorized;
const Wrapper = styled.div`
  height: 40vh;
  display: grid;
  place-items: center;
`;
