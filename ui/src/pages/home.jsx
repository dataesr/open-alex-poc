import useFetch from '../hooks/useFetch';
import { hashQuery } from '../utils/hash';

export default function HomePage() {
    console.log(import.meta.env.DEV);
    const fakeFilters = {
        affiliationOne: { type: "institutions.country_code", query: 'Fr' },
        affiliationTwo: { type: "raw_affiliation_string", query: 'Thales' },
    }
    const { data, isLoading, error } = useFetch(hashQuery(fakeFilters));
    if (isLoading) return 'Loading...';
    if (error) return 'Error';
    return (
        <main>
            <pre>
                {JSON.stringify(data, null, 2)}
            </pre>
        </main>
    );
}