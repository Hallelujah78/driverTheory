import styled from "styled-components";
import {
  LineChart as Chart,
  Line,
  ResponsiveContainer,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import CustomTooltip from "./CustomTooltip";

const CustomizedAxisTick = (props) => {
  const { x, y, payload } = props;

  return (
    <g transform={`translate(${x},${y})`}>
      <text
        x={0}
        y={0}
        dy={16}
        textAnchor="end"
        fill="#666"
        transform="rotate(-30)"
      >
        {payload.value}
      </text>
    </g>
  );
};

const LineChart = ({ chartData }) => {
  return (
    <ResponsiveContainer
      width={chartData?.length <= 8 ? "100%" : `${chartData?.length * 12.5}%`}
      height="90%"
    >
      <Chart
        margin={{
          top: 20,
          right: 100,
        }}
        data={chartData}
      >
        <CartesianGrid strokeDasharray="4 4" />
        <XAxis height={"65"} dataKey="date" tick={<CustomizedAxisTick />} />
        <YAxis allowDecimals={true} domain={[0, 100]} />
        <Tooltip content={<CustomTooltip />} />
        <Line
          dataKey="score"
          dot={{
            stroke: "red",
            strokeWidth: 4,
            r: 6,
            strokeDasharray: "",
          }}
        />
      </Chart>
    </ResponsiveContainer>
  );
};
export default LineChart;

const Wrapper = styled.div``;
