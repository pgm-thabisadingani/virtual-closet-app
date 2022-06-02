import { useEffect, useState } from "react";

const API_KEY = "c11311e70f8d694d127988d90ea01fe0";

export const useFetch = ({ city = "Ghent" }) => {
  const [dataUri, setDataUri] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  console.log("this is a city " + city);

  const getArticlesFromApi = () => {
    return fetch(
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

  console.log(dataUri);

  return [dataUri, isLoading, error];
};
