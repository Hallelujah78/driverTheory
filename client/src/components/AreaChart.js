import {
  AreaChart as Chart,
  Area,
  ResponsiveContainer,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

const AreaChart = ({ data }) => {
  const { count, date } = data;
  return (
    <ResponsiveContainer width="100%" height={300}>
      <Chart
        margin={{
          top: 50,
        }}
        data={data}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis allowDecimals={false} />
        <Tooltip />
        <Area dataKey="count" fill="#82ca9d" type="monotone" stroke="#2cb1bc" />
      </Chart>
    </ResponsiveContainer>
  );
};
export default AreaChart;
