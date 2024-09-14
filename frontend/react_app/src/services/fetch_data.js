import { useState, useEffect } from 'react';

export const useFetchData = (url) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const result = await response.json();
        setData(result); 
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false); // Used by pages to verify data is readable.
      }
    };
    fetchData();

  }, [url]);

  return { data, loading, error }; // Error not used currently but good to have.
};