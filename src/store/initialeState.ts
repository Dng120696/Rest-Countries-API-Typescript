const localStorageCountriesData = localStorage.getItem("countries");
const localStorageIsDark = localStorage.getItem("isDark");

export const initialState = {
  countries: localStorageCountriesData
    ? JSON.parse(localStorageCountriesData)
    : [],
  isDark: localStorageIsDark ? JSON.parse(localStorageIsDark) : false,
  searchedCountry: [],
  selectedCountry: null,
  searchQuery: "",
  selectedRegion: "selected",
};
