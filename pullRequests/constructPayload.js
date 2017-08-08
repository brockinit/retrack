/*
 * Constructs the pullRequest payload
 *
 * @param pullRequest {Object} - The pullRequest objects
 * @returns {Object} - The formatted pullRequest payload
*/
module.exports = pullRequest => {
  return {
    title: pullRequest.node.title,
    assignees: pullRequest.node.assignees.edges,
    reviewers: pullRequest.node.reviewRequests.edges,
  };
};
