import axios from 'axios';
import { useEffect, useState } from 'react';
import defaultData from '../../data/huawei_france.json';

export default function useFetch(filters) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => axios.get('https://open-alex-poccache.s3.gra.io.cloud.ovh.net/eyJhZmZpbGlhdGlvbk9uZSI6eyJxdWVyeSI6IkZyIiwidHlwZSI6Imluc3RpdHV0aW9ucy5jb3VudHJ5X2NvZGUifSwiYWZmaWxpYXRpb25Ud28iOnsicXVlcnkiOiJUaGFsZXMiLCJ0eXBlIjoicmF3X2FmZmlsaWF0aW9uX3N0cmluZyJ9fQ==.json')
    .then((response) => {
      setData(response.data);
      setIsLoading(false);
    })
    .catch(() => {
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