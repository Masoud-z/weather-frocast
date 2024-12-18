import ExtendedForecast from "@/components/ExtendedForecast/ExtendedForecast";

interface IProps {
  params: { cityName: string };
}

const ExtendedForecastPage = ({ params }: IProps) => {
  return <ExtendedForecast cityName={decodeURIComponent(params.cityName)} />;
};

export default ExtendedForecastPage;
