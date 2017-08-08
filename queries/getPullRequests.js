module.exports = `
  query getPullRequests($owner: String!, $name: String!, $first: Int!, $last: Int!){
    repository(owner: $owner, name: $name) {
      name
      pullRequests(last: $last, states:[OPEN]) {
        edges {
          node {
            title
            reviewRequests(first: $first) {
              edges {
                node {
                  reviewer {
                    name
                  }
                }
              }
            }
            assignees(first: $first) {
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
