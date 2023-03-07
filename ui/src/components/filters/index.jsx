import { Container, TextInput, Row, Col, Button, Select, Checkbox } from "@dataesr/react-dsfr";
import { useState } from "react";

export default function Filters({ onSetFiltersHandler }) {
    const [startDate, setStartDate] = useState(2016);
    const [endDate, setEndDate] = useState(2022);

    const types = ["raw_affiliation_string", "nstitutions.country_code"];
    const [affiliation1Type, setAffiliation1Type] = useState(types[0]);
    const [affiliation1Str, setAffiliation1Str] = useState(null);
    const [affiliation2Type, setAffiliation2Type] = useState(types[0]);
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

        if ((startDate || endDate) && affiliation1Str) q += ',';
        if (affiliation1Type === types[0] && affiliation1Str) q += 'raw_affiliation_string.search:' + affiliation1Str;

        if ((startDate || endDate) && affiliation2Str) q += ',';
        if (affiliation2Type === types[0] && affiliation2Str) q += 'raw_affiliation_string.search:' + affiliation2Str;

        if (onSample) q += '&sample=' + sampleLength;

        if (thematic) q += '&search=' + thematic;

        console.log('create query');
        // https://api.openalex.org/works?filter=publication_year:2016-,raw_affiliation_string.search:Huawei,raw_affiliation_string.search:france&sample=1000&seed=0
        setQuery(q);
        onSetFiltersHandler(q);
    }

    return (
        <section>
            <Container>
                <Row gutters>
                    <Col n="6">
                        <TextInput
                            name="startDateInput"
                            value={startDate} label="Date de début"
                            maxLength="4"
                            onChange={(e) => setStartDate(e.target.value)}
                        />
                    </Col>
                    <Col n="6">
                        <TextInput
                            name="endDateInput"
                            value={endDate}
                            label="Date de fin"
                            maxLength="4"
                            onChange={(e) => setEndDate(e.target.value)}
                        />
                    </Col>
                </Row>
                <Row gutters>
                    <Col n="6">
                        <Select
                            label="affiliation1_type"
                            id="affiliation1_type"
                            onChange={(e) => setAffiliation1Type(e.target.value)}
                            options={types.map((el) => ({ label: el, name: el }))}
                            selected={affiliation1Type}
                        />
                    </Col>
                    <Col n="6">
                        <TextInput
                            name="affiliation1_str"
                            value={affiliation1Str}
                            label="affiliation1_str"
                            onChange={(e) => setAffiliation1Str(e.target.value)}
                        />
                    </Col>
                </Row>
                <Row gutters>
                    <Col n="6">
                        <Select
                            label="affiliation2_type"
                            id="affiliation2_type"
                            onChange={(e) => setAffiliation2Type(e.target.value)}
                            options={types.map((el) => ({ label: el, name: el }))}
                            selected={affiliation2Type}
                        />
                    </Col>
                    <Col n="6">
                        <TextInput
                            name="affiliation2_str"
                            value={affiliation2Str}
                            label="affiliation2_str"
                            onChange={(e) => setAffiliation2Str(e.target.value)}
                        />
                    </Col>
                </Row>
                <Row gutters>
                    <Col n="6">
                        <TextInput
                            name="thematic"
                            value={thematic}
                            label="Thematic"
                            onChange={(e) => setThematic(e.target.value)}
                        />
                    </Col>
                    <Col n="3">
                        <Checkbox label="Search on sample" checked={onSample} onChange={() => setOnSample(!onSample)} />
                        <TextInput
                            name="sampleLength"
                            value={sampleLength}
                            onChange={(e) => setSampleLength(e.target.value)}
                            disabled={!onSample}
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
            {/* {query} */}
        </section>
    )
}