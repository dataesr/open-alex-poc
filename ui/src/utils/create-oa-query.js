function createOAQuery({ affiliationOne, affiliationTwo, startDate, endDate, thematic, onSample, sampleLength }) {
  const { query: affiliation1Str, type: affiliation1Type } = affiliationOne;
  const { query: affiliation2Str, type: affiliation2Type } = affiliationTwo;

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

  return q
}