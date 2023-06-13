import styled from "styled-components";

const ModalAlert = ({
  modalText,
  buttonText1,
  buttonText2,
  handleClickOne,
  handleClickTwo,
}) => {
  return (
    <Wrapper>
      <div className="overlay"></div>
      <article>
        <p>{modalText}</p>
        <div className="button-container">
          <button onClick={handleClickOne} className="btn">
            {buttonText1}
          </button>
          <button onClick={handleClickTwo} className="btn">
            {buttonText2}
          </button>
        </div>
      </article>
    </Wrapper>
  );
};
export default ModalAlert;

const Wrapper = styled.div`
  .overlay {
    display: grid;
    place-content: center;
    height: 100vh;
    width: 100%;
    position: fixed;
    z-index: 99;
    opacity: 0.8;
    top: 0;
    left: 0;
    background-color: #36454f;
  }

  article {
    display: grid;
    grid-template-rows: 1fr 1fr;
    place-content: center;

    position: fixed;
    z-index: 99;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 80vw;
    min-height: 20vw;
    border-radius: 0.5rem;
    background-color: #d9d9d9;
    &::before {
      position: fixed;
      top: 0;
      min-height: 0.5rem;
      content: "";
      min-width: 100%;
      background-color: var(--primary-500);
      border-top-right-radius: 0.5rem;
      border-top-left-radius: 0.5rem;
    }
    p {
      width: 80%;
      margin: 2rem auto 0rem auto;
      text-align: center;
      margin-top: 2rem;
      font-size: 1.25rem;
    }
    .button-container {
      width: 80%;
      display: flex;
      margin: 0 auto;
      align-items: center;
      button {
        margin: 0 auto;
      }
    }
  }
`;
