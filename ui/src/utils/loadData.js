import axios from 'axios';

const API_ENDPOINT = 'https://api.openalex.org/works';

const loadData = async (filters) => {
    const url = `${API_ENDPOINT}?filter=${filters.query}&per-page=200`;
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
