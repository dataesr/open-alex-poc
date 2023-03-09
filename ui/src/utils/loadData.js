import axios from 'axios';
import { hashQuery } from './hash';

const OA_API_ENDPOINT = 'https://api.openalex.org/works';
const CACHE_ENDPOINT = 'https://open-alex-poccache.s3.gra.io.cloud.ovh.net/test.json'

export async function loadCache() {
    const response = await fetch(CACHE_ENDPOINT);
    console.log(response);
    return response.data;
}

const loadData = async (filters) => {
    console.log(hashQuery(filters.details));
    const url = `${OA_API_ENDPOINT}?filter=${filters.query}&seed=0&per-page=200`;
    const response = await axios.get(url);
    const nbResults = response?.data?.meta?.count;
    const perPage = response?.data?.meta?.per_page;
    const nbPage = Math.ceil(nbResults / perPage);
    let results = response?.data?.results;
    for (let page = 2; page <= nbPage; page++) {
        const res = await axios.get(`${url}&page=${page}`)
        results = results.concat(res.data.results);
        if (page === nbPage) {
            return results;
        }
    }
}

export default loadData