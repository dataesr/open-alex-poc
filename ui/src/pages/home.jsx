import { Container, Row, Col, Button, Alert, Title, Link, Highlight, Text, Icon } from '@dataesr/react-dsfr';
import openalex1 from '../assets/images/openalex1.png';
import openalex2 from '../assets/images/openalex2.png';

export default function HomePage() {
    return (
        <Container as='main' className='fr-my-4w'>
            <Row gutters>
                <Col n='12'>
                    <Title as='h1'>
                        <Icon name="ri-questionnaire-fill" />
                        What is OpenAlex ?
                    </Title>
                </Col>
            </Row>
            <Row gutters>
                <Col n='12'>
                    <Link href='https://openalex.org/' target='_blank'>OpenAlex</Link>
                    &nbsp;is an open catalog of scholarly papers, authors, institutions. The OpenAlex data are available with an open license, as snapshots (a complete dump of the database) and with an API.
                </Col>
            </Row>
            <Row gutters>
                <Col n='12'>
                    This simple app aims at providing a quick tool to explore the affiliations in OpenAlex (raw string and after OpenAlex institution parsing / normalizing), for one sigle affiliation, as well as for collaboration between affiliation A and affiliation B.
                    <div className='fr-my-2w' style={{ textAlign: 'center' }}>
                        <a href='/explore'>
                            <Button colors={['#C8AA39', '#000']}>
                                Go to the affiliation explorer tool !
                            </Button>
                        </a>
                    </div>
                </Col>
            </Row>
            <Row gutters>
                <Col n='12'>
                    <Highlight colorFamily="yellow-tournesol">
                        <Title as='h2'>This app is ongoing development and is a proof of concept</Title>
                        <Text>
                            The graphs and results probably do not represent a comprehensive view of the scholarly outputs you may expect to see for a given affiliation. The institution parsing in OpenAlex is also still in development, which results in lots af raw affiliation not matched to any country / institution, or even mismatched to a wrong country / institution. We exhibits a sample of theses cases in this repo <Link href="https://github.com/dataesr/openalex-affiliation-country" target='_blank'>https://github.com/dataesr/openalex-affiliation-country</Link>
                        </Text>
                    </Highlight>
                </Col>
            </Row>
            <Row className='fr-mt-5w' gutters>
                <Col n='12'>
                    <Title as='h2' look='h3'>
                        <Icon name="ri-line-chart-fill" />
                        Example of graphs created from OpenAlex data
                    </Title>
                </Col>
                <Col n='12'>
                    The charts below show the number of works in OpenAlex, by year and by country (field institutions.code_country in OpenAlex). In the second chart, the 'unknown' country is included to show to which extent the affiliation - country parsing could be improved.
                </Col>
                <Col n='6'>
                    <img style={{ width: '100%' }} src={openalex1} />
                </Col>
                <Col n='6'>
                    <img style={{ width: '100%' }} src={openalex2} />
                </Col>
            </Row>
            <Row className='fr-mt-5w' gutters>
	      <a href='https://docs.google.com/presentation/d/1w097UBD70Jfqdd1rKgFeYuNtH1DUdQnhymP5Ch9QnZ8/edit#slide=id.gc777749701_7_60' target='_blank'> Gslide  </a>
            </Row>
        </Container>
    );
}
