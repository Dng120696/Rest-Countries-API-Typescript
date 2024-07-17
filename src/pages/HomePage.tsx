import { useEffect, useState } from "react";
import { useServices } from "../services/fetchCountries";
import { useStore } from "../store/store";
import CountriesList from "../components/CountriesList";
import Loading from "../components/Loading";
import Error from "../components/Error";
import Pagination from "../components/Pagination";

function HomePage() {
  const [startPage, setStartPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [status, setStatus] = useState<string>("loading");
  const [isSelectRegion, setIsSelectRegion] = useState<boolean>(false);
  const itemsPerpage: number = 12;
  const startIndex: number = (startPage - 1) * itemsPerpage;
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

  const sortedCountries = [...countries]
    .sort((a, b) => a.name.common.localeCompare(b.name.common))
    .slice(startIndex, startPage * itemsPerpage);
  const sortedSearchedCountries = [...searchedCountry]
    .sort((a, b) => a.name.common.localeCompare(b.name.common))
    .slice(startIndex, startPage * itemsPerpage);

  const handlePageChange = (page: number) => {
    setStartPage(page);
  };

  useEffect(() => {
    async function getAllCountries() {
      try {
        if (searchQuery && selectedRegion !== "selected") {
          const data = await useServices.fetchRegion(selectedRegion);
          const newData = [...data].filter((country) =>
            country.name.common
              .toLowerCase()
              .includes(searchQuery.toLowerCase())
          );

          setTotalPages(Math.ceil(newData.length / itemsPerpage));
          setSearchedCountry(newData);
        } else if (searchQuery) {
          const data = await useServices.fetchCountry(searchQuery);
          setTotalPages(Math.ceil(data.length / itemsPerpage));
          setSearchedCountry(data);
        } else if (selectedRegion !== "selected") {
          const data = await useServices.fetchRegion(selectedRegion);

          setTotalPages(Math.ceil(data.length / itemsPerpage));
          setSearchedCountry(data);
        } else {
          const data = await useServices.fetchAllCountries();
          setTotalPages(Math.ceil(data.length / itemsPerpage));
          setCountries(data);
          localStorage.setItem("countries", JSON.stringify(data));
        }
        setStatus("success");
      } catch (error) {
        setStatus("error");
        console.log(error);
      }
    }
    getAllCountries();
  }, [
    setCountries,
    selectedRegion,
    searchQuery,
    setSearchedCountry,
    setTotalPages,
    setStatus,
  ]);

  return (
    <div className="dark:bg-gray-800 min-h-screen pt-24">
      <section className="py-10 md:py-12 lg:py-16 w-[clamp(30rem,90%,120rem)] mx-auto ">
        <div className="mb-12 flex md:items-center gap-8 flex-col md:flex-row justify-between  text-2xl ">
          <div className="w-full relative">
            <input
              type="text"
              className=" w-full md:w-3/4 lg:w-1/2 shadow-[0_0_1rem_rgba(0,0,0,0.15)]  border px-6 indent-10 dark:text-gray-100
               py-4 rounded outline-gray-400 dark:outline-gray-700 dark:bg-gray-700 dark:border-gray-700"
              placeholder="Search for country..."
              value={searchQuery}
              name="search_input"
              onChange={(e) => {
                setStatus("loading");
                setSearchQuery(e.target.value);
              }}
            />
            <i className="fa-solid text-gray-300 fa-magnifying-glass absolute top-1/2 left-10  translate-x-[-50%] translate-y-[-50%] "></i>
          </div>
          <div className="relative cursor-pointer">
            <select
              value={selectedRegion}
              onChange={(e) => {
                setStatus("loading");
                setSelectedRegion(e.target.value);
              }}
              onClick={() => setIsSelectRegion((selected) => !selected)}
              className="w-full md:w-[20rem] shadow-lg appearance-none px-6 py-4 rounded outline-none dark:text-gray-100 dark:bg-gray-700  "
            >
              <option value="selected" disabled>
                Filter by Region
              </option>
              <option value="Africa">Africa</option>
              <option value="America">America</option>
              <option value="Asia">Asia</option>
              <option value="Europe">Europe</option>
              <option value="Oceania">Oceania</option>
            </select>
            {isSelectRegion}
            <i
              className={`fa-solid dark:text-gray-100 absolute top-1/2
                 right-6 translate-x-[-50%] translate-y-[-50%] ${
                   isSelectRegion ? "fa-angle-up" : "fa-angle-down"
                 }`}
            ></i>
          </div>
        </div>
        {status === "loading" && <Loading />}
        {status === "error" && <Error />}
        {status === "success" && (
          <>
            {" "}
            <div className="flex items-center gap-14 sm:gap-16 md:gap-20 flex-wrap justify-center lg:justify-between mb-12">
              {searchQuery.length === 0 && selectedRegion === "selected" ? (
                <CountriesList countries={sortedCountries} />
              ) : (
                <CountriesList countries={sortedSearchedCountries} />
              )}
            </div>
            <Pagination
              totalPages={totalPages}
              startPage={startPage}
              onPageChange={handlePageChange}
            />
          </>
        )}
      </section>
    </div>
  );
}

export default HomePage;
