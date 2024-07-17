import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useServices } from "../services/fetchCountries";
import { useStore } from "../store/store";
import { Link } from "react-router-dom";
import Loading from "../components/Loading";
import Error from "../components/Error";

type Params = {
  country_name: string;
};

function CountryPage() {
  const state = useStore();
  const navigate = useNavigate();
  const [status, setStatus] = useState<string>("loading");

  const { setSelectedCountry, selectedCountry, countries } = state;

  const { country_name } = useParams<Params>();
  const bordersCountry = countries.filter((country) =>
    selectedCountry?.borders?.includes(country.cca3)
  );
  const nativeName =
    selectedCountry?.name && Object.entries(selectedCountry?.name.nativeName);

  useEffect(() => {
    async function fetchCountry() {
      try {
        if (country_name) {
          const data = await useServices.fetchfullNameCountry(country_name);
          setSelectedCountry(data[0]);
        }
        setStatus("success");
      } catch (error) {
        setStatus("error");
        console.log(error);
      }
    }
    fetchCountry();
  }, [country_name, setSelectedCountry]);

  return (
    <div className="dark:bg-gray-800 dark:text-gray-50 flex items-center  min-h-screen ">
      <section className=" text-xl w-[clamp(30rem,90%,120rem)] mx-auto  flex flex-col  pt-36 pb-16 md:pt-48 gap-28 items-center  min-h-screen overflow-hidden   ">
        {status === "loading" && <Loading />}
        {status === "error" && <Error />}
        {status === "success" && (
          <>
            <button
              onClick={() => navigate(-1)}
              className=" shadow-[0_0_1rem_rgba(0,0,0,0.15)] dark:shadow-[0_0_1rem_rgba(0,0,0,0.65)]  dark:bg-gray-700  py-3 flex items-center gap-4 justify-center
               w-[8rem]  self-start"
            >
              <i className="fa-solid fa-arrow-left-long"></i>

              <span className="text-xl">Back</span>
            </button>
            <div className="grid  lg:grid-cols-2 gap-16 lg:gap-20 items-center justify-center w-full ">
              <div className="w-full">
                <img
                  src={selectedCountry?.flags.png}
                  alt=""
                  className="w-full h-full shadow-[0_0_1rem_rgba(0,0,0,0.15)] rounded-md object-cover"
                />
              </div>
              <div className="self-start  lg:self-center">
                <div>
                  <h1 className="font-bold text-4xl mb-10">
                    {selectedCountry?.name?.common}
                  </h1>
                  <div className="flex flex-col md:flex-row items-start gap-10 md:gap-20 justify-between pb-20 lg:pb-32">
                    <div>
                      <p className="mb-4">
                        <span className="font-bold pr-2">Native Name:</span>
                        <span className="text-gray-600 dark:text-gray-300">
                          {nativeName &&
                            nativeName[nativeName.length - 1][1]?.common}
                        </span>
                      </p>
                      <p className="mb-4">
                        <span className="font-bold pr-2">Population:</span>
                        <span className="text-gray-600 dark:text-gray-300">
                          {selectedCountry?.population.toLocaleString()}{" "}
                        </span>
                      </p>
                      <p className="mb-4">
                        <span className="font-bold pr-2">Region:</span>
                        <span className="text-gray-600 dark:text-gray-300">
                          {selectedCountry?.region}{" "}
                        </span>
                      </p>
                      <p className="mb-4">
                        <span className="font-bold pr-2">Sub Region:</span>
                        <span className="text-gray-600 dark:text-gray-300">
                          {selectedCountry?.subregion}{" "}
                        </span>
                      </p>
                      <p className="mb-4">
                        <span className="font-bold pr-2">Capital:</span>
                        <span className="text-gray-600 dark:text-gray-300">
                          {selectedCountry?.capital}{" "}
                        </span>
                      </p>
                    </div>
                    <div>
                      <p className="mb-4">
                        <span className="font-bold pr-2">
                          Top Level Domain:
                        </span>
                        <span className="text-gray-600 dark:text-gray-300">
                          {" "}
                          {selectedCountry?.tld}
                        </span>
                      </p>
                      <p className="mb-4">
                        <span className="font-bold pr-2">Currencies:</span>
                        {selectedCountry?.currencies &&
                          Object.entries(selectedCountry?.currencies).map(
                            ([currencyCode, currency]) => (
                              <span
                                key={currencyCode}
                                className="text-gray-600 dark:text-gray-300"
                              >
                                {currency.name}
                              </span>
                            )
                          )}
                      </p>
                      <p className="mb-4">
                        <span className="font-bold pr-2">Languages:</span>
                        <span className="text-gray-600 dark:text-gray-300">
                          {selectedCountry?.languages
                            ? Object.values(selectedCountry.languages).join(
                                ", "
                              )
                            : ""}
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
                <div className="">
                  <span className="font-bold pr-2">Border Countries: </span>
                  <span className="inline-flex  items-center gap-4  flex-wrap mt-4">
                    {bordersCountry.length > 0 ? (
                      bordersCountry.map((country, i) => (
                        <Link
                          to={`/country/${country.name.common}`}
                          key={i}
                          className="shadow-[0_0_1rem_rgba(0,0,0,0.15)] dark:shadow-[0_0_1rem_rgba(0,0,0,0.5)]  dark:bg-gray-700 py-3 px-6 rounded "
                          onClick={() => setStatus("loading")}
                        >
                          {country.name.common}
                        </Link>
                      ))
                    ) : (
                      <span>No Border Countries</span>
                    )}
                  </span>
                </div>
              </div>
            </div>
          </>
        )}
      </section>
    </div>
  );
}

export default CountryPage;
