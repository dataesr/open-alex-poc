import { Badge } from "@dataesr/react-dsfr";
import React from "react";

import dataJson from "../../../data/huawei_france.json";
import enrichWorksAuthorships from '../../utils/enrich'

const SIGNATURE_TOP_SIZE = 10;

const Signatures = ({ dataLoaded, filters }) => {
  let data = dataJson.results;
  if (dataLoaded && dataLoaded.length > 0) data = dataLoaded;
  const works = enrichWorksAuthorships(data, filters);

  let signatures = []
  works.filter((work) => work?.doi).forEach((work) => {
    work.authorships.forEach((authorship) => {
      if (authorship.isAffiliationOne) {
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
