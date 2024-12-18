export const AppRouteKey = {
  home: "/",
  extendedForecast: (cityName: string) => `/extended-forecast/${cityName}`,
  search: (searchText: string) => `/search/${searchText}`,
};
