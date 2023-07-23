import styled from "styled-components";
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <Wrapper className="custom-tooltip">
        <p className="label">
          {label}:{"  "}
          <span className="value">
            {Math.round(payload[0].value * 10) / 10}%
          </span>
        </p>
        <p>Type: {payload[0].payload.category.toUpperCase()}</p>
        <p>
          Score: {payload[0].payload.correct}/{payload[0].payload.total}
        </p>
        {payload[0].payload.score >= 87.5 ? (
          <p className="pass">PASS</p>
        ) : (
          <p className="fail">FAIL</p>
        )}
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
  p {
    margin: 0 auto;
  }
  .pass {
    color: green;
  }
  .fail {
    color: red;
  }
`;
