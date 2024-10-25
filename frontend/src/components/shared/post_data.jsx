import { useState } from 'react';

const usePostData = (endpoint) => {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const url = `http://localhost:5000/api/${endpoint}/`;

  const postData = async (data) => {
    setLoading(true);
    setError(null); 

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const result = await response.json();
        setResult(result);
      } else {
        setError(`Error: ${response.status} ${response.statusText}`);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { result, loading, error, postData };
};

export default usePostData;
