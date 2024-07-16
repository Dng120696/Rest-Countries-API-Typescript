import { Link } from "react-router-dom";
import { Countries } from "../store/types";

function CountriesList({ countries }: { countries: Countries }) {
  return (
    <>
      {countries.length > 0 ? (
        countries.map((data, i) => {
          return (
            <Link to={`/country/${data.name.common}`} key={i}>
              <div className="grid grid-rows-2 h-[30rem] w-[26rem] shadow-[0_0_1rem_rgba(0,0,0,0.15)] rounded overflow-hidden dark:bg-gray-700 dark:text-gray-100">
                <div>
                  <img
                    src={data.flags.png}
                    className="h-full w-full object-cover
                    "
                  />
                </div>
                <div className="py-10 px-6 text-xl ">
                  <h2 className="font-bold text-2xl mb-4">
                    {data.name.common}
                  </h2>
                  <p className="mb-2">
                    <strong>Population: </strong>
                    <span className="text-gray-600 dark:text-gray-300 font-medium">
                      {data.population.toLocaleString()}
                    </span>
                  </p>
                  <p className="mb-2">
                    <strong>Region: </strong>
                    <span className="text-gray-600 dark:text-gray-300 font-medium">
                      {data.region}
                    </span>
                  </p>
                  <p className="mb-2">
                    <strong>Capital: </strong>
                    <span className="text-gray-600 dark:text-gray-300 font-medium">
                      {data.capital || "No Capital"}
                    </span>
                  </p>
                </div>
              </div>
            </Link>
          );
        })
      ) : (
        <p className="text-4xl font-bold text-center h-[60vh] flex items-center justify-center w-full text-gray-400">
          Country Not Found . . .
        </p>
      )}
    </>
  );
}

export default CountriesList;
