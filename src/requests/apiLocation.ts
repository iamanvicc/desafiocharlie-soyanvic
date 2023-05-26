  /* eslint-disable */
import axios, { AxiosResponse } from "axios";
import dotenv from "dotenv";

if (typeof process !== "undefined") {
  dotenv.config();
}

interface LocationData {
  results: {
    components: {
      city?: string;
      country?: string;
      state?: string;
      postcode?: string;
    };
    geometry: {
      lat: number;
      lng: number;
    };
    formatted: string;
  }[];
  status?: string;
  error?: string;
}

const LOCATION_API_URL = process.env.REACT_APP_URL_LOCATION_AND_LOCALNAME_API;
const API_KEY_LOCATION = process.env.REACT_APP_KEY_OPENCAGE_API;

export const getLocationByCoordinates = async (
  latitude: number,
  longitude: number
): Promise<LocationData> => {
  try {
    const params = new URLSearchParams();
    params.append("q", `${latitude}+${longitude}`);
    params.append("key", API_KEY_LOCATION ?? ""); // Adiciona um valor padrão vazio caso API_KEY_LOCATION seja undefined

    const response: AxiosResponse<LocationData> = await axios.get(
      `${LOCATION_API_URL}/geocode/v1/json?${params.toString()}`,
      {
        withCredentials: true,
      }
    );

    return response.data;
  } catch (err) {
    console.log(err);
    throw new Error(
      "Failed to fetch location data in getLocationByCoordinates."
    );
  }
};

export const getLocationByCityName = async (
  city: string
): Promise<LocationData> => {
  try {
    const params = new URLSearchParams();
    params.append("q", city);
    params.append("key", API_KEY_LOCATION ?? ""); // Adiciona um valor padrão vazio caso API_KEY_LOCATION seja undefined

    const response: AxiosResponse<LocationData> = await axios.get(
      `${LOCATION_API_URL}/geocode/v1/json?${params.toString()}`,
      {
        withCredentials: true,
      }
    );

    return response.data;
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch location data in getLocationByCityName.");
  }
};
