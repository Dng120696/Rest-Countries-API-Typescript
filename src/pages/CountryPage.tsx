import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useServices } from "../services/fetchCountries";
import { useStore } from "../store/store";

type Params = {
  country_name: string;
};

function CountryPage() {
  const state = useStore();
  const navigate = useNavigate();

  const { setSelectedCountry, selectedCountry } = state;

  const { country_name } = useParams<Params>();

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
    <section className=" w-[clamp(30rem,90%,120rem)] mx-auto">
      <button onClick={() => navigate(-1)}>Back</button>
      <div>
        <div>
          <img src={selectedCountry?.flags.png} alt="" />
        </div>
        <div>
          <h1>{selectedCountry?.name?.common}</h1>
          <div>
            <p>
              <span>Native Name:</span>
              <span></span>
            </p>
            <p>
              <span>Population:</span>
              <span>{selectedCountry?.population} </span>
            </p>
            <p>
              <span>Region:</span>
              <span>{selectedCountry?.region} </span>
            </p>
            <p>
              <span>Sub Region:</span>
              <span>{selectedCountry?.subregion} </span>
            </p>
            <p>
              <span>Capital:</span>
              <span>{selectedCountry?.capital} </span>
            </p>
          </div>
          <div>
            <p>
              <span>Top Level Domain:</span>
              <span></span>
            </p>
            <p>
              <span>Currencies:</span>
              <span></span>
            </p>
            <p>
              <span>Languages:</span>
              <span></span>
            </p>
          </div>
        </div>
        <div>
          <span>Border Countries: </span>
          <span></span>
        </div>
      </div>
    </section>
  );
}

export default CountryPage;
