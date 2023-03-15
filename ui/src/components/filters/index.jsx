import { useState } from "react";
import { Container, TextInput, Row, Col, Button, Select, Checkbox, Accordion, AccordionItem, ButtonGroup, Text } from "@dataesr/react-dsfr";
import countriesList from '../../assets/countriesList.json';

const thisYear = new Date().getFullYear();

export default function Filters({ onSetFiltersHandler }) {
  const [startDate, setStartDate] = useState(2000);
  const [endDate, setEndDate] = useState(2023);

  const typesOptions = [
    { label: "Raw affiliation contains", value: "raw_affiliation_string.search" },
    { label: "Country (from parsed institution)", value: "institutions.country_code", disabled: true },
    { label: "RoR (from parsed institution)", value: "institutions.ror", disabled: true }
  ]
  const [affiliation1Type, setAffiliation1Type] = useState(typesOptions[0]?.value);
  const [affiliation1ISO, setAffiliation1ISO] = useState(undefined);
  const [affiliation1Str, setAffiliation1Str] = useState(undefined);

  const [affiliation2Type, setAffiliation2Type] = useState(typesOptions[0]?.value);
  const [affiliation2ISO, setAffiliation2ISO] = useState(undefined);
  const [affiliation2Str, setAffiliation2Str] = useState(undefined);

  const [thematic, setThematic] = useState(undefined);

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
                    <Col n="3">
                        <Select
                            label="Signature search type"
                            id="affiliation1_type"
                            onChange={(e) => [setAffiliation1Type(e.target.value), setAffiliation1Str(null)]}
                            options={typesOptions}
                            selected={affiliation1Type}
                        />
                    </Col>
                    <Col n="6">
                        {
                            (affiliation1Type === 'institutions.country_code') ? (
                                <Select
                                    required
                                    label="Value"
                                    id="affiliation1ISO"
                                    onChange={(e) => setAffiliation1ISO(e.target.value)}
                                    options={countriesList.map((el) => ({ label: el.name, value: el.code }))}
                                    selected={affiliation1ISO}
                                />
                            ) : (
                                <TextInput
                                    required
                                    label="Value"
                                    name="affiliation1_str"
                                    value={affiliation1Str}
                                    onChange={(e) => setAffiliation1Str(e.target.value)}
                                    withAutoValidation
                                />
                            )
                        }
                    </Col>
                    <Col n="3">
                    <ButtonGroup>

                    <Button className="fr-my-0" disabled={!affiliation1Str && !affiliation1ISO} onClick={handleSearch} icon="ri-search-line">
                        Search
                    </Button>
                    </ButtonGroup>
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
                        <Row gutters>
                            <Col n="12 md-8">
                                <Row className="fr-mb-2w" gutters alignItems="bottom">
                                    <Col n="12">
                                        <TextInput
                                            name="thematic"
                                            value={thematic}
                                            label="Research field"
                                            hint="Any query that must appear in the scholarly paper. Usefull to filter works for specific research field or thematics"
                                            onChange={(e) => setThematic(e.target.value)}
                                        />
                                    </Col>
                                </Row>
                                <Row className="fr-mb-2w" gutters alignItems="bottom">
                                    <Col n="6">
                                        <TextInput
                                            name="startDateInput"
                                            value={startDate}
                                            label="First year of publication"
                                            type="number"
                                            min={2010}
                                            max={thisYear}
                                            onChange={(e) => setStartDate(e.target.value)}
                                        />
                                    </Col>
                                    <Col n="6">
                                        <TextInput
                                            name="endDateInput"
                                            value={endDate}
                                            label="Last year of publication"
                                            type="number"
                                            min={2010}
                                            max={thisYear}
                                            onChange={(e) => setEndDate(e.target.value)}
                                            hint="(empty = max)"
                                        />
                                    </Col>
                                </Row>
                                <Row gutters alignItems="bottom">
                                    <Col n="6">
                                        <TextInput
                                            label='Sample size'
                                            hint="Maximum is 10000"
                                            name="sampleLength"
                                            value={sampleLength}
                                            onChange={(e) => setSampleLength(e.target.value)}
                                            disabled={!onSample}
                                            required
                                            withAutoValidation
                                            type="number"
                                            min={100}
                                            max={10000}
                                            step={100}
                                        />
                                    </Col>
                                    <Col n="6">
                                        <Checkbox label="Use random sampling" checked={onSample} onChange={() => setOnSample(!onSample)} />
                                    </Col>
                                </Row>
                                
                            </Col>
                        </Row>
                    </AccordionItem>
                </Accordion>
      </Container>
      <br />
    </section>
  )
}
