export interface CurrentWeatherProps {
    main: {
      temp: number;
      pressure: number;
      humidity: number;
    };
    weather: {
      main: string;
      description: string;
      icon: number;
    }[];
    wind: {
      speed: number;
      deg: number;
    };
  }
  
  export interface ForecastNextDaysProps {
    list: {
      main: {
        temp: number;
      };
    }[];
  }
  
  export interface LocationNameProps {
    results: {
      components: {
        city: string;
        state?: string;
        country: string;
      };
      geometry: {
        lat: number;
        lng: number;
      };
    }[];
  }
  