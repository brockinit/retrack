/*
 * Constructs the pullRequest payload
 *
 * @param pullRequest {Object} - The pullRequest objects
 * @returns {Object} - The formatted pullRequest payload
*/
module.exports = ({ pullRequests, name }) => {
  return {
    name,
    pullRequests: pullRequests.nodes.map(
      ({ updatedAt, author, title, reviewRequests }) => {
        return {
          title,
          updatedAt,
          author: author.login,
          reviewers: reviewRequests.edges.map(({ node }) => node.reviewer.name),
        };
      }
    ),
  };
};
