const moment = require('moment');
/*
 * Constructs the pullRequest payload
 *
 * @param pullRequest {Object} - The pullRequest objects
 * @returns {Object} - The formatted pullRequest payload
*/

function getAgeColor(age) {
  const ageInDays = +age.split(' days ago').shift();

  if (ageInDays > 1 && ageInDays <= 3) {
    return 'middle-aged-pr';
  }
  if (ageInDays > 3) {
    return 'old-pr';
  }
  return 'new-pr';
}

module.exports = ({ pullRequests, name }) => {
  return {
    name,
    pullRequests: pullRequests.nodes.map(
      ({
        updatedAt,
        author,
        title,
        reviewRequests,
        createdAt,
        number,
        url,
      }) => {
        const opened = moment(createdAt).from(moment());
        return {
          title,
          number,
          url,
          updatedAt: moment(updatedAt).format('LL'),
          opened,
          ageColor: getAgeColor(opened),
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
