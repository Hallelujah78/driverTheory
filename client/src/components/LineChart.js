import { useState, useEffect } from "react";
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
  const [dataVersion, setDataVersion] = useState(0);
  useEffect(() => {
    setDataVersion((value) => value + 1);
  }, [chartData]);
  return (
    <ResponsiveContainer
      width={chartData?.length <= 8 ? "100%" : `${chartData?.length * 12.5}%`}
      height="85%"
    >
      <Chart
        margin={{
          top: 50,
          right: 100,
        }}
        data={chartData}
      >
        <CartesianGrid strokeDasharray="4 4" />
        <XAxis height={"65"} dataKey="date" tick={<CustomizedAxisTick />} />
        <YAxis allowDecimals={true} domain={[0, 100]} />
        <Tooltip
          active={false}
          isAnimationActive={false}
          content={<CustomTooltip />}
        />
        <Line
          key={`data-${dataVersion}-line`}
          dataKey="score"
          dot={{
            stroke: "green",
            strokeWidth: 4,
            r: 8,
          }}
        />
      </Chart>
    </ResponsiveContainer>
  );
};
export default LineChart;
