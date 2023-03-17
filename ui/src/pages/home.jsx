import { Container, Row, Col, Button, Title, Link, Text, Icon, Highlight } from '@dataesr/react-dsfr';
import { useNavigate } from 'react-router-dom';
import openalex1 from '../assets/images/openalex1.png';
import openalex2 from '../assets/images/openalex2.png';
import dataAnalysis from '../assets/images/data-analysis.svg';
import { PageSpinner } from '../components/spinner';
import GraphHeader from '../components/graph-header';
import BarChart from '../components/bar-chart';
import useFetchGraphs from '../hooks/useFetchGraphs';

const GROUP_BYS = ['publication_year', 'institutions.country_code'];
const HOME_FILTERS = { startDate: 2000, endDate: new Date().getFullYear() };

export default function HomePage() {
  const navigate = useNavigate();
  const { isLoading, error, data } = useFetchGraphs(HOME_FILTERS, GROUP_BYS);
  console.log('ttt', data);
  return (
    <>
      <Container fluid>
        <Container className="fr-my-4w">
          <Row alignItems="top">
            <Col n="6" className="fr-mt-8w">
              <h1 className="title-hero">
                OpenAlex database explorer
              </h1>
              <Text>
                Query the
                <a href="http://openalex.org" rel="noreferrer" target="_blank"> OpenAlex </a>
                database for one single affiliation (in option, in collaboration with another one) and get
                insights on number of publications, sources, authors, thematics and partnerships of the scholarly papers retrieved in OpenAlex.
              </Text>
              <Button size="md" secondary onClick={() => navigate('/explore/affiliations')}>
                Try our affiliation explorer
              </Button>
              <hr className="fr-col-xs-10 fr-col-7 fr-my-3w fr-py-1w" />

              <Text>
                Explore the raw affiliation strings and download the list of publications for each signature
              </Text>
              <Button size="md" secondary onClick={() => navigate('/explore/signatures')}>
                Try our signature explorer
              </Button>
            </Col>
            <Col n="6">
              <img style={{ width: '100%' }} src={dataAnalysis} alt="graph analysis" />
            </Col>
          </Row>
        </Container>
      </Container>
      <hr className="fr-col-xs-10 fr-col-7 fr-my-6w" />
      {/* <Container>
        <Row className="fr-mt-5w">
          <Title as="h2" look="h3">
              <Icon name="ri-line-chart-fill" />
              Example of graphs created from OpenAlex data
            </Title>
            <Text>
              The charts below show the number of works in OpenAlex, by year and by country (field institutions.code_country in OpenAlex).
              In the second chart, the 'unknown' country is included to show to which extent the affiliation - country parsing could be improved.
              <br />
              The institution parsing in OpenAlex is still in development, which results in lots af raw affiliation not matched to any country/institution,
              or even mismatched to a wrong country/institution.
              We exhibit a sample of theses cases in this repo
              &nbsp;
              <Link href="https://github.com/dataesr/openalex-affiliation-country" target="_blank">https://github.com/dataesr/openalex-affiliation-country</Link>
            </Text>
            <Row gutters>

              <Col n="6">
                <img style={{ width: '100%' }} src={openalex1} alt="graph" />
              </Col>
              <Col n="6">
                <img style={{ width: '100%' }} src={openalex2} alt="graph" />
              </Col>
            </Row>
          </Row>
        </Container> */}
      <Container as="section">
        <Row>
          <Title as="h2">
            {/* <Icon name="ri-questionnaire-fill" /> */}
            What is OpenAlex ?
          </Title>
          <Text>
            <Link href="https://openalex.org/" target="_blank">OpenAlex</Link>
          &nbsp;is an open catalog of scholarly papers, authors, institutions.
            The OpenAlex data are available with an open license, as snapshots (a complete dump of the database) and with an API.
          </Text>
        </Row>
      </Container>
      <Container fluid>
        {isLoading && <PageSpinner />}
        {error && (
          <Container>
            <Highlight className="fr-my-15w">
              An error occured while fetching the data.
            </Highlight>
          </Container>
        )}
        {(!error && !isLoading && data && Object.keys(data)?.length > 0) && (
          <Container as="section">
            <GraphHeader
              title="How many publications are in OpenAlex?"
              description="Evolution of the number of publications over time, from the search request made in OpenAlex."
            />
            <BarChart data={data?.publication_year?.sort((a, b) => a.key - b.key)} slice={1000} type="area" categoriesText="Publication year" />
            <GraphHeader
              title="How are works linked to affiliation country in OpenAlex?"
              description="Number of works, published since 2000, affiliated to a country. NB: one publication counts for each country is is affiliated to (no fractional count). The majority of works in OpenAlex have at least one unknown affiliation country."
            />
            <BarChart data={data?.['institutions.country_code']?.sort((a, b) => a.key - b.key)} slice={25} type="treemap" categoriesText="Publication year" />
          </Container>
        )}
      </Container>
    </>
  );
}
