  /* eslint-disable */
import axios from "axios";
import dotenv from "dotenv";

if (typeof process !== "undefined") {
  dotenv.config();
}

const BASE_WEATHER_API = process.env.REACT_APP_BASE_WEATHER_API;
const WEATHER_API_KEY = process.env.REACT_APP_WEATHER_API_KEY;

interface Coordinates {
  latitude: number;
  longitude: number;
}

// Função para fazer a chamada da API externa via proxy
const makeProxyRequest = async (url: string, params?: object) => {
  try {
    const response = await axios.get(url, {
      params,
      withCredentials: true,
      headers: {
        SameSite: "None",
        Secure: true,
      },
    });

    return response.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

// Obter a previsão atual através da API:
export const getCurrentWeather = async ({
  latitude,
  longitude,
}: Coordinates) => {
  try {
    const params = {
      lat: latitude,
      lon: longitude,
      appid: WEATHER_API_KEY ?? "",
      lang: "pt_br",
      units: "metric",
    };

    const url = `${BASE_WEATHER_API}/weather`;

    return await makeProxyRequest(url, params);
  } catch (error) {
    console.log(error);
    return null;
  }
};

// Obter previsão para os próximos dias:
export const getForecastByNextDays = async ({
  latitude,
  longitude,
}: Coordinates) => {
  try {
    const params = {
      lat: latitude,
      lon: longitude,
      appid: WEATHER_API_KEY ?? "",
      lang: "pt_br",
      units: "metric",
    };

    const url = `${BASE_WEATHER_API}/forecast`;

    return await makeProxyRequest(url, params);
  } catch (error) {
    console.log(error);
    return null;
  }
};
