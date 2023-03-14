import { useState } from "react";
import { Container, Row, Col, Highlight, Icon, Title, Text } from "@dataesr/react-dsfr";

import Filters from "../components/filters";
import useFetch from "../hooks/useFetch";
import GraphTitle from "../components/graph-title";
import Signatures from "../components/signatures";
import { PageSpinner } from "../components/spinner";

function resultText(count, sample, aff1, aff2 = null) {
  const result = aff2 ? `Results for "${aff1}": ${count} scholarly papers` : `Results for "${aff1}" and "${aff2}": ${count} scholarly papers`;
  return (
    <>
      <Text className="fr-mb-1w fr-text--bold">{result}</Text>
    {(sample && (sample <= count)) && (
      <Text className="fr-mb-0">
        <Icon name="ri-error-warning-line" />
        <i>{`sample of ${sample} elements (you may be increased sample in the query options with a maximum of 10000)`}</i>
      </Text>
    )}
    </>
  )
}

export default function SignaturesExplorePage() {
  const [filters, setFilters] = useState(null);
  const { isLoading, error, data, count } = useFetch(filters);
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
          {resultText(count, filters?.sampleLength, filters?.affiliationOne?.query, filters?.affiliationOne?.query)}
          <Row gutters className="fr-mt-5w">
            <Col n="12 md-6">
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
            <Col n="12 md-6">
              <GraphTitle
                filters={filters}
                title="What signatures are used in the matched affiliation?"
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
          {filters?.affiliationTwo?.query && (<Row gutters className="fr-mt-5w">
            <Col n="12 md-6">
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
            <Col n="12 md-6">
              <GraphTitle
                filters={filters}
                title="What signatures are used in the matched affiliation for the partners in collaboration?"
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
          </Row>)}
          <Row gutters className="fr-mt-5w">
            <Col n="12 md-6">
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
            <Col n="12 md-6">
              <GraphTitle
                filters={filters}
                title="What signatures are used in the matched affiliation for the other partners?"
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
