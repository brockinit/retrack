module.exports = `
query getPullRequests($login: String!){
  organization(login: $login) {
    id
    repositories(first: 5, orderBy: {field: UPDATED_AT, direction: DESC}) {
      nodes {
        name
        pullRequests(first: 5, states:[OPEN]) {
          nodes {
            createdAt
            updatedAt
            author {
              login
            }
            reviewRequests(first: 2) {
              edges {
                node {
                  reviewer {
                    name
                  }
                }
              }
            }
            title
          }
        }
      }
    }
  }
}
`;
