import styled from "styled-components";

const OverviewListItem = ({ title, total, numerator }) => {
  return (
    <Wrapper>
      <div className="title">{title}</div>
      <div className="progress-score">
        <div className="progress">
          <div
            className="score"
            style={{
              height: "100%",
              width: `${(numerator / total) * 100}%`,
              backgroundColor: `${
                (numerator / total) * 100 >= 87.5
                  ? "var(--green-dark)"
                  : "var(--red-dark)"
              }`,
            }}
          ></div>
        </div>
        <div className="numerator-total">
          {numerator} / {total}
        </div>
      </div>
    </Wrapper>
  );
};
export default OverviewListItem;

const Wrapper = styled.div`
  font-size: 1.1rem;
  width: 80vw;

  .numerator-total {
    text-align: right;
  }
  .progress-score {
    display: grid;
    grid-template-columns: 7fr 2fr;
  }
  .progress {
    margin: auto 0;
    height: 1.3rem;
    background-color: lightgray;
    width: 100%;
  }
`;
