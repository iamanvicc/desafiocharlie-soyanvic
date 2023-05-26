  /* eslint-disable */
import React, { useState, useEffect, useCallback } from "react";

import ReactLoading from "react-loading";

import {
  getCurrentWeather,
  getForecastByNextDays,
} from "../../requests/apiPrevision";

import {
  getLocationByCoordinates,
  getLocationByCityName,
} from "../../requests/apiLocation";

import { getBingBackground } from "../../requests/apiBingBackground";

import {
  getCelsiusToFahrenheit,
  firstLetterUppercase,
} from "../../helpers/functions";

import { Start } from "../../model/startPrevision";

import Input from "../Input";

import Display from "../Display";

import { TempColors } from "../../helpers/colors";

import { Container, Wrapper } from "./styled";

import {
  CurrentWeatherProps,
  ForecastNextDaysProps,
  LocationNameProps,
} from "./types";

function Prevision() {
  const [isLoading, setIsLoading] = useState(true);
  const [isCelsius, setIsCelsius] = useState(true);
  const [cityName, setCityName] = useState<string | null>(null);
  const [currentWeather, setCurrentWeather] = useState<CurrentWeatherProps>(
    Start.CurrentWeather
  );
  const [forecastNextDays, setForecastNextDays] =
    useState<ForecastNextDaysProps>(Start.ForecastNextDays);
  const [locationName, setLocationName] = useState<LocationNameProps>(
    Start.Location
  );
  const [bingBackground, setBingBackground] = useState(Start.Bing);
  const [, setErrorMessage] = useState<string | undefined>();

  useEffect(() => {
    if (!locationName.results || locationName.results.length === 0) return;

    const { geometry, components } = locationName.results[0];

    if (components) {
      const { city, state, country } = components;
      const newLocationName: LocationNameProps = {
        results: [
          {
            components: {
              city,
              state,
              country,
            },
            geometry,
          },
        ],
      };
      setLocationName(newLocationName);
    }

    if (
      geometry &&
      typeof geometry.lat === "number" &&
      typeof geometry.lng === "number"
    ) {
      const { lat, lng } = geometry;

      callCurrentWeather(lat, lng);
      callPrevisionNextDays(lat, lng);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [locationName]);

  useEffect(() => {
    const getUserLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const { latitude, longitude } = position.coords;
            await callLocationByCoordinates(latitude, longitude);
            await callCurrentWeather(latitude, longitude);
            await callPrevisionNextDays(latitude, longitude);
          },
          (error) => {
            console.log(error);
            setErrorMessage(undefined);
          }
        );
      } else {
        setErrorMessage(undefined);
      }
    };

    const getBackground = async () => {
      await callBingBackground();
      setIsLoading(false);
    };

    getUserLocation();
    getBackground();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Pega a Previsao Atual do dia
  const callCurrentWeather = useCallback(
    async (latitude: number, longitude: number) => {
      try {
        const response = await getCurrentWeather({ latitude, longitude });
        setCurrentWeather(response.data);
      } catch (error) {
        console.error("Failed to fetch actual prevision", error);
      }
    },
    []
  );

  // Pega a Previsão dos Próximos dias
  const callPrevisionNextDays = useCallback(
    async (latitude: number, longitude: number) => {
      try {
        const response = await getForecastByNextDays({ latitude, longitude });
        setForecastNextDays(response);
      } catch (error) {
        console.error("Failed to fetch next days prevision", error);
      }
    },
    []
  );

  // Pego a Localização da Cidade por Coordenadas
  const callLocationByCoordinates = useCallback(
    async (lat: number, lng: number) => {
      try {
        const response = await getLocationByCoordinates(lat, lng);
        const {
          city = "",
          state = "",
          country = "",
        } = response.results[0].components;
        const locationData: LocationNameProps = {
          results: [
            {
              components: { city, state, country },
              geometry: response.results[0].geometry,
            },
          ],
        };
        setLocationName(locationData);
      } catch (error) {
        console.error(`Error calling 'getLocationByCoordinates': ${error}`);
      }
    },
    [setLocationName]
  );

  // Pega o nome da Cidade
  const fetchLocationByCityName = async () => {
    try {
      if (cityName) {
        const response = await getLocationByCityName(cityName);
        setCityName(
          (prevCityName) => response.results[0].components.city || prevCityName
        );
      } else {
        setCityName(null);
      }
    } catch (error) {
      console.error(`Error calling 'getLocationByCityName': ${error}`);
    }
  };

  // Pega o Background do Bing
  const callBingBackground = useCallback(async () => {
    const backgroundImage = await getBingBackground();
    setBingBackground(`https://bing.com/${backgroundImage[0]}`);
  }, []);

  return (
    <Container BackgroundUrl={bingBackground}>
      {isLoading ? (
        <ReactLoading type="spin" color="#000" height={50} width={50} />
      ) : (
        <Wrapper>
          <Input
            value={cityName ?? ""}
            onChange={(event) => setCityName(event.target.value)}
            onBlur={fetchLocationByCityName}
          />
          <Display
            icon={`http://openweathermap.org/img/wn/${
              currentWeather?.weather[0]?.icon ?? ""
            }@2x.png`}
            title="HOJE"
            temperature={`${
              isCelsius
                ? currentWeather?.main?.temp
                : getCelsiusToFahrenheit(currentWeather?.main?.temp)
            }°${isCelsius ? "C" : "F"}`}
            description={firstLetterUppercase(
              currentWeather?.weather[0]?.description ?? ""
            )}
            converterTemp={() => setIsCelsius(!isCelsius)}
            infoAdd={{
              vento: `NO ${currentWeather?.wind?.speed ?? ""}Km/h`,
              umidade: `${currentWeather?.main?.humidity ?? ""}%`,
              pressao: `${currentWeather?.main?.pressure ?? ""}hPA`,
            }}
            background={TempColors(currentWeather?.main?.temp)}
            heigth="40vh"
            opacity="0.8"
          />
          <Display
            title="AMANHÃ"
            temperature={`${
              isCelsius
                ? forecastNextDays?.list[4]?.main?.temp
                : getCelsiusToFahrenheit(forecastNextDays?.list[4]?.main?.temp)
            }°${isCelsius ? "C" : "F"}`}
            converterTemp={() => setIsCelsius(!isCelsius)}
            background={TempColors(forecastNextDays?.list[4]?.main?.temp)}
            opacity="0.9"
            heigth="20vh"
          />
          <Display
            title="DEPOIS DE AMANHÃ"
            temperature={`${
              isCelsius
                ? forecastNextDays?.list[12]?.main?.temp
                : getCelsiusToFahrenheit(forecastNextDays?.list[12]?.main?.temp)
            }°${isCelsius ? "C" : "F"}`}
            converterTemp={() => setIsCelsius(!isCelsius)}
            background={TempColors(forecastNextDays?.list[12]?.main?.temp)}
            opacity="1.0"
            heigth="20vh"
          />
        </Wrapper>
      )}
    </Container>
  );
}
export default Prevision;
