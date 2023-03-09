import { useState } from "react";
import {
    Container, Row, Col, Highlight,
} from '@dataesr/react-dsfr';

import Filters from "../components/filters";
import PublicationByYear from "../components/publication-by-year";
import TopRevues from "../components/top-revues";
import TopAuthors from "../components/top-authors";
import ConceptByYear from "../components/publication-by-concept";
import useFetch from "../hooks/useFetch";
import enrichWorksAuthorships from "../utils/enrich";
import GraphTitle from '../components/graph-title';
import Signatures from "../components/signatures";

export default function ExplorePage() {
    const [filters, setFilters] = useState(null);
    const { isLoading, error, data: fetchedData } = useFetch(filters?.details);
    if (isLoading) return 'Loading...'
    if (error) return 'Error';
    if (!fetchedData) return <Filters onSetFiltersHandler={(f) => setFilters(f)} />;
    const data = enrichWorksAuthorships(fetchedData?.results, filters)

    return (
        <main>
            <Filters onSetFiltersHandler={(f) => setFilters(f)} />
            <Container as="section">
                <Row alignItems='bottom'>
                    <Col n="7">
                        <GraphTitle filters={filters} title="Evolution of publications by year" />
                        <PublicationByYear dataLoaded={data || []} />
                    </Col>
                    <Col>
                        <Highlight colorFamily="yellow-tournesol">
                            texte explicatif du graph
                        </Highlight>
                    </Col>
                </Row>
                <Row className="fr-mt-5w">
                    <Col>
                        <GraphTitle filters={filters} title="Top sources with the most publications" />
                        <TopRevues dataLoaded={data || []} />
                        <Highlight colorFamily="yellow-tournesol">
                            texte explicatif du graph
                        </Highlight>
                    </Col>
                </Row>
                <Row className="fr-mt-5w">
                    <Col>
                        <GraphTitle filters={filters} title="Top 10 of signatures" />
                        <Signatures dataLoaded={data || []} filters={{ details: { affiliationOne: { type: "raw_affiliation_string", query: 'Paris Research Center' } } }} />
                        <Highlight colorFamily="yellow-tournesol">
                            texte explicatif du graph
                        </Highlight>
                    </Col>
                </Row>
                <Row className="fr-mt-5w">
                    <Col>
                        <GraphTitle filters={filters} title="Top 10 of authors with the most publications" />
                        <TopAuthors dataLoaded={data || []} />
                        <Highlight colorFamily="yellow-tournesol">
                            texte explicatif du graph
                        </Highlight>
                    </Col>
                </Row>
                <Row className="fr-mt-5w">
                    <Col>
                        <GraphTitle filters={filters} title="Number of publications by concepts" />
                        <ConceptByYear dataLoaded={data || []} />
                        <Highlight colorFamily="yellow-tournesol">
                            texte explicatif du graph
                        </Highlight>
                    </Col>
                </Row>
            </Container>
        </main>
    );
}
