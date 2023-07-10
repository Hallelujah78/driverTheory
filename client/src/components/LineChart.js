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

const LineChart = ({ data }) => {
  return (
    <ResponsiveContainer
      width={data.length <= 8 ? "100%" : `${(data.length / 8) * 12.5}%`}
      height="95%"
    >
      <Chart
        margin={{
          top: 0,
          right: 0,
        }}
        data={data}
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
