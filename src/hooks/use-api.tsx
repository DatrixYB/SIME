import { useState } from 'react';

const useApi = (apiFunction: (arg0: any) => any) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const request = async (...args: any[]) => {
    setLoading(true);
    try {
      const result = await apiFunction(...args);
      setData(result.data);
      console.log('API response:', result.data);
    } catch (err) {
      setError(err.response?.data || 'Error inesperado');
    } finally {
      setLoading(false);
    }
  };
  
  return { data, error, loading, request };
};

export default useApi;
