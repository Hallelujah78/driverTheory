import styled from "styled-components";

const CategoryListItem = ({ category, total, correct }) => {
  return (
    <Wrapper>
      <div className="category">{category}</div>
      <div className="progress-score">
        <div className="progress">
          <div
            className="score"
            style={{
              height: "100%",
              width: `${(correct / total) * 100}%`,
              backgroundColor: `${
                (correct / total) * 100 >= 87.5
                  ? "var(--green-dark)"
                  : "var(--red-dark)"
              }`,
            }}
          ></div>
        </div>
        <div className="correct-total">
          {correct} / {total}
        </div>
      </div>
    </Wrapper>
  );
};
export default CategoryListItem;

const Wrapper = styled.div`
  font-size: 1.1rem;
  width: 80vw;

  .correct-total {
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
