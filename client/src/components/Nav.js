import styled from "styled-components";
import { TbCircleLetterX } from "react-icons/tb";
import { useLocation } from "react-router-dom";

const Nav = ({ handleExit }) => {
  const location = useLocation();
  return (
    <Wrapper>
      <div className="nav-center">
        <div className="container">
          <TbCircleLetterX className="exit" onClick={() => handleExit()} />
          <h3>
            {location.pathname === "/stats/previous-tests" ? (
              "Previous Results"
            ) : location.pathname === "/stats/graphs" ? (
              "Test Results Graph"
            ) : location.pathname === "/read" ? (
              "Read the Questions"
            ) : location.pathname === "/category-practice" ? (
              <h3>Practice by Category</h3>
            ) : null}
          </h3>
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.nav`
  width: 100%;
  position: fixed;
  top: 0;
  color: white;
  height: var(--nav-height);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 1px 0px 0px rgba(0, 0, 0, 0.1);
  .exit {
    font-size: 2.5rem;
    color: white;
  }

  .container {
    display: flex;
    align-content: center;
    justify-content: space-between;
    h3 {
      margin: auto 0;
      font-size: 1.5rem;
    }
  }

  .nav-center {
    display: flex;
    width: 90vw;
    align-items: center;
    justify-content: space-between;
  }

  background: var(--primary-500);
  .btn-container {
    position: relative;
  }

  .btn {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0 0.5rem;
    position: relative;
    box-shadow: var(--shadow-2);
  }
`;
export default Nav;
