import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useServices } from "../services/fetchCountries";
import { useStore } from "../store/store";
import { Link } from "react-router-dom";

type Params = {
  country_name: string;
};

function CountryPage() {
  const state = useStore();
  const navigate = useNavigate();

  const { setSelectedCountry, selectedCountry, countries } = state;

  const { country_name } = useParams<Params>();
  const bordersCountry = countries.filter((country) =>
    selectedCountry?.borders?.includes(country.cca3)
  );

  useEffect(() => {
    async function fetchCountry() {
      if (country_name) {
        const data = await useServices.fetchfullNameCountry(country_name);
        setSelectedCountry(data[0]);
      }
    }
    fetchCountry();
  }, [country_name, setSelectedCountry]);

  return (
    <section className=" text-xl w-[clamp(30rem,90%,120rem)] mx-auto pt-20 ">
      <button
        onClick={() => navigate(-1)}
        className="text-2xl shadow-[0_0_1rem_rgba(0,0,0,0.15)] px-6 py-2 mb-20"
      >
        <i className="fa-solid fa-arrow-left-long"></i>Back
      </button>
      <div className="grid grid-cols-2 gap-10 items-center">
        <div className="w-full">
          <img
            src={selectedCountry?.flags.png}
            alt=""
            className="w-full
           h-full shadow-[0_0_1rem_rgba(0,0,0,0.15)] rounded-md"
          />
        </div>

        <div>
          <div>
            <h1 className="font-bold text-3xl mb-6">
              {selectedCountry?.name?.common}
            </h1>
            <div>
              <p>
                <span className="font-bold pr-2">Native Name:</span>
                <span></span>
              </p>
              <p>
                <span className="font-bold pr-2">Population:</span>
                <span>{selectedCountry?.population.toLocaleString()} </span>
              </p>
              <p>
                <span className="font-bold pr-2">Region:</span>
                <span>{selectedCountry?.region} </span>
              </p>
              <p>
                <span className="font-bold pr-2">Sub Region:</span>
                <span>{selectedCountry?.subregion} </span>
              </p>
              <p>
                <span className="font-bold pr-2">Capital:</span>
                <span>{selectedCountry?.capital} </span>
              </p>
            </div>
            <div>
              <p>
                <span className="font-bold pr-2">Top Level Domain:</span>
                <span> {selectedCountry?.tld}</span>
              </p>
              <p>
                <span className="font-bold pr-2">Currencies:</span>
                {selectedCountry?.currencies &&
                  Object.entries(selectedCountry?.currencies).map(
                    ([currencyCode, currency]) => (
                      <span key={currencyCode}>{currency.name}</span>
                    )
                  )}
              </p>
              <p>
                <span className="font-bold pr-2">Languages:</span>
                {selectedCountry?.languages
                  ? Object.values(selectedCountry.languages).join(", ")
                  : ""}
              </p>
            </div>
          </div>
          <div>
            <span className="font-bold pr-2 mb-2">Border Countries: </span>
            <span className="inline-flex  items-center gap-4  flex-wrap">
              {bordersCountry.length > 0 ? (
                bordersCountry.map((country, i) => (
                  <Link
                    to={`/country/${country.name.common}`}
                    key={i}
                    className="shadow-[0_0_1rem_rgba(0,0,0,0.15)] py-2 px-6 "
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
    </section>
  );
}

export default CountryPage;
