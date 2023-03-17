import { useState } from 'react';
import PropTypes from 'prop-types';
import { Container, TextInput, Row, Col, Button, Select, Checkbox, Accordion, AccordionItem, ButtonGroup } from '@dataesr/react-dsfr';
import countriesList from '../assets/countriesList.json';

const DEFAULT_SAMPLE_SIZE = 1000;
const THIS_YEAR = new Date().getFullYear();
const TYPE_OPTIONS = [
  { label: 'Raw affiliation contains', value: 'raw_affiliation_string.search' },
  { label: 'Country (from parsed institution)', value: 'institutions.country_code' },
  { label: 'RoR (from parsed institution)', value: 'institutions.ror' },
];
const DEFAULT_TYPE_OPTION_INDEX = 0;

function makeQueryStringSearchable(str) {
  if (!str) return null;
  return str
    .replaceAll(',', ' ')
    .replace(/  +/g, ' ')
    .toLowerCase()
    .trim();
}

export default function Filters({ onSearch, includeSampleOption, defaultStartYear }) {
  const [startDate, setStartDate] = useState(defaultStartYear);
  const [endDate, setEndDate] = useState(THIS_YEAR);
  const [affiliation1Type, setAffiliation1Type] = useState(TYPE_OPTIONS[DEFAULT_TYPE_OPTION_INDEX]?.value);
  const [affiliation1Str, setAffiliation1Str] = useState(undefined);
  const [affiliation2Type, setAffiliation2Type] = useState(TYPE_OPTIONS[DEFAULT_TYPE_OPTION_INDEX]?.value);
  const [affiliation2Str, setAffiliation2Str] = useState(undefined);
  const [thematic, setThematic] = useState(undefined);
  const [onSample, setOnSample] = useState(true);
  const [sampleLength, setSampleLength] = useState(DEFAULT_SAMPLE_SIZE);

  const handleSearch = () => {
    const filters = {
      affiliationOne: { type: affiliation1Type, query: makeQueryStringSearchable(affiliation1Str) },
      affiliationTwo: { type: affiliation2Type, query: makeQueryStringSearchable(affiliation2Str) },
      startDate,
      endDate,
      thematic,
    };
    if (includeSampleOption) {
      filters.onSample = onSample;
      filters.sampleLength = sampleLength;
    }
    onSearch(filters);
  };
  const hintRawAff = "For raw affiliations, the text input will be searched in the affiliations signatures, as they harvested by OpenAlex. This a raw text field, without normalization, before OpenAlex affiliation parsing happens. Searching for 'Massachusetts Institute of Technology' or for 'MIT, USA' will output different results.";
  const hintRoRAff = 'Input a RoR id. It will look up works that OpenAlex affiliation parsing algorithm matched to this RoR.';
  const hintCountryAff = 'Choose a country. It will look up works that OpenAlex affiliation parsing algorithm matched to this country.';
  return (
    <section className="fr-mt-1w">
      <Container>
        <Row gutters className="fr-my-2w" alignItems="bottom">
          <Col n="3">
            <Select
              label="Signature search type"
              id="affiliation1_type"
              onChange={(e) => [setAffiliation1Type(e.target.value), setAffiliation1Str(undefined)]}
              options={TYPE_OPTIONS}
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
                  onChange={(e) => setAffiliation1Str(e.target.value)}
                  options={countriesList.map((el) => ({ label: el.name, value: el.code }))}
                  selected={affiliation1Str}
                  hint={hintCountryAff}
                />
              ) : (
                <TextInput
                  required
                  label="Value"
                  name="affiliation1_str"
                  value={affiliation1Str}
                  onChange={(e) => setAffiliation1Str(e.target.value)}
                  withAutoValidation
                  hint={(affiliation1Type === 'raw_affiliation_string.search') ? hintRawAff : hintRoRAff}
                />
              )
            }
          </Col>
          <Col n="3">
            <ButtonGroup>
              <Button className="fr-my-0" disabled={!affiliation1Str} onClick={handleSearch} icon="ri-search-line">
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
                  onChange={(e) => [setAffiliation2Type(e.target.value), setAffiliation2Str(undefined)]}
                  options={TYPE_OPTIONS}
                  selected={affiliation2Type}
                />
              </Col>
              <Col n="9">
                {
                  (affiliation2Type === 'institutions.country_code') ? (
                    <Select
                      label="Value"
                      id="affiliation2ISO"
                      onChange={(e) => setAffiliation2Str(e.target.value)}
                      options={countriesList.map((el) => ({ label: el.name, value: el.code }))}
                      selected={affiliation2Str}
                      hint={hintCountryAff}
                    />
                  ) : (
                    <TextInput
                      label="Value"
                      name="affiliation2_str"
                      value={affiliation2Str}
                      onChange={(e) => setAffiliation2Str(e.target.value)}
                      hint={(affiliation2Type === 'raw_affiliation_string.search') ? hintRawAff : hintRoRAff}
                    />
                  )
                }
              </Col>
            </Row>
          </AccordionItem>
          <AccordionItem title="More options">
            <Row gutters>
              <Col n="12 md-8">
                <Row className="fr-mb-2w" gutters alignItems="bottom">
                  <Col n="12">
                    <TextInput
                      name="thematic"
                      value={thematic}
                      label="Research field"
                      hint="Any query that must appear in the scholarly paper (title, abstract, full-text). Useful to filter works for specific keyword search"
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
                      max={THIS_YEAR}
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
                      max={THIS_YEAR}
                      onChange={(e) => setEndDate(e.target.value)}
                      hint="(empty = max)"
                    />
                  </Col>
                </Row>
                {includeSampleOption && (
                  <Row gutters alignItems="bottom">
                    <Col n="6">
                      <TextInput
                        label="Sample size"
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
                )}
              </Col>
            </Row>
          </AccordionItem>
        </Accordion>
      </Container>
      <br />
    </section>
  );
}
Filters.defaultProps = {
  includeSampleOption: false,
};

Filters.propTypes = {
  defaultStartYear: PropTypes.number.isRequired,
  includeSampleOption: PropTypes.bool,
  onSearch: PropTypes.func.isRequired,
};
