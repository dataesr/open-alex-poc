import React from "react";

import data from "../../../data/huawei_france.json";
import enrichWorksAuthorships from '../../utils/enrich'

const Signatures = () => {
  const filters = {
    affiliationOne: { type: "raw_affiliation_string", query: 'Huawei' },
  };
  const enrichedData = enrichWorksAuthorships(data.results, filters);
  const authorsAffiliationOne = [];
  enrichedData.forEach((work) => {
    work.authorships.forEach((author) => {
      if (author.isAffiliationOne) authorsAffiliationOne.push(author)
    })
  })
  const signatures = authorsAffiliationOne.reduce((accumulator, author) => accumulator.concat([author.raw_affiliation_string]), []);
  const uniqSignatures = [...new Set(signatures)];

  return (
    <>
      <div>Signatures</div>
      {uniqSignatures.map((signature) => (
        <div>
          {signature}
        </div>
      ))}
    </>
  )
}

export default Signatures;
