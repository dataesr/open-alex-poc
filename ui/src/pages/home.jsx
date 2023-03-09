import { useEffect, useState } from 'react'
import {
    Container, Row, Col, Button, Alert
} from '@dataesr/react-dsfr';

import Filters from "../components/filters";
import PublicationByYear from '../components/publication-by-year';
import loadData from "../utils/loadData";
import useFetch from '../hooks/useFetch';
import { hashQuery } from '../utils/hash';

export default function HomePage() {
    console.log(import.meta.env.DEV);
    const fakeFilters = {
        affiliationOne: { type: "institutions.country_code", query: 'Fr' },
        affiliationTwo: { type: "raw_affiliation_string", query: 'Thales' },
    }
    const { data, isLoading, error } = useFetch(hashQuery(fakeFilters));
    if (isLoading) return 'Loading...';
    if (error) return 'Error';
    return (
        <main>
            <section>
	      <Container className='fr-my-5w'>
                    <Row gutters>
	              <h1>What is OpenAlex ?</h1>
                    </Row>
                    <Row gutters>
	              <p>
	                <a href='https://openalex.org/' target='_blank'>OpenAlex</a> is an open catalog of scholarly papers, authors, institutions. The OpenAlex data are available with an open license, as snapshots (a complete dump of the database) and with an API.
	              </p>
                    </Row>
                    <Row gutters>
	              This simple app aims at providing a quick tool to explore the affiliations in OpenAlex (raw string and after OpenAlex institution parsing / normalizing), for one sigle affiliation, as well as for collaboration between affiliation A and affiliation B. 
	    <div className = 'fr-my-2w'><a href='/explore'><Button>Go to the affiliation explorer tool !</Button></a></div>
                    </Row>
                </Container>
 	        <Container className='fr-my-5w'>
                    <Row gutters>
	              <Alert 
	                title='This app is ongoing development and is a proof of concept'
	                description="The graphs and results probably do not represent a comprehensive view of the scholarly outputs you may expect to see for a given affiliation. The institution parsing in OpenAlex is also still in development, which results in lots af raw affiliation not matched to any country / institution, or even mismatched to a wrong country / institution. We exhibits a sample of theses cases in this repo https://github.com/dataesr/openalex-affiliation-country"
	              >
	              </Alert>
                    </Row>
	    <Row className='fr-y-5w'>
	    <Col n='12' className='fr-m-5w'>
	    The charts below show the number of works in OpenAlex, by year and by country (field institutions.code_country in OpenAlex). In the second chart, the 'unknown' country is included to show to which extent the affiliation - country parsing could be improved. </Col>
	    <Col n='5' className='fr-m-5w'> <img style={{width:'100%'}} src='public/openalex1.png'></img> </Col>
	    <Col n='5' className='fr-m-5w'> <img style={{width:'100%'}} src='public/openalex2.png'></img> </Col>
	    </Row>
                </Container>
            </section>
            <pre>
                {JSON.stringify(data, null, 2)}
            </pre>
        </main>
    );
}
