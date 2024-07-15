const localStorageCountriesData = localStorage.getItem("countries");

export const initialState = {
  countries: localStorageCountriesData
    ? JSON.parse(localStorageCountriesData)
    : [],
  isDark: false,
  searchedCountry: [],
  selectedCountry: null,
  searchQuery: "",
  selectedRegion: "selected",
};
