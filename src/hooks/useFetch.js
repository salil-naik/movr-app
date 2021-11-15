import { useState, useEffect } from "react";

export function useFetch(url, options) {
  const [data, setData] = useState(null);
  const [loadingData, setLoadingData] = useState(false);

  async function fetchData(url) {
    try {
      setLoadingData(true);
      const res = await fetch(url, options);
      const data = await res.json();

      setLoadingData(false);
      setData(data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchData(url);
  }, [url]);

  return [data, loadingData];
}
