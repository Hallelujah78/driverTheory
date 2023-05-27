import {
  BarChart as Chart,
  Bar,
  ResponsiveContainer,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

const BarChart = ({ data }) => {
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
        <Bar dataKey="count" fill="#82ca9d" />
      </Chart>
    </ResponsiveContainer>
  );
};
export default BarChart;
