import { useState } from "react";
import { Container, Row, Col, Highlight } from "@dataesr/react-dsfr";

import Filters from "../components/filters";
import PublicationByYear from "../components/publication-by-year";
import TopRevues from "../components/top-revues";
import TopAuthors from "../components/top-authors";
import ConceptByYear from "../components/publication-by-concept";
import TopCountry from "../components/top-country";
import useFetch from "../hooks/useFetch";
import enrichWorksAuthorships from "../utils/enrich";
import GraphTitle from "../components/graph-title";
import Signatures from "../components/signatures";

export default function ExplorePage() {
  const [filters, setFilters] = useState(null);
  const { isLoading, error, data: fetchedData } = useFetch(filters?.details);
  if (isLoading) return "Loading...";
  if (error) return "Error";
  if (!fetchedData)
    return <Filters onSetFiltersHandler={(f) => setFilters(f)} />;
  const data = enrichWorksAuthorships(fetchedData?.results, filters);

  return (
    <main>
      <Filters onSetFiltersHandler={(f) => setFilters(f)} />
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
              texte explicatif du graph
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
              texte explicatif du graph
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
              texte explicatif du graph
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
              texte explicatif du graph
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
              texte explicatif du graph
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
              texte explicatif du graph
            </Highlight>
          </Col>
        </Row>
      </Container>
    </main>
  );
}
