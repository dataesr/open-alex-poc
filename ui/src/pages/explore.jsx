import { useState } from "react";
import { Container, Row, Col, Highlight } from "@dataesr/react-dsfr";

import Filters from "../components/filters";
import PublicationByYear from "../components/publication-by-year";
import TopRevues from "../components/top-revues";
import TopAuthors from "../components/top-authors";
import ConceptByYear from "../components/publication-by-concept";
import TopCountry from "../components/top-country";
import useFetch from "../hooks/useFetch";
import GraphTitle from "../components/graph-title";
import Signatures from "../components/signatures";

export default function ExplorePage() {
  const [filters, setFilters] = useState(null);
  const { isLoading, error, data } = useFetch(filters);
  return (
    <main>
      <Filters onSetFiltersHandler={(f) => setFilters(f)} />
      {isLoading && <p>isLoading</p>}
      {error && <p>Error</p>}
      {!error && !isLoading && data?.length > 0 && (
        <Container as="section">
          <Row alignItems="bottom">
            <Col n="7">
              <GraphTitle
                filters={filters}
                title="Evolution of publications by year"
                iconName="ri-bar-chart-fill"
              />
              <PublicationByYear dataLoaded={data || []} />
            </Col>
            <Col>
              <Highlight colorFamily="yellow-tournesol">
                This graph shows evolution of number of publications over time.
              </Highlight>
            </Col>
          </Row>
          <Row className="fr-mt-5w">
            <Col>
              <GraphTitle
                filters={filters}
                title="Top sources with the most publications"
                iconName="ri-file-list-line"
              />
              <TopRevues dataLoaded={data || []} />
              <Highlight colorFamily="yellow-tournesol">
                This graph displays the top 10 revue for a concept at level 0,
                allowing for a visual comparison of the number of publications
                in each revue.
              </Highlight>
            </Col>
          </Row>
          <Row className="fr-mt-5w">
            <Col>
              <GraphTitle
                filters={filters}
                title="Top 10 of signatures"
                iconName="ri-file-list-line"
              />
              <Signatures
                dataLoaded={data || []}
                filters={{
                  details: {
                    affiliationOne: {
                      type: "raw_affiliation_string",
                      query: "Paris Research Center",
                    },
                  },
                }}
              />
              <Highlight colorFamily="yellow-tournesol">
                We are displaying the 10 most frequent signature affiliations
                among institutions. A signature is the way an author associates
                their works with an institute.
              </Highlight>
            </Col>
          </Row>
          <Row className="fr-mt-5w">
            <Col>
              <GraphTitle
                filters={filters}
                title="Top 10 of authors with the most publications"
                iconName="ri-bar-chart-fill"
              />
              <TopAuthors dataLoaded={data || []} />
              <Highlight colorFamily="yellow-tournesol">
                This graph shows the 10 most frequent authors. The graph allows
                for a visual comparison of the number of publications for each
                author, helping to identify the most prolific ones.
              </Highlight>
            </Col>
          </Row>
          <Row className="fr-mt-5w">
            <Col>
              <GraphTitle
                filters={filters}
                title="Number of publications by concepts"
                iconName="ri-bar-chart-fill"
              />
              <ConceptByYear dataLoaded={data || []} />
              <Highlight colorFamily="yellow-tournesol">
                This chart shows the percentage of publications for each concept
                by year. We have established a top 5 of concepts with the
                highest number of publications and grouped the rest under the
                'Other' category.
              </Highlight>
            </Col>
          </Row>
          <Row className="fr-mt-5w">
            <Col>
              <GraphTitle
                filters={filters}
                title="Top Country Partner"
                iconName="ri-file-list-line"
              />
              <TopCountry
                dataLoaded={data || []}
                filters={{
                  details: {
                    affiliationOne: {
                      type: "raw_affiliation_string",
                      query: "Huawei",
                    },
                    affiliationTwo: {
                      type: "raw_affiliation_string",
                      query: "france",
                    },
                  },
                }}
              />
              <Highlight colorFamily="yellow-tournesol">
                Top 20 co-authorships countries
              </Highlight>
            </Col>
          </Row>
        </Container>
      )}
    </main>
  );
}
