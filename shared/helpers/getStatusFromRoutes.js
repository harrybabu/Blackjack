/**
 * Return the status code from the last matched route with a status property.
 *
 * @param matchedRoutes
 * @returns {Number|null}
 */
export default (matchedRoutes) => {
  console.log("MR:"+matchedRoutes);
  return matchedRoutes.reduce((prev, cur) => cur.status || prev, null);
};
