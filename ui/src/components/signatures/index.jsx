import { Badge } from "@dataesr/react-dsfr";
import React from "react";

import export2file from "../../utils/export";

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
}

// field can be "raw_affiliation" or "institution_name"
// perimeter has to be one of ["affiliationOne", "affiliationTwo", "affiliationThree"]
const Signatures = ({ dataLoaded, field, filters, perimeter }) => {
  const name = filters?.[perimeter]?.query || 'affiliationThree';
  const signatures= [];
  dataLoaded.filter((work) => work?.doi).forEach((work) => {
    work.authorships.forEach((authorship) => {
      if (isAuthorshipInPerimeter(authorship, perimeter)) {
        if (field === 'raw_affiliation') {
          // TODO, can be improve by removing ", ***" or "[***]" or "(***)" or "*** ()"
          const affiliations = authorship.raw_affiliation_string.split(';')
            .map((affiliation) => affiliation.trim())
            .filter((affilition) => affilition.length > 0);
          affiliations.forEach((affiliation) => {
            if (!signatures?.find((item) => item.name === affiliation)) {
              signatures?.push({ name: affiliation, dois: [] });
            }
            signatures?.find((item) => item.name === affiliation).dois.push(work.doi);
          });
        } else if (field === 'institution_name') {
          const affiliations = authorship.institutions
            .map((institution) => institution.display_name.trim())
            .filter((affilition) => affilition.length > 0)
          affiliations.forEach((affiliation) => {
            if (!signatures?.find((item) => item.name === affiliation)) {
              signatures?.push({ name: affiliation, dois: [] });
            }
            signatures?.find((item) => item.name === affiliation).dois.push(work.doi);
          });
        }
      };
    });
  });
  signatures.sort((a, b) => b.dois.length - a.dois.length);

  return (
    <>
      <div>
        {export2file({ data: signatures, filename: `export_openalex_${field}_${name}.csv`, type: 'csv' })}
      </div>
      <ol>
        {signatures.slice(0, SIGNATURE_TOP_SIZE).map((signature, index) => (
          <li key={index}>
            {signature.name} <Badge text={signature.dois.length} />
          </li>
        ))}
      </ol>
    </>
  )
}

export default Signatures;
