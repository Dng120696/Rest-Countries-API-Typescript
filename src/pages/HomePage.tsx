import { useEffect, useState } from "react";
import { useServices } from "../services/fetchCountries";
import { useStore } from "../store/store";
import CountriesList from "../components/CountriesList";
import Loading from "../components/Loading";
import Error from "../components/Error";

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

  const [startPage, setStartPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [status, setStatus] = useState<string>("loading");
  const itemsPerpage = 12;
  const startIndex = (startPage - 1) * itemsPerpage;

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
    <div
      className="
    dark:bg-gray-800 min-h-screen pt-24"
    >
      <section className="py-16 w-[clamp(30rem,90%,120rem)] mx-auto ">
        <div className="mb-12 flex items-center justify-between  text-2xl ">
          <div className="w-1/2 relative">
            <input
              type="text"
              className=" w-full shadow-[0_0_1rem_rgba(0,0,0,0.15)]  border px-6 indent-10 dark:text-gray-100
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

          <select
            value={selectedRegion}
            onChange={(e) => {
              setStatus("loading");
              setSelectedRegion(e.target.value);
            }}
            className=" w-[20rem] shadow-[0_0_1rem_rgba(0,0,0,0.15)]  border px-6  dark:text-gray-100
               py-4 rounded outline-gray-400 dark:outline-gray-700 dark:bg-gray-700 dark:border-gray-700"
          >
            <option value="selected" className="text-gray-200">
              Select a country
            </option>
            <option value="Africa">Africa</option>
            <option value="America">America</option>
            <option value="Asia">Asia</option>
            <option value="Europe">Europe</option>
            <option value="Oceania">Oceania</option>
          </select>
        </div>
        {status === "loading" && <Loading />}
        {status === "error" && <Error />}
        {status === "success" && (
          <>
            {" "}
            <div className="flex items-center gap-10 flex-wrap justify-between mb-12">
              {searchQuery.length === 0 && selectedRegion === "selected" ? (
                <CountriesList countries={sortedCountries} />
              ) : (
                <CountriesList countries={sortedSearchedCountries} />
              )}
            </div>
            {totalPages > 1 && (
              <div className="flex items-center text-center flex-wrap gap-6 text-2xl">
                <button
                  onClick={() => handlePageChange(startPage - 1)}
                  disabled={startPage === 1}
                  className={`rounded-lg py-2 px-4 font-bold ${
                    startPage === 1
                      ? "bg-gray-200 text-gray-400  dark:bg-gray-300 dark:text-gray-400  cursor-not-allowed "
                      : "bg-gray-200 dark:bg-gray-500 dark:text-gray-200"
                  }`}
                >
                  Previous
                </button>
                {Array.from({ length: totalPages }, (_, index) => (
                  <button
                    key={index}
                    onClick={() => handlePageChange(index + 1)}
                    className={` px-4 py-2   bg-gray-200 dark:bg-gray-500 dark:text-gray-200 rounded-lg font-medium ${
                      index + 1 === startPage
                        ? "font-bold text-gray-200 dark:text-gray-500 bg-gray-500 dark:bg-gray-200   "
                        : ""
                    }`}
                  >
                    {index + 1}
                  </button>
                ))}
                <button
                  onClick={() => handlePageChange(startPage + 1)}
                  disabled={startPage === totalPages}
                  className={`rounded-lg py-2 px-4 font-bold ${
                    startPage === totalPages
                      ? "bg-gray-200 text-gray-400  dark:bg-gray-300 dark:text-gray-400 cursor-not-allowed "
                      : "bg-gray-200 dark:bg-gray-500 dark:text-gray-200"
                  }`}
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </section>
    </div>
  );
}

export default HomePage;
