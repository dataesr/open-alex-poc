import PropTypes from 'prop-types';
import { Badge, Icon, Row, Title } from '@dataesr/react-dsfr';
import Button from './button';
import export2csv from '../utils/export';

const SIGNATURE_TOP_SIZE = 10;

const isAuthorshipInPerimeter = (authorship, perimeter) => {
  let condition;
  switch (perimeter) {
  case 'affiliationOne':
    condition = authorship.isAffiliationOne;
    break;
  case 'affiliationTwo':
    condition = authorship.isAffiliationTwo;
    break;
  case 'affiliationThree':
    condition = !authorship.isAffiliationOne && !authorship.isAffiliationOne;
    break;
  default:
    condition = false;
  }
  return !!condition;
};

// field can be "raw_affiliation" or "institution_name"
// perimeter has to be one of ["affiliationOne", "affiliationTwo", "affiliationThree"]
export default function Signatures({ data, field, filters, perimeter }) {
  const name = filters?.[perimeter]?.query || 'affiliationThree';
  const signatures = [];
  const allSignatures = [];
  data.filter((work) => work?.doi).forEach((work) => {
    work.authorships.forEach((authorship) => {
      if (isAuthorshipInPerimeter(authorship, perimeter)) {
        let affiliations = [];
        if (field === 'raw_affiliation') {
          // TODO, can be improve by removing ", ***" or "[***]" or "(***)" or "*** ()"
          affiliations = authorship.raw_affiliation_string.split(';')
            .map((affiliation) => affiliation.trim());
        } else if (field === 'institution_name') {
          affiliations = authorship.institutions
            .map((institution) => institution?.display_name?.trim());
        }
        affiliations.filter((affilition) => affilition?.length > 0).forEach((affiliation) => {
          if (!signatures?.find((item) => item.name === affiliation)) {
            signatures?.push({ name: affiliation, dois: [] });
          }
          signatures?.find((item) => item.name === affiliation).dois.push(work.doi);
          allSignatures.push({ signature: affiliation, doi: work.doi });
        });
      }
    });
  });
  signatures.sort((a, b) => b.dois.length - a.dois.length);

  return (
    <>
      <Row alignItems="middle">
        <Icon size="lg" name="ri-file-list-line" />
        <Title as="h2" look="h5" className="fr-mb-0">
          {(field === 'raw_affiliation') ? 'Top 10 raw signatures' : 'Top 10 matched institutions'}
        </Title>
        <Button
          title="Export data to csv file"
          className="fr-ml-1w"
          rounded
          tertiary
          borderless
          icon="ri-download-line"
          onClick={() => export2csv({ data: allSignatures, filename: `export_openalex_${field}_${name}.csv` })}
        >
          Export to csv
        </Button>
      </Row>
      <ol>
        {signatures.slice(0, SIGNATURE_TOP_SIZE).map((signature, index) => (
          <li key={index}>
            {signature.name}
            {' '}
            <Badge text={signature.dois.length} />
          </li>
        ))}
      </ol>
    </>
  );
}

Signatures.propTypes = {
  data: PropTypes.array.isRequired,
  field: PropTypes.string.isRequired,
  filters: PropTypes.shape.isRequired,
  perimeter: PropTypes.oneOf(['affiliationOne', 'affiliationTwo', 'affiliationThree']).isRequired,
};
