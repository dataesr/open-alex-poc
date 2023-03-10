import { useState } from "react";
import { Container, TextInput, Row, Col, Button, Select, Checkbox, Icon, Title, Accordion, AccordionItem } from "@dataesr/react-dsfr";
import countriesList from '../../assets/countriesList.json';

export default function Filters({ onSetFiltersHandler }) {
    const [startDate, setStartDate] = useState(2016);
    const [endDate, setEndDate] = useState(2022);

    const typesOptions = [
        { label: "Raw affiliation contains", value: "raw_affiliation_string.search"}, 
        { label: "Country (from parsed institution)", value: "institutions.country_code"}, 
        { label: "RoR (from pared institution)", value: "institutions.ror"}
    ] 
    const [affiliation1Type, setAffiliation1Type] = useState(typesOptions[0]?.value);
    const [affiliation1ISO, setAffiliation1ISO] = useState(null);
    const [affiliation1Str, setAffiliation1Str] = useState(null);

    const [affiliation2Type, setAffiliation2Type] = useState(typesOptions[0]?.value);
    const [affiliation2ISO, setAffiliation2ISO] = useState(null);
    const [affiliation2Str, setAffiliation2Str] = useState(null);

    const [thematic, setThematic] = useState(null);

    const [onSample, setOnSample] = useState(true);
    const [sampleLength, setSampleLength] = useState(1000);

    const handleSearch = () => onSetFiltersHandler({
        affiliationOne: { type: affiliation1Type, query: (affiliation1Type === 'institutions.country_code') ? affiliation1ISO : affiliation1Str },
        affiliationTwo: { type: affiliation2Type, query: (affiliation2Type === 'institutions.country_code') ? affiliation2ISO : affiliation2Str },
        startDate,
        endDate,
        thematic,
        onSample,
        sampleLength,
    })

    return (
        <section className="fr-mt-1w">
            <Container>
                <Row gutters className='fr-my-2w' alignItems="bottom">
                    <Col n="12">
                        <Title as="h2" className="fr-mb-0">
                            <Icon name="ri-filter-2-fill" />
                            Which affiliation to analyze ?
                        </Title>
                    </Col>
                    <Col n="3">
                        <Select
                            label="Affiliation search type"
                            id="affiliation1_type"
                            onChange={(e) => [setAffiliation1Type(e.target.value), setAffiliation1Str(null)]}
                            options={typesOptions}
                            selected={affiliation1Type}
                        />
                    </Col>
                    <Col n="9">
                        {
                            (affiliation1Type === 'institutions.country_code') ? (
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
                </Row>
                <Accordion keepOpen>
                    <AccordionItem
                        initExpand={false}
                        title="In collaboration with ? (optional)"
                    >
                        <Row gutters>
                            <Col n="3">
                                <Select
                                    label="Affiliation search type"
                                    id="affiliation2_type"
                                    onChange={(e) => [setAffiliation2Type(e.target.value), setAffiliation2Str(null)]}
                                    options={typesOptions}
                                    selected={affiliation2Type}
                                />
                            </Col>
                            <Col n="9">
                                {
                                    (affiliation2Type === "institutions.country_code") ? (
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
                    </AccordionItem>
                    <AccordionItem title="more options">
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
                                    label="End year"
                                    maxLength="4"
                                    onChange={(e) => setEndDate(e.target.value)}
                                    hint="(empty = max)"
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
                            <Col n="2">
                                <Checkbox label="Random sampling " checked={onSample} onChange={() => setOnSample(!onSample)} />
                            </Col>
                            <Col n="2">
                                <TextInput
                                    label='size'
                                    name="sampleLength"
                                    value={sampleLength}
                                    onChange={(e) => setSampleLength(e.target.value)}
                                    disabled={!onSample}
                                />
                            </Col>
                        </Row>
                    </AccordionItem>
                </Accordion>

                <Row gutters>
                    <Col n="12" className="fr-pt-3w">
                        <div style={{ textAlign: 'right' }}>
                            <Button onClick={handleSearch} icon="ri-search-line">
                                Search
                            </Button>
                        </div>
                    </Col>
                </Row>
            </Container>
            <br />
        </section>
    )
}
