function normalize(string) {
  return string
    .normalize('NFD')
    .replace(/[\p{S}\p{M}/p{Zl}]/gu, '')
    .replace(/[\p{P}]/gu, ' ')
    .replace(/  +/g, ' ')
    .toLowerCase()
    .trim()
}

function isInAffiliation(query, affiliation) {
  if (!query || !affiliation) return false;
  const queryTokens = normalize(query).split(' ');
  const affiliationTokens = normalize(affiliation).split(' ');
  return queryTokens.every((token) => affiliationTokens.includes(token))
}

function isInAuthorship(filter, authorship) {
  if (!filter) return false;
  const { type, query } = filter;
  const field = [...type.split('.')].pop();
  if (!field || !query) return false;
  if (field === 'search') return isInAffiliation(query, authorship['raw_affiliation_string']);
  if (!authorship?.institutions?.length) return false;
  return (authorship.institutions
    .map((institution) => isInAffiliation(query, institution[field]))
    .filter((e) => e)
    ?.length > 0);
}

function enrichWorksAuthorships(data, filters) {
  if (!filters) return data;
  return data.map((work) => {
    if (!work?.authorships?.length) return work;
    const enrichedAuthorships = work.authorships.map((authorship) => ({
      ...authorship,
      isAffiliationOne: isInAuthorship(filters?.affiliationOne, authorship),
      isAffiliationTwo: filters?.affiliationTwo ? isInAuthorship(filters?.affiliationTwo, authorship) : false,
    }))
    return { ...work, authorships: enrichedAuthorships };
  })
}

export default enrichWorksAuthorships;
