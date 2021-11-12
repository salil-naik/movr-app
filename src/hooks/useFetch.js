import { useState, useEffect } from "react";

export function useFetch(url, options) {
  const [data, setData] = useState(null);

  async function fetchData(url) {
    try {
      const res = await fetch(url, options);
      const data = await res.json();

      setData(data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchData(url);
  }, []);

  return data;
}
