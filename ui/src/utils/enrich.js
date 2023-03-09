function normalize(string) {
  return string
    .normalize('NFD')
    .replace(/[\p{S}\p{M}/p{Zl}]/gu, '')
    .replace(/[\p{P}]/gu, ' ')
    .replace(/  +/g, ' ')
    .toLowerCase()
    .trim()
}

function isInputInAffiliation(query, affiliation) {
  if (!query || !affiliation) return false;
  const queryTokens = normalize(query).split(' ');
  const affiliationTokens = normalize(affiliation).split(' ');
  return queryTokens.every((token) => affiliationTokens.includes(token))
}

function isInAuthorship(input, authorship) {
  const { type, query } = input;
  const field = [...type.split('.')].pop();
  if (!field || !query) return false;
  if (field === 'raw_affiliation_string') return isInputInAffiliation(query, authorship['raw_affiliation_string']);
  if (!authorship?.institutions?.length) return false;
  return (authorship.institutions
    .map((institution) => isInputInAffiliation(query, institution[field]))
    .filter((e) => e)
    ?.length > 0);
}

function enrichWorksAuthorships(data, inputs) {
  return data.map((work) => {
    if (!work?.authorships?.length) return work;
    const enrichedAuthorships = work.authorships.map((authorship) => ({
      ...authorship,
      isAffiliationOne: isInAuthorship(inputs.affiliationOne, authorship),
      isAffiliationTwo: inputs?.affiliationTwo ? isInAuthorship(inputs.affiliationTwo, authorship) : null,
    }))
    return { ...work, authorships: enrichedAuthorships };
  })
}

export default enrichWorksAuthorships;
