import styled from "styled-components";

const CategoryListItem = ({ category, total, incorrect, correct }) => {
  return (
    <Wrapper>
      <div>{category}</div>
      <div>
        {correct}/{total}
      </div>
    </Wrapper>
  );
};
export default CategoryListItem;

const Wrapper = styled.div`
  border: 1px solid red;
  width: 40vw;
`;
