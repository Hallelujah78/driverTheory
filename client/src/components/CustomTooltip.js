import styled from "styled-components";
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <Wrapper className="custom-tooltip">
        <p className="label">
          {label}:{" "}
          <span className="value">
            {Math.round(payload[0].value * 10) / 10}%
          </span>
          {payload[1]}
        </p>
      </Wrapper>
    );
  }

  return null;
};

export default CustomTooltip;

const Wrapper = styled.div`
  background-color: #f9f9f9;
  border: 1px solid black;
  border-radius: var(--borderRadius);
  padding: 0.5rem;
  .value {
    color: var(--primary-500);
    font-weight: 700;
  }
`;
