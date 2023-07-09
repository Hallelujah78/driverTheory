import {
  LineChart as Chart,
  Line,
  ResponsiveContainer,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip">
        <p className="label">{`${label} : ${payload[0].value}`}</p>
      </div>
    );
  }

  return null;
};

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
        transform="rotate(-35)"
      >
        {payload.value}
      </text>
    </g>
  );
};

const LineChart = ({ data }) => {
  return (
    <ResponsiveContainer width="95%" height={350}>
      <Chart
        margin={{
          top: 50,
          right: 5,
        }}
        data={data}
      >
        <CartesianGrid strokeDasharray="4 4" />
        <XAxis height={"60"} dataKey="date" tick={<CustomizedAxisTick />} />
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
