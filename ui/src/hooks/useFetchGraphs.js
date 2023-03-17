import axios from 'axios';
import pLimit from 'p-limit';
import { useEffect, useState } from 'react';
import { createOAQuery } from '../utils/create-oa-query';

const limit = pLimit(10);

export default function useFetchGraphs(filters, groupBys = []) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      const baseUrl = createOAQuery(filters);
      const queries = groupBys.map((field) => limit(() => axios.get(`${baseUrl}&group_by=${field}`)));
      const responses = await Promise.all(queries)
        .catch(() => {
          setError(true);
          setIsLoading(false);
        });
      const groups = groupBys.reduce((o, field, i) => ({ ...o, [field]: responses[i]?.data?.group_by }), {});
      setData(groups);
      setIsLoading(false);
      setError(false);
    };

    setIsLoading(true);
    setError(undefined);
    setData(undefined);

    if (!filters || !groupBys) {
      setIsLoading(false);
      setError(false);
    } else {
      fetchData();
    }
  }, [filters, groupBys]);

  return { data, error, isLoading };
}
