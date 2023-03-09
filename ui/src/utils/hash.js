function isLiteralObject(o) {
  return (!!o) && (o.constructor === Object);
};

function getSortedObject(o) {
  return Object.keys(o)
    .sort()
    .reduce((result, key) => ({ ...result, [key]: o[key] }), {});
};

function replacer(_, value) {
  return isLiteralObject(value) ? getSortedObject(value) : value
};

export function hashQuery(query) {
  return JSON.stringify(query, replacer)
}
