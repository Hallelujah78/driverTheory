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

const LineChart = ({ data }) => {
  const { count, date } = data;
  return (
    <ResponsiveContainer width="98%" height={350}>
      <Chart
        margin={{
          top: 50,
        }}
        data={data}
      >
        <CartesianGrid strokeDasharray="4 4" />
        <XAxis dataKey="date" />
        <YAxis allowDecimals={true} domain={[0, 100]} />
        <Tooltip content={<CustomTooltip />} />
        <Line
          dataKey="count"
          dot={{ stroke: "red", strokeWidth: 2, r: 6, strokeDasharray: "" }}
        />
      </Chart>
    </ResponsiveContainer>
  );
};
export default LineChart;
