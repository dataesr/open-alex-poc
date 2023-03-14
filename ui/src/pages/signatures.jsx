import { useState } from "react";
import { Container, Row, Col, Highlight, Icon, Title } from "@dataesr/react-dsfr";

import Filters from "../components/filters";
import PublicationByYear from "../components/publication-by-year";
import TopRevues from "../components/top-revues";
import TopAuthors from "../components/top-authors";
import ConceptByYear from "../components/publication-by-concept";
import TopCountry from "../components/top-country";
import useFetch from "../hooks/useFetch";
import GraphTitle from "../components/graph-title";
import Signatures from "../components/signatures";
import { PageSpinner } from "../components/spinner";
import export2txt from "../utils/export";

export default function SignaturesExplorePage() {
  const [filters, setFilters] = useState(null);
  const { isLoading, error, data } = useFetch(filters);
  return (
    <main>
      <Container className="fr-mt-5w">
      <Title as="h2" className="fr-mb-0">
        <Icon name="ri-filter-2-fill" />
        Which signatures to analyze ?
      </Title>
      </Container>
      <Filters onSetFiltersHandler={(f) => setFilters(f)} />
      {isLoading && <PageSpinner />}
      {error && <p>Error</p>}
      {!error && !isLoading && data?.length > 0 && (
        <Container as="section">
          <Row className="fr-mt-5w">
            <Col n="6">
              <GraphTitle
                filters={filters}
                title="What signatures are used in the raw affiliation?"
                iconName="ri-file-list-line"
              />
              <Signatures
                dataLoaded={data || []}
                field="raw_affiliation"
                perimeter="affiliationOne"
              />
              <Highlight colorFamily="yellow-tournesol">
                We are displaying the 10 most frequent signature affiliations
                among institutions. A signature is the way an author associates
                their works with an institution.
              </Highlight>
            </Col>
            <Col n="6">
              <GraphTitle
                filters={filters}
                title="What signatures are used in the raw affiliation?"
                iconName="ri-file-list-line"
              />
              <Signatures
                dataLoaded={data || []}
                field="institution_name"
                perimeter="affiliationOne"
              />
              <Highlight colorFamily="yellow-tournesol">
                We are displaying the 10 most frequent signature affiliations
                among institutions. A signature is the way an author associates
                their works with an institution.
              </Highlight>
            </Col>
          </Row>
          <Row className="fr-mt-5w">
            <Col n="6">
              <GraphTitle
                filters={filters}
                title="What signatures are used in the raw affiliation for the partners in collaboration?"
                iconName="ri-file-list-line"
              />
              <Signatures
                dataLoaded={data || []}
                field="raw_affiliation"
                perimeter="affiliationTwo"
              />
              <Highlight colorFamily="yellow-tournesol">
                We are displaying the 10 most frequent signature affiliations
                among institutions. A signature is the way an author associates
                their works with an institution.
              </Highlight>
            </Col>
            <Col n="6">
              <GraphTitle
                filters={filters}
                title="What signatures are used in the raw affiliation for the partners in collaboration?"
                iconName="ri-file-list-line"
              />
              <Signatures
                dataLoaded={data || []}
                field="institution_name"
                perimeter="affiliationTwo"
              />
              <Highlight colorFamily="yellow-tournesol">
                We are displaying the 10 most frequent signature affiliations
                among institutions. A signature is the way an author associates
                their works with an institution.
              </Highlight>
            </Col>
          </Row>
          <Row className="fr-mt-5w">
            <Col n="6">
              <GraphTitle
                filters={filters}
                title="What signatures are used in the raw affiliation for the other partners?"
                iconName="ri-file-list-line"
              />
              <Signatures
                dataLoaded={data || []}
                field="raw_affiliation"
                perimeter="affiliationThree"
              />
              <Highlight colorFamily="yellow-tournesol">
                We are displaying the 10 most frequent signature affiliations
                among institutions. A signature is the way an author associates
                their works with an institution.
              </Highlight>
            </Col>
            <Col n="6">
              <GraphTitle
                filters={filters}
                title="What signatures are used in the raw affiliation for the other partners?"
                iconName="ri-file-list-line"
              />
              <Signatures
                dataLoaded={data || []}
                field="institution_name"
                perimeter="affiliationThree"
              />
              <Highlight colorFamily="yellow-tournesol">
                We are displaying the 10 most frequent signature affiliations
                among institutions. A signature is the way an author associates
                their works with an institution.
              </Highlight>
            </Col>
          </Row>
        </Container>
      )}
    </main>
  );
}
