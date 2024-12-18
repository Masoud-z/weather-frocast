import CityWeather from "@/components/CurrentWeather/CityWeather";

interface Props {
  params: { searchedText: string };
}

const SearchedPage = ({ params }: Props) => {
  return <CityWeather cityName={decodeURIComponent(params.searchedText)} />;
};

export default SearchedPage;
