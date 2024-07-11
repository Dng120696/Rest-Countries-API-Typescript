import { useEffect } from "react";
import { useServices } from "../services/fetchCountries";
import { useStore } from "../store/store";

function HomePage() {
  const state = useStore();

  const { setCountries, searchCountry, searchedCountry, countries } = state;
  useEffect(() => {
    async function getAllCountries() {
      const data = await useServices.fetchAllCountries();
      setCountries(data);
    }
    getAllCountries();
  }, [setCountries]);

  // useEffect(() => {
  //   async function searchByCountry() {
  //     const data = await useServices.fetchCountry("Japan");
  //     searchCountry(data);
  //   }
  //   searchByCountry();
  // }, [searchCountry]);
  return (
    <div>
      {countries.map((data, i) => {
        return (
          <div key={i}>
            <img src={data.flags.png} />
            <h2>{data.name.common}</h2>
            <p>Population: {data.population}</p>
            <p>Region: {data.region}</p>
            <p>Capital: {data.capital}</p>
          </div>
        );
      })}
    </div>
  );
}

export default HomePage;
