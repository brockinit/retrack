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
          author: {
            username: author.login,
            avatar: author.avatarUrl,
          },
          reviewers: reviewRequests.edges.map(({ node }) => ({
            username: node.reviewer.login,
            avatar: author.avatarUrl,
          })),
        };
      }
    ),
  };
};
