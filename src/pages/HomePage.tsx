import { useEffect, useState } from "react";
import { useServices } from "../services/fetchCountries";
import { useStore } from "../store/store";
import CountriesList from "../components/CountriesList";

function HomePage() {
  const state = useStore();
  const {
    setCountries,
    setSearchedCountry,
    searchedCountry,
    countries,
    searchQuery,
    setSearchQuery,
    selectedRegion,
    setSelectedRegion,
  } = state;

  const [totalPage, setTotalPage] = useState<number>(0);

  useEffect(() => {
    async function getAllCountries() {
      if (searchQuery && selectedRegion !== "selected") {
        const data = await useServices.fetchRegion(selectedRegion);
        const newData = [...data].filter((country) =>
          country.name.common.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setSearchedCountry(newData);
        setTotalPage(Math.ceil(newData.length / 20));
      } else if (searchQuery) {
        const data = await useServices.fetchCountry(searchQuery);
        setSearchedCountry(data);
        setTotalPage(Math.ceil(data.length / 20));
      } else if (selectedRegion !== "selected") {
        const data = await useServices.fetchRegion(selectedRegion);
        setTotalPage(Math.ceil(data.length / 20));
        setSearchedCountry(data);
      } else {
        const data = await useServices.fetchAllCountries();
        setCountries(data);

        setTotalPage(Math.ceil(data.length / 20));
        localStorage.setItem("countries", JSON.stringify(data));
      }
    }
    getAllCountries();
  }, [setCountries, selectedRegion, searchQuery, setSearchedCountry]);

  const sortedCountries = [...countries].sort((a, b) =>
    a.name.common.localeCompare(b.name.common)
  );
  const sortedSearchedCountries = [...searchedCountry].sort((a, b) =>
    a.name.common.localeCompare(b.name.common)
  );

  return (
    <section className="py-16 w-[clamp(30rem,90%,120rem)] mx-auto">
      <div className="mb-12 flex items-center justify-between  text-2xl ">
        <input
          type="text"
          className="shadow-[0_0_1rem_rgba(0,0,0,0.15)] w-1/2 border px-6 py-2 rounded outline-gray-400"
          placeholder="Search for country..."
          value={searchQuery}
          name="search_input"
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <select
          value={selectedRegion}
          onChange={(e) => setSelectedRegion(e.target.value)}
          className="shadow-[0_0_1rem_rgba(0,0,0,0.15)] border px-6 py-2 rounded"
        >
          <option value="selected" className="text-gray-400">
            Select a country
          </option>
          <option value="Africa">Africa</option>
          <option value="America">America</option>
          <option value="Asia">Asia</option>
          <option value="Europe">Europe</option>
          <option value="Oceania">Oceania</option>
        </select>
      </div>
      <div className="flex items-center gap-10 flex-wrap justify-between mb-10">
        {searchQuery.length === 0 && selectedRegion === "selected" ? (
          <CountriesList countries={sortedCountries} />
        ) : (
          <CountriesList countries={sortedSearchedCountries} />
        )}
      </div>
      <div className="flex items-center justify-center text-center gap-6">
        {totalPage > 1 &&
          Array.from({ length: totalPage }).map((_, i) => (
            <span
              key={i}
              className="text-2xl px-4 font-bold py-2 shadow-[0_0_1rem_rgba(0,0,0,0.15)]"
            >
              {i + 1}
            </span>
          ))}
      </div>
    </section>
  );
}

export default HomePage;
