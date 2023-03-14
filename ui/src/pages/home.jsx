import { Container, Row, Col, Button, Title, Link, Text, Icon } from '@dataesr/react-dsfr';
import openalex1 from '../assets/images/openalex1.png';
import openalex2 from '../assets/images/openalex2.png';
import dataAnalysis from '../assets/images/data-analysis.svg';
import { useNavigate } from 'react-router-dom';

export default function HomePage() {
    const navigate = useNavigate()
    return (
        <>
        <Container fluid>
            <Container className='fr-my-4w'>
                <Row alignItems='top'>
                    <Col n='6' className="fr-mt-8w">
                        <h1 className="title-hero">
                            OpenAlex database explorer
                        </h1>
                        <Text>
                            Query the OpenAlex database for one single affiliation, or for collaborations and get insights on topics, authors and partnerships of the scholarly papers retrieved.
                        </Text>
                        <Button size="md" secondary onClick={() => navigate('/explore/affiliations')}>
                            Try our affiliation explorer
                        </Button>
                        <hr className="fr-col-xs-10 fr-col-7 fr-my-3w fr-py-1w" />
                        
                        <Text>
                            Want to investigate papers' raw signatures further ?
                        </Text>
                        <Button size="md" secondary onClick={() => navigate('/explore/signatures')}>
                            Try our signature explorer
                        </Button>
                    </Col>
                    <Col n='6'>
                        <img style={{ width: '100%' }} src={dataAnalysis} />
                    </Col>
                </Row>
            </Container>
        </Container>
        <hr className="fr-col-xs-10 fr-col-7 fr-my-6w"/>
        <Container fluid>
            <Container>
                <Row>
                    <Title as='h2'>
                        {/* <Icon name="ri-questionnaire-fill" /> */}
                        What is OpenAlex ?
                    </Title>
                    <Text>
                        <Link href='https://openalex.org/' target='_blank'>OpenAlex</Link>
                        &nbsp;is an open catalog of scholarly papers, authors, institutions. The OpenAlex data are available with an open license, as snapshots (a complete dump of the database) and with an API.
                    </Text>
                    {/* <Title as='h3' look="h5">
                        OpenAlex in numbers...
                    </Title> */}
                </Row>
            </Container>
            <Container>
                <Row className='fr-mt-5w'>
                    <Title as='h2' look='h3'>
                        <Icon name="ri-line-chart-fill" />
                        Example of graphs created from OpenAlex data
                    </Title>
                    <Text>
                        The charts below show the number of works in OpenAlex, by year and by country (field institutions.code_country in OpenAlex). In the second chart, the 'unknown' country is included to show to which extent the affiliation - country parsing could be improved.
                        The institution parsing in OpenAlex is still in development, which results in lots af raw affiliation not matched to any country/institution,
                        or even mismatched to a wrong country/institution.
                        We exhibits a sample of theses cases in this repo
                        &nbsp;
                        <Link href="https://github.com/dataesr/openalex-affiliation-country" target='_blank'>https://github.com/dataesr/openalex-affiliation-country</Link>
                    </Text>
                    <Row gutters>

                    <Col n='6'>
                        <img style={{ width: '100%' }} src={openalex1} />
                    </Col>
                    <Col n='6'>
                        <img style={{ width: '100%' }} src={openalex2} />
                    </Col>
                    </Row>
                </Row>
            </Container>
        </Container>
    </>
    );
}
