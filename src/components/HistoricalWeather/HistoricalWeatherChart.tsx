import { HistoryWeatherDto } from "@/core/dto/historicalWeather.dto";
import useStore from "@/core/store/useStore";
import getUnitSign from "@/core/utilities/unitsSign";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  TooltipProps,
} from "recharts";
import { NameType } from "recharts/types/component/DefaultTooltipContent";
import { ValueType } from "tailwindcss/types/config";

interface IProps {
  historyWeather: HistoryWeatherDto[];
}

const HistoricalWeatherChart = ({ historyWeather }: IProps) => {
  const unit = getUnitSign(useStore((state) => state.unit));

  const CustomTooltip = ({
    active,
    payload,
    label,
  }: TooltipProps<ValueType, NameType>) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-Background text-white p-4 rounded-lg shadow-lg font-bold text-lg">
          <p>{label}</p>
          <p className="text-[#8854D8] font-bold">
            Max: {payload[0].payload.Max} °{unit}
          </p>
          <p className="text-[#82CA9D] font-bold">
            Min: {payload[0].payload.Min} °{unit}
          </p>
        </div>
      );
    }

    return null;
  };

  const data = historyWeather.map((day) => ({
    name: day.datetime,
    Max: day.max_temp,
    Min: day.min_temp,
  }));
  return (
    <div className="w-5/6 h-[600px] bg-white p-6 rounded-lg shadow-lg mb-11">
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
          <Tooltip content={CustomTooltip} />
          <Legend />
          <Line
            type="monotone"
            dataKey="Max"
            stroke="#8884d8"
            activeDot={{ r: 8 }}
          />
          <Line type="monotone" dataKey="Min" stroke="#82ca9d" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default HistoricalWeatherChart;
