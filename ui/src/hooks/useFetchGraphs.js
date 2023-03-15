import axios from 'axios';
import pLimit from 'p-limit';
import { useEffect, useState } from 'react';
import { createOAQuery } from '../utils/create-oa-query';

const limit = pLimit(10);
const groupBys = ['publication_year', 'concepts.id', 'authorships.author.id', 'authorships.institutions.country_code', 'host_venue.id']

const getGraphQueries = (baseUrl) => groupBys.map((field) => limit(() => axios.get(`${baseUrl}&group_by=${field}`)));

export default function useFetchGraphs(filters) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      const baseUrl = createOAQuery(filters);
      console.log(baseUrl);
      const queries = getGraphQueries(baseUrl)
      const responses = await Promise.all(queries)
        .catch((e) => {
          console.log(e);
          setError(true);
          setIsLoading(false);
        });
      console.log(responses);
      const data = groupBys.reduce((o, field, i) => ({ ...o, [field]: responses[i]?.data?.group_by }), {})
      console.log(data);
      setData(data);
      setIsLoading(false);
      setError(false);
    }

    setIsLoading(true);
    setError(null);
    setData(null);
    
    if (!filters) {
      setIsLoading(false);
      setError(false);
    } else {
      fetchData();
    }
  }, [filters]);

  return { data, error, isLoading };
}