import Axios from "axios";
import { useEffect, useState } from "react";

export default function useFetch(url) {
  const [apiUrl, setApiUrl] = useState("");
  const [data, setData] = useState();
  const [isLoaded, setIsLoaded] = useState(false);
  const [isError, setIsError] = useState(null);
  const fetchUrl = async () => {
    if (apiUrl.length > 0) {
      try {
        setIsLoaded(false);

        const res = await Axios.get(apiUrl);

        if (res.data.length > 0) {
          setIsError(null);
          setData((prev) => res.data);
          setIsLoaded(true);
        } else if (Object.keys(res.data).length > 0) {
          setIsError(null);
          setData((prev) => res.data);
          setIsLoaded(true);
        } else {
          setIsError((prev) => true);
        }
      } catch (err) {
        setIsError((prev) => true);
        setIsLoaded(false);
      }
    }
  };
  useEffect(() => {
    if (apiUrl.split("/").pop() !== "undefined") {
      console.log(apiUrl.length);
      fetchUrl();
    }
  }, [apiUrl]);
  return [setApiUrl, data, isLoaded, isError];
}
