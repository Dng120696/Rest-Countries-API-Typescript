export type Country = {
  name: {
    common: string;
    nativeName: {
      [key: string]: {
        official: string;
        common: string;
      };
    };
  };
  population: number;
  region: string;
  capital: string;
  subregion: string;
  flags: {
    png: string;
  };
  tld: string[];
  currencies: {
    [key: string]: {
      name: string;
    };
  };
  languages: {
    [key: string]: string;
  };
  cca3: string;
  borders: string[];
};

export type Countries = Country[];

export type State = {
  countries: Countries;
  isDark: boolean;
  searchedCountry: Countries;
  selectedCountry: Country | null;
  searchQuery: string;
  selectedRegion: string;
};

export type Action = {
  setCountries: (data: Countries) => void;
  setIsDark: () => void;
  setSearchedCountry: (data: Countries) => void;
  setSelectedCountry: (data: Country) => void;
  setSearchQuery: (query: string) => void;
  setSelectedRegion: (region: string) => void;
};
