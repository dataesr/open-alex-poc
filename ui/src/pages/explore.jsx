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
                title="How many publications are retrieved?"
                iconName="ri-bar-chart-fill"
              />
              <PublicationByYear dataLoaded={data || []} />
            </Col>
            <Col>
              <Highlight colorFamily="yellow-tournesol">
                This graph shows the evolution of the number of publications
                over time, from the search request made in OpenAlex. Beware by default the search is made on a random sampling of 1000 elements (cf 'more options' above), so the volume displayed is based on this sampling !
              </Highlight>
            </Col>
          </Row>
          <Row className="fr-mt-5w">
            <Col>
              <GraphTitle
                filters={filters}
                title="Where are these works published?"
                iconName="ri-file-list-line"
              />
              <TopRevues dataLoaded={data || []} />
              <Highlight colorFamily="yellow-tournesol">
                This graph displays the top 15 venues (i.e journals) in which the publications. OpenAlex indexes many publications sources, including preprints. The venues listed here includes (peer-revied) journals but also preprint servers. We noticed that sometimes OpenAlex data misses the real publisher name and displays an open archive name (bug reported to the OpenAlex team). 
              </Highlight>
            </Col>
          </Row>
          <Row className="fr-mt-5w">
            <Col>
              <GraphTitle
                filters={filters}
                title="What signatures are used in the raw affiliation?"
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
                their works with an institution.
              </Highlight>
            </Col>
          </Row>
          <Row className="fr-mt-5w">
            <Col>
              <GraphTitle
                filters={filters}
                title="Which authors have the most publications?"
                iconName="ri-bar-chart-fill"
              />
              <TopAuthors dataLoaded={data || []} />
              <Highlight colorFamily="yellow-tournesol">
                This graph shows the 10 most frequent authors in the works retrieved. These authors may not be affiliated to the input affiliation, but they appear as co-authors of the works retrieved. 
              </Highlight>
            </Col>
          </Row>
          <Row className="fr-mt-5w">
            <Col>
              <GraphTitle
                filters={filters}
                title="What are the research thematics?"
                iconName="ri-bar-chart-fill"
              />
              <ConceptByYear dataLoaded={data || []} />
              <Highlight colorFamily="yellow-tournesol">
                This graph shows the percentage of publications for each concept
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
