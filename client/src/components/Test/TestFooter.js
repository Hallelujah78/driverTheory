import styled from "styled-components";
import { useAppContext } from "../../context/appContext";
import { TbArrowBigLeftLine, TbArrowBigRightLine } from "react-icons/tb";
const TestFooter = () => {
  const { currentQuestion, incrementQuestion, decrementQuestion, test } =
    useAppContext();
  const { userAnswer } = test[currentQuestion];

  const handleClick = (e) => {
    if (e.currentTarget.classList.contains("prev") && currentQuestion !== 0) {
      decrementQuestion();
    }
    if (
      e.currentTarget.classList.contains("next") &&
      currentQuestion < test.length - 1 &&
      userAnswer !== null
    ) {
      incrementQuestion();
    }
  };

  return (
    <Wrapper>
      <div className="footer-center">
        <div className="button-container">
          <div
            onClick={currentQuestion < 1 ? null : (e) => handleClick(e)}
            className={currentQuestion < 1 ? "gray prev" : "prev"}
          >
            <TbArrowBigLeftLine className="nav-btn" />
            <p>prev</p>
          </div>

          <div
            onClick={
              currentQuestion === test?.length - 1
                ? null
                : (e) => handleClick(e)
            }
            className={
              currentQuestion === test?.length - 1 || userAnswer === null
                ? "gray next"
                : "next"
            }
          >
            <p>next</p>
            <TbArrowBigRightLine className="nav-btn" />
          </div>
        </div>
      </div>
    </Wrapper>
  );
};
export default TestFooter;

const Wrapper = styled.footer`
  display: flex;
  height: var(--nav-height);
  width: 100%;
  background-color: var(--primary-500);
  position: fixed;
  color: white;
  bottom: 0;
  .footer-center {
    width: var(--fluid-width);
    margin: 0 auto;
    .button-container {
      height: 100%;
      display: flex;
      justify-content: space-between;
      .prev,
      .next {
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: space-around;
        .nav-btn {
          font-size: 3rem;
          align-self: center;
        }
      }
    }
  }
  .gray {
    opacity: 0.5;
  }
`;
