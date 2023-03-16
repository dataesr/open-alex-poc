import axios from 'axios';
import { useEffect, useState } from 'react';
import defaultData from '../../data/huawei_france.json';
import enrichWorksAuthorships from '../utils/enrich';
import { hashQuery } from '../utils/hash';

const USE_DEFAULT_VALUES = false;
const BASE_URL = (import.meta.env.DEV && !USE_DEFAULT_VALUES) ? 'http://localhost:3000' : '';

export default function useFetch(filters) {
  const [data, setData] = useState(null);
  const [count, setCount] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => axios.get(`${BASE_URL}/api?oaq=${hashQuery(filters)}`)
      .then(async (response) => {
        setData(enrichWorksAuthorships(response.data?.results, filters));
        setCount(response.data?.meta?.count);
        setIsLoading(false);
      })
      .catch(() => {
        setError(true);
        setIsLoading(false);
      });

    setIsLoading(true);
    setError(null);
    setData(null);
    if (import.meta.env.DEV && USE_DEFAULT_VALUES) {
      setIsLoading(false);
      setError(false);
      setData(enrichWorksAuthorships(defaultData?.results, filters));
      setCount(defaultData?.results?.length);
    } else if (!filters) {
      setIsLoading(false);
      setError(false);
    } else {
      fetchData();
    }
  }, [filters]);

  return { data, count, error, isLoading };
}
