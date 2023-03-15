import { useState } from "react";
import { Container, Row, Col, Highlight, Icon, Title, Text } from "@dataesr/react-dsfr";

import Filters from "../components/filters";
import useFetch from "../hooks/useFetch";
import Signatures from "../components/signatures";
import { PageSpinner } from "../components/spinner";



export default function SignaturesExplorePage() {
  const [filters, setFilters] = useState(null);
  const { isLoading, error, data, count } = useFetch(filters);
  return (
    <>
      <Container className="fr-mt-5w">
      <Title as="h2" className="fr-mb-0">
        <Icon name="ri-filter-2-fill" />
        Which signatures to analyze ?
      </Title>
        <Text size="sm" className="fr-ml-5w fr-mr-15w">
        <i>
        A signature is the way an author associates his work with an institution.
        <br />
        They may differ for two authors in the same institution and even for a single author in a single institution in two different works.
        <br />
        Query the OpenAlex database with your institution name and discover the raw signature that are used the most by it's authors.
        </i>
        </Text>
      </Container>
      <Container fluid className={filters ? '' : 'fr-mb-15w'}>
        <Filters onSetFiltersHandler={(f) => setFilters(f)} />
      </Container>
      {isLoading && <PageSpinner />}
      {error && (
        <Container>
          <Highlight className="fr-my-15w">
            An error occured while fetching the data.
          </Highlight>
        </Container>
      )}
      {!error && !isLoading && data?.length > 0 && (
        <Container fluid >
          <div class="fr-notice fr-notice--info fr-mb-4w fr-mt-2w fr-py-2w">
            <Container className="fr-my-2w">
              <Text className="fr-mb-0 fr-text--bold">
                {
                  filters?.affiliationOne?.query
                    ? `Results for "${filters.affiliationOne.query}": ${count} scholarly papers in the period ${filters.startDate}-${filters.endDate}`
                    : `Results for "${filters.affiliationOne.query}" and "${filters?.affiliationOne?.query}": ${count} scholarly papers in the period ${filters.startDate}-${filters.endDate}`
                }
              </Text>
              {(filters?.sampleLength && (filters?.sampleLength <= count)) && (
                <Text size="sm" className="fr-mb-0">
                  <Icon name="ri-error-warning-line" />
                  <i>{`Results are based on a sample of ${filters.sampleLength} elements (you may change sample size in the query options)`}</i>
                </Text>
              )}
              <Highlight size="sm" className="fr-ml-0 fr-mt-2w">
                We are displaying the 10 most frequent signatures and matched institutions.
                <br />
                For each list, you may download complete results as csv files.
              </Highlight>
            </Container>
          </div>
        <Container as="section">
          <Title as="h2" look="h4" className="fr-mb-2w">
            {`Signatures for "${filters?.affiliationOne?.query}"`}
          </Title>
          <Row gutters>
            <Col n="12">
              <Signatures
                dataLoaded={data}
                field="raw_affiliation"
                perimeter="affiliationOne"
              />
            </Col>
            <Col n="12">
              <Signatures
                dataLoaded={data}
                field="institution_name"
                perimeter="affiliationOne"
              />
            </Col>
          </Row>
          {filters?.affiliationTwo?.query && (
          <>
            <hr className="fr-col-xs-10 fr-col-7 fr-my-6w" />
            <Title as="h2" look="h4" className="fr-mb-2w">
              {`Signatures for "${filters?.affiliationTwo?.query}"`}
            </Title>
          <Row gutters>
            <Col n="12">
              <Signatures
                dataLoaded={data}
                field="raw_affiliation"
                perimeter="affiliationTwo"
              />
            </Col>
            <Col n="12">
              <Signatures
                dataLoaded={data}
                field="institution_name"
                perimeter="affiliationTwo"
              />
            </Col>
          </Row>
          </>
          )}
          <hr className="fr-col-xs-10 fr-col-7 fr-my-6w" />
          <Title as="h2" look="h4" className="fr-mb-2w fr-mt-4w">
            {`Signatures for other collaborators`}
          </Title>
          <Row gutters>
            <Col n="12">
              <Signatures
                dataLoaded={data}
                field="raw_affiliation"
                perimeter="affiliationThree"
              />
            </Col>
            <Col n="12">
              <Signatures
                dataLoaded={data}
                field="institution_name"
                perimeter="affiliationThree"
              />
            </Col>
          </Row>
        </Container>
        </Container>
      )}
    </>
  );
}
