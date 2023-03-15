import axios from 'axios';
import pLimit from 'p-limit';
import { createOAQuery } from './create-oa-query';

const limit = pLimit(10);

export default async function fetchOA(filters) {
  let sampleSize = filters?.sampleLength || 1000;
  if (sampleSize && sampleSize > 10000) {
    sampleSize = 1000;
  }
  const baseUrl = createOAQuery(filters);
  const response = await axios.get(`${baseUrl}&per-page=1`);
  const totalCount = response?.data?.meta?.count;
  console.log(response?.data?.meta);
  const nbResults = (totalCount > sampleSize) ? sampleSize : totalCount;
  const perPage = 200;
  const nbPage = Math.ceil(nbResults / perPage);
  const results = [];
  const pages = Array(nbPage)
    .fill()
    .map((_, index) => limit(() => axios.get(`${baseUrl}&per-page=200&seed=0&sample=${sampleSize}&page=${index + 1}`)));
  const res = await Promise.all(pages).catch((e) => console.log(e));
  const rest = res.map((r) => r?.data?.results).flat();
  return { results: [...results, ...rest], meta: response?.data?.meta, filters };
}
