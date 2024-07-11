import axios from "axios";
import { Countries } from "../store/types";

export const useServices = {
  fetchAllCountries: async (): Promise<Countries> => {
    try {
      const response = await axios.get<Countries>(
        "https://restcountries.com/v3.1/all"
      );

      return response.data;
    } catch (error) {
      console.log(error);
      return [];
    }
  },
  fetchCountry: async (name: string): Promise<Countries> => {
    try {
      const response = await axios.get<Countries>(
        `https://restcountries.com/v3.1/name/${name}`
      );
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.log(error);
      return [];
    }
  },
};
