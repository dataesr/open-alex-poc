import axios from 'axios';
import pLimit from 'p-limit';
import { createOAQuery } from './create-oa-query';

const limit = pLimit(10);

export default async function fetchOA(filters) {
  const baseUrl = createOAQuery(filters);
  const url = `${baseUrl}&per-page=200`;
  const response = await axios.get(url);
  console.log(response?.data?.meta);
  const nbResults = (response?.data?.meta?.count > 10000)
    ? 10000
    : response?.data?.meta?.count;
  const perPage = response?.data?.meta?.per_page;
  const nbPage = Math.ceil(nbResults / perPage);
  const results = response?.data?.results;
  if (nbPage === 1) return results;
  const pages = Array(nbPage - 1)
    .fill()
    .map((_, index) => limit(() => axios.get(`${url}&page=${index + 2}`)));
  const res = await Promise.all(pages).catch((e) => console.log(e));
  const rest = res.map((r) => r?.data?.results).flat();
  return { results: [...results, ...rest], meta: response?.data?.meta, filters };
}
