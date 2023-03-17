import { useState } from 'react';
import { Container, Highlight, Icon, Title, Text } from '@dataesr/react-dsfr';

import Filters from '../components/filters';
import { PageSpinner } from '../components/spinner';
import GraphHeader from '../components/graph-header';
import useFetchGraphs from '../hooks/useFetchGraphs';
import BarChart from '../components/bar-chart';

const groupBys = ['publication_year', 'concepts.id', 'authorships.author.id', 'authorships.institutions.country_code', 'host_venue.id', 'authorships.institutions.id'];

export default function AffiliationsExplorePage() {
  const defaultStartYear = 2000;
  const [filters, setFilters] = useState(null);
  const { isLoading, error, data } = useFetchGraphs(filters, groupBys);
  return (
    <>
      <Container className="fr-mt-5w">
        <Title as="h2" className="fr-mb-0">
          <Icon name="ri-filter-2-fill" />
          Which affiliation to analyze ?
        </Title>
        <Text size="sm" className="fr-ml-5w fr-mr-15w">
          <i>
            Query the OpenAlex database for one single affiliation, or for collaborations and get insights on topics, authors and partnerships of the scholarly papers retrieved.
          </i>
        </Text>
      </Container>
      <Container fluid className={filters ? '' : 'fr-mb-15w'}>
        <Filters onSearch={(f) => setFilters(f)} defaultStartYear={defaultStartYear} />
      </Container>
      {isLoading && <PageSpinner />}
      {error && (
        <Container>
          <Highlight className="fr-my-15w">
            An error occured while fetching the data.
          </Highlight>
        </Container>
      )}
      {(!error && !isLoading && data && Object.keys(data)?.length > 0) && (
        <>
          <Container fluid>
            <div className="fr-notice fr-notice--info fr-mb-4w fr-mt-2w fr-py-2w">
              <Container className="fr-my-2w">
                <Text className="fr-mb-0 fr-text--bold">
                  {
                    filters?.affiliationOne?.query
                      ? `Results for "${filters.affiliationOne.query}" in the period ${filters.startDate}-${filters.endDate}`
                      : `Results for "${filters.affiliationOne.query}" and "${filters?.affiliationOne?.query}" in the period ${filters.startDate}-${filters.endDate}`
                  }
                </Text>
              </Container>
            </div>
          </Container>
          <Container as="section">
            <GraphHeader
              title="How many publications are retrieved?"
              description="Evolution of the number of publications over time, from the search request made in OpenAlex."
            />
            <BarChart data={data?.publication_year?.sort((a, b) => a.key - b.key)} slice={1000} type="area" categoriesText="Publication year" />
            <hr className="fr-col-xs-10 fr-col-7 fr-my-6w" />
            <GraphHeader
              iconName="ri-bar-chart-fill"
              title="Which institutions appear the most in the affiliations of these publications?"
              description="Top 15 most frequent institutions in the works retrieved."
            />
            <BarChart data={data?.['authorships.institutions.id']} categoriesText="Institutions matched with OpenAlex affiliation parsing" type="bar" slice={15} />
            <hr className="fr-col-xs-10 fr-col-7 fr-my-6w" />
            <GraphHeader
              icon="ri-file-list-line"
              title="Where are these works published?"
              description="Top 15 sources (i.e journals) of the publications. OpenAlex indexes many publications sources, including preprints.
              The venues listed here includes (peer-revied) journals but also preprint servers. We noticed that sometimes OpenAlex data misses
              the real publisher name and displays an open archive name (bug reported to the OpenAlex team)."
            />
            <BarChart data={data?.['host_venue.id']} type="bar" slice={15} categoriesText="Top sources" />
            <hr className="fr-col-xs-10 fr-col-7 fr-my-6w" />
            <GraphHeader
              iconName="ri-bar-chart-fill"
              title="Which authors have the most publications?"
              description="Top 10 most frequent authors in the works retrieved. These authors may not be affiliated to the input affiliation, but they appear as co-authors of the works retrieved."
            />
            <BarChart data={data?.['authorships.author.id']} categoriesText="Authors full name matched by OpenAlex disambiguation algorithm" />
            <hr className="fr-col-xs-10 fr-col-7 fr-my-6w" />
            <GraphHeader
              iconName="ri-bar-chart-fill"
              title="What are the research thematics?"
            />
            <BarChart data={data?.['concepts.id']} type="bar" slice={20} categoriesText="Scientific field (concepts)" />
            <hr className="fr-col-xs-10 fr-col-7 fr-my-6w" />
            {/* <GraphHeader
              title="What are the research thematics?"
              iconName="ri-bar-chart-fill"
              description="Percentage of publications for each concept
              by year. We have established a top 5 of concepts with the
              highest number of publications and grouped the rest under the
              'Other' category."
            />
            <ConceptByYear dataLoaded={data} />
            <hr className="fr-col-xs-10 fr-col-7 fr-my-6w" /> */}
            <GraphHeader
              title="Top Country Partner"
              iconName="ri-file-list-line"
            />
            <BarChart data={data?.['authorships.institutions.country_code']} slice={10} type="bar" />
            <hr className="fr-col-xs-10 fr-col-7 fr-my-6w" />
          </Container>
        </>
      )}
    </>
  );
}
