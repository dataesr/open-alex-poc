import { useEffect, useState } from 'react'

import Filters from "../components/filters";
import PublicationByYear from '../components/publication-by-year';
import loadData from "../utils/loadData";

export default function HomePage() {
    const [data, setData] = useState(null);
    const [filters, setFilters] = useState('publication_year:2016-,raw_affiliation_string.search:beta cnrs');

    console.log(filters);

    useEffect(() => {
        const getData = async () => {
            const data = await loadData(filters);
            console.log(data);
            setData(data);
        }
        getData();
    }, [filters]);

    const onSetFiltersHandler = (f) => {
        console.log('my filters', f);
        setFilters(f);
    };

    return (
        <main>
            <Filters onSetFiltersHandler={onSetFiltersHandler} />
            <section>
                <PublicationByYear data={data} />
            </section>
        </main>
    );
}