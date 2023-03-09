import axios from 'axios';
import { useEffect, useState } from 'react';
import defaultData from '../../data/huawei_france.json';

const { VITE_API_ENDPOINT } = import.meta.env;

export default function useFetch(filters) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => axios.get(`${endpoint}?oaq=${filters}`)
    .then((response) => {
      setData(response.data);
      setIsLoading(false);
    })
    .catch((e) => {
      setError(true);
      setIsLoading(false);
    });
    
    setIsLoading(true);
    setError(null);
    setData(null);
    if (import.meta.env.DEV) {
      setIsLoading(false);
      setError(false);
      setData(defaultData);
    } else {
      fetchData();
    }
  }, [filters]);

  return { data, error, isLoading };
}