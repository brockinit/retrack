const express = require('express');
const constructPayload = require('./constructPayload');
const graphqlService = require('../graphqlService');
const { getPullRequests } = require('../queries');

const router = express.Router();

const queryVars = {
  first: 6,
  login: 'sudokrew',
  field: 'PUSHED_AT',
  direction: 'DESC',
};

router.get('/', (req, res) => {
  graphqlService(getPullRequests, queryVars, req.accessToken)
    .then(data => {
      const activeRepos = data.organization.repositories.nodes
        .filter(({ pullRequests }) => pullRequests.nodes.length !== 0)
        .map(constructPayload);
      res.render(
        'pullRequests',
        Object.assign(
          {},
          {
            layout: 'app',
            activeRepos,
            pageTitle: 'Pull Requests',
          }
        )
      );
    })
    .catch(err => {
      res.redirect('/auth/github');
    });
});

module.exports = router;
