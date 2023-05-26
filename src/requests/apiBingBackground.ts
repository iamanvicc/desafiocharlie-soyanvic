  /* eslint-disable */
import axios from "axios";
import dotenv from "dotenv";

if (typeof process !== "undefined") {
  dotenv.config();
}

interface getBingApiResponse {
  contents: string;
  title: string;
  copyright: string;
  images: {
    url: string;
  }[];
}

export const getBingBackground = async (): Promise<string[]> => {
  const params = new URLSearchParams();
  params.append("format", "js");
  params.append("idx", "0");
  params.append("n", "1");
  params.append("mkt", "pt-BR");

  const urlBing = `https://www.bing.com/HPImageArchive.aspx?${params.toString()}`;
  const proxyUrl = "https://cors-anywhere.herokuapp.com/";
  const url = proxyUrl + urlBing;

  try {
    const response = await axios.get(url);
    const { images } = response.data as getBingApiResponse;

    return [images[0].url];
  } catch (error) {
    console.error("Failed to fetch Bing background:", error);
    return [];
  }
};
