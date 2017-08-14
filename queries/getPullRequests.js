module.exports = `
query getPullRequests($login: String!, $first: Int!, $field: RepositoryOrderField!, $direction: OrderDirection!){
  organization(login: $login) {
    id
    repositories(first: $first, orderBy: {field: $field, direction: $direction}) {
      nodes {
        name
        pullRequests(first: 10, states:[OPEN]) {
          nodes {
            number
            url
            createdAt
            updatedAt
            author {
              login
              avatarUrl
            }
            reviewRequests(first: 2) {
              edges {
                node {
                  reviewer {
                    login
                    avatarUrl
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
