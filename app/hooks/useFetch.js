import { useEffect, useState } from "react";
import Constants from "expo-constants";

const API_KEY = Constants.manifest.extra.apiKeyOpenWeather;

// Constants.manifest.extra.apiKeyOpenWeather;

export const useFetch = ({ city = "Ghent" }) => {
  const [dataUri, setDataUri] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const getArticlesFromApi = async () => {
    return await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&mode=json&appid=${API_KEY}`
    )
      .then((response) => response.json())
      .then((json) => {
        setDataUri(json);
      })
      .catch((error) => {
        setError(error);
      });
  };

  useEffect(() => {
    const unsubscribe = getArticlesFromApi();
    setIsLoading(false);
    return () => unsubscribe;
  }, []);

  return [dataUri, isLoading, error];
};
