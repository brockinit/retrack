module.exports = `
  query getPullRequests($owner: String!, $name: String!){
    repository(owner: $owner, name: $name) {
      name
      pullRequests(last: 10, states:[OPEN]) {
        edges {
          node {
            title
            reviewRequests(first:2) {
              edges {
                node {
                  reviewer {
                    name
                  }
                }
              }
            }
            assignees(first: 2) {
              edges {
                node {
                  name
                }
              }
            }
          }
        }
      }
    }
  }
`;
