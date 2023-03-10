const OA_API_ENDPOINT = 'https://api.openalex.org/works';

export function createOAQuery({ affiliationOne = {}, affiliationTwo = {}, startDate, endDate, thematic, onSample = true, sampleLength = 1000 }) {
  const { query: affiliation1Str, type: affiliation1Type } = affiliationOne;
  const { query: affiliation2Str, type: affiliation2Type } = affiliationTwo;

  let q = '';
  if (startDate || endDate) q += 'publication_year:';
  if (startDate) q += startDate + '-';
  if (endDate && !startDate) q += '-' + endDate;
  if (endDate && startDate) q += endDate;
  if (startDate || endDate) q += ',';
  if (affiliation1Type && affiliation1Str) q += `${affiliation1Type}:${affiliation1Str}`;
  if (affiliation2Type && affiliation2Str) q += `,${affiliation2Type}:${affiliation2Str}`;
  if (onSample) q += '&seed=0&sample=' + sampleLength;
  if (thematic) q += '&search=' + thematic;
  console.log("Query = ", q);
  return `${OA_API_ENDPOINT}?filter=${q}`;
}