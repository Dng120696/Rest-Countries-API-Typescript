export type Country = {
  name: {
    common: string;
  };
  population: number;
  region: string;
  capital: string;
  flags: {
    png: string;
  };
};

export type Countries = Country[];

export type State = {
  countries: Countries;
  isDark: boolean;
  searchedCountry: Countries | null;
};

export type Action = {
  setCountries: (data: Countries) => void;
  searchCountry: (data: Countries) => void;
};
