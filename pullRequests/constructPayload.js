const moment = require('moment');
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
      ({ updatedAt, author, title, reviewRequests, createdAt }) => {
        return {
          title,
          updatedAt: moment(updatedAt).format('LL'),
          createdAt: moment(createdAt).format('LL'),
          author: {
            username: author.login,
            avatar: author.avatarUrl,
          },
          reviewers: reviewRequests.edges.map(({ node }) => ({
            username: node.reviewer.login,
            avatar: node.reviewer.avatarUrl,
          })),
        };
      }
    ),
  };
};
