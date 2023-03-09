import { useEffect, useState } from "react";
import { Container, Row, Col } from "@dataesr/react-dsfr";
import Filters from "../components/filters";
import PublicationByYear from "../components/publication-by-year";
import loadData from "../utils/loadData";
import TopRevues from "../components/top-revues";
import TopAuthors from "../components/top-authors";
import ConceptByYear from "../components/publication-by-concept";
import useFetch from "../hooks/useFetch";
import enrichWorksAuthorships from "../utils/enrich";

export default function ExplorePage() {
  const [filters, setFilters] = useState(null);
  const {isLoading, error, data: fetchedData } = useFetch(filters?.details);
  if (isLoading) return 'Loading...'
  if (error) return 'Error';
  if (!fetchedData) return <Filters onSetFiltersHandler={(f) => setFilters(f)} />;
  const data = enrichWorksAuthorships(fetchedData?.results, filters)

  return (
    <main>
      <Filters onSetFiltersHandler={(f) => setFilters(f)} />
      <section>
        <Container>
          <Row>
            <Col>
              <PublicationByYear dataLoaded={data || []} />
            </Col>
            <Col>graph 2</Col>
          </Row>
          <Row>
            <Col>
              <TopRevues dataLoaded={data || []} />
            </Col>
          </Row>
        </Container>
      </section>
    </main>
  );
}
