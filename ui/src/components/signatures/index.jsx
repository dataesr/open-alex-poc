import { Badge } from "@dataesr/react-dsfr";
import React from "react";

const SIGNATURE_TOP_SIZE = 10;

// institution.display_name

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

// perimeter has to be one of ["affiliationOne", "affiliationTwo", "affiliationThree"]
const Signatures = ({ dataLoaded, perimeter }) => {
  let signatures= [];
  const condition = 
  dataLoaded.filter((work) => work?.doi).forEach((work) => {
    work.authorships.forEach((authorship) => {
      if (isAuthorshipInPerimeter(authorship, perimeter)) {
        // TODO, can be improve by removing ", ***" ou "[***]"
        const affiliations = authorship.raw_affiliation_string.split(';')
          .map((affiliation) => affiliation.trim())
          .filter((affilition) => affilition.length > 0);
        affiliations.forEach((affiliation) => {
          if (!signatures?.find((item) => item.name === affiliation)) {
            signatures?.push({ name: affiliation, dois: [] });
          }
          signatures?.find((item) => item.name === affiliation).dois.push(work.doi);
        });
      };
    });
  });
  signatures.sort((a, b) => b.dois.length - a.dois.length);
  signatures = signatures.slice(0, SIGNATURE_TOP_SIZE);

  return (
    <>
      <ol>
        {signatures.map((signature, index) => (
          <li key={index}>
            {signature.name} <Badge text={signature.dois.length} />
          </li>
        ))}

      </ol>
    </>
  )
}

export default Signatures;
