export type Country = {
  name: {
    common: string;
  };
  population: number;
  region: string;
  capital: string;
  subregion: string;
  flags: {
    png: string;
  };
};

export type Countries = Country[];

export type State = {
  countries: Countries;
  isDark: boolean;
  searchedCountry: Countries;
  selectedCountry: Country | null;
};

export type Action = {
  setCountries: (data: Countries) => void;
  setSearchedCountry: (data: Countries) => void;
  setSelectedCountry: (data: Country) => void;
};
