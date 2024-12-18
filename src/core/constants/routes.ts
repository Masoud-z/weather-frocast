export const AppRouteKey = {
  home: "/",
  extendedForecast: (cityName: string) => `/extended-forecast/${cityName}`,
  search: (searchText: string) => `/search/${searchText}`,
  historicalWeather: (cityName: string) => `/historical-weather/${cityName}`,
};
