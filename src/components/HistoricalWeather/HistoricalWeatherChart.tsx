import { HistoryWeatherDto } from "@/core/dto/historicalWeather.dto";
import useStore from "@/core/store/useStore";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface IProps {
  historyWeather: HistoryWeatherDto[];
}

const HistoricalWeatherChart = ({ historyWeather }: IProps) => {
  const unit = useStore((state) => state.unit);

  const data = historyWeather.map((day) => ({
    name: day.datetime,
    Max: `${day.max_temp} °${unit}`,
    Min: `${day.min_temp} °${unit}`,
  }));
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        width={500}
        height={300}
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey="Min"
          stroke="#8884d8"
          activeDot={{ r: 8 }}
        />
        <Line type="monotone" dataKey="Max" stroke="#82ca9d" />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default HistoricalWeatherChart;
