const { GRAPHQL_ENDPOINT } = process.env;
const { GraphQLClient } = require('graphql-request');
/**
 * Query service that hits the GraphQL API and returns data
 *
 * @param query {String} - The GraphQL query string
 * @param variables {Object} - Variables to pass into the query string
 *
 * @return data {Object} - The data resulting from the query
 */
module.exports = (query, variables = {}, accessToken) => {
  const client = new GraphQLClient(GRAPHQL_ENDPOINT, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return client.request(query, variables);
};
