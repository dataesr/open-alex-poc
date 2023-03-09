import { useState } from "react";
import { Container, TextInput, Row, Col, Button, Select, Checkbox } from "@dataesr/react-dsfr";
import countriesList from '../../assets/countriesList.json';

export default function Filters({ onSetFiltersHandler }) {
    const [startDate, setStartDate] = useState(2016);
    const [endDate, setEndDate] = useState(2022);

    const types = ["Raw affiliation contains", "Country (from parsed institution)", "RoR (from pared institution)"];
    const [affiliation1Type, setAffiliation1Type] = useState(types[0]);
    const [affiliation1ISO, setAffiliation1ISO] = useState(null);
    const [affiliation1Str, setAffiliation1Str] = useState(null);

    const [affiliation2Type, setAffiliation2Type] = useState(types[0]);
    const [affiliation2ISO, setAffiliation2ISO] = useState(null);
    const [affiliation2Str, setAffiliation2Str] = useState(null);

    const [thematic, setThematic] = useState(null);

    const [onSample, setOnSample] = useState(true);
    const [sampleLength, setSampleLength] = useState(1000);

    const [query, setQuery] = useState('empty');

    const createQuery = () => {
        let q = '';

        if (startDate || endDate) q += 'publication_year:';
        if (startDate) q += startDate + '-';
        if (endDate && !startDate) q += '-' + endDate;
        if (endDate && startDate) q += endDate;

        if ((startDate || endDate) && (affiliation1Str || affiliation1ISO)) q += ',';
        if (affiliation1Type === types[0] && affiliation1Str) q += 'raw_affiliation_string.search:' + affiliation1Str;
        if (affiliation1Type === types[1]) q += 'institutions.country_code:' + affiliation1ISO;

        if ((startDate || endDate) && (affiliation2Str || affiliation2ISO)) q += ',';
        if (affiliation2Type === types[0] && affiliation2Str) q += 'raw_affiliation_string.search:' + affiliation2Str;
        if (affiliation2Type === types[1]) q += 'institutions.country_code' + affiliation2ISO;

        if (onSample) q += '&seed=0&sample=' + sampleLength;

        if (thematic) q += '&search=' + thematic;

        // https://api.openalex.org/works?filter=publication_year:2016-,raw_affiliation_string.search:Huawei,raw_affiliation_string.search:france&sample=1000&seed=0
        setQuery(q);
        onSetFiltersHandler(
            {
                details: {
                    affiliationOne: { type: affiliation1Type, query: (affiliation1Type === types[1]) ? affiliation1ISO : affiliation1Str },
                    affiliationTwo: { type: affiliation2Type, query: (affiliation2Type === types[1]) ? affiliation2ISO : affiliation2Str },
                    startDate,
                    endDate,
                    thematic,
                    onSample,
                    sampleLength,
                },
                query: q,
            }
        );
    }

    return (
        <section className="fr-mt-1w">
            <Container>
              <Row gutters className='fr-my-2w'>
                <Col n="12">
	          <h2 className='fr-my-1w'> Which affiliation to analyze ? </h2>
	        </Col>
                <Col n="3">
                        <Select
                            label="Affiliation search type"
                            id="affiliation1_type"
                            onChange={(e) => [setAffiliation1Type(e.target.value), setAffiliation1Str(null)]}
                            options={types.map((el) => ({ label: el, name: el }))}
                            selected={affiliation1Type}
	                    placeHolder='rrrr'
                        />
                </Col>
                    <Col n="5">
                        {
                            (affiliation1Type === types[1]) ? (
                                <Select
                                    label="Value"
                                    id="affiliation1ISO"
                                    onChange={(e) => setAffiliation1ISO(e.target.value)}
                                    options={countriesList.map((el) => ({ label: el.name, value: el.code }))}
                                    selected={affiliation1ISO}
                                />
                            ) : (
                                <TextInput
                                    label="Value"
                                    name="affiliation1_str"
                                    value={affiliation1Str}
                                    onChange={(e) => setAffiliation1Str(e.target.value)}
                                />
                            )
                        }
                    </Col>
                    <Col n="1">
                        <Checkbox label="Random sampling " checked={onSample} onChange={() => setOnSample(!onSample)} />
                    </Col>
                    <Col n="1">
                        <TextInput
	                    label='size'
                            name="sampleLength"
                            value={sampleLength}
                            onChange={(e) => setSampleLength(e.target.value)}
                            disabled={!onSample}
                        />
                    </Col>
                </Row>
                <Row gutters alignItems="bottom">
                <Col n="12">
	          <div className=''> In collaboration with ? (optional)</div>
	        </Col>
                <Col n="3">
                  <Select
                    label="Affiliation search type"
                    id="affiliation2_type"
                    onChange={(e) => [setAffiliation2Type(e.target.value), setAffiliation2Str(null)]}
                    options={types.map((el) => ({ label: el, name: el }))}
                    selected={affiliation2Type}
                        />
                    </Col>
                    <Col n="5">
                        {
                            (affiliation2Type === types[1]) ? (
                                <Select
                                    label="Value"
                                    id="affiliation2ISO"
                                    onChange={(e) => setAffiliation2ISO(e.target.value)}
                                    options={countriesList.map((el) => ({ label: el.name, value: el.code }))}
                                    selected={affiliation2ISO}
                                />
                            ) : (
                                <TextInput
                                    label="Value"
                                    name="affiliation2_str"
                                    value={affiliation2Str}
                                    onChange={(e) => setAffiliation2Str(e.target.value)}
                                />
                            )
                        }
                    </Col>
                </Row>
                <Row gutters alignItems="bottom">
                    <Col n="2">
                        <TextInput
                            name="startDateInput"
                            value={startDate} label="Start year"
                            maxLength="4"
                            onChange={(e) => setStartDate(e.target.value)}
                        />
                    </Col>
                    <Col n="2">
                        <TextInput
                            name="endDateInput"
                            value={endDate}
                            label="End year (empty = max)"
                            maxLength="4"
                            onChange={(e) => setEndDate(e.target.value)}
                        />
                    </Col>
                    <Col n="4">
                        <TextInput
                            name="thematic"
                            value={thematic}
                            label="Thematic"
                            onChange={(e) => setThematic(e.target.value)}
                        />
                    </Col>
                    <Col>
                        <Button onClick={createQuery}>
                            Rechercher
                        </Button>
                    </Col>
                </Row>
            </Container>
            <br />
            <hr />
        </section>
    )
}
