const express = require('express');
const constructPayload = require('./constructPayload');
const graphqlService = require('../graphqlService');
const { getPullRequests } = require('../queries');

const router = express.Router();

// For testing only, this will be dynamically generated later
const organization = 'sudokrew';

router.get('/', (req, res) => {
  graphqlService(
    getPullRequests,
    { first: 5, login: organization, field: 'UPDATED_AT', direction: 'DESC' },
    req.accessToken
  )
    .then(data => {
      console.log('data', data.organization.repositories.nodes);
      const activeRepos = data.organization.repositories.nodes.filter(
        ({ pullRequests }) => pullRequests.nodes.length !== 0
      );
      // .map(constructPayload);
      console.log('activeRepos', activeRepos);
      res.json(activeRepos);
    })
    .catch(err => {
      console.log('err', err);
      res.status(500).json({ error: err });
    });
});

module.exports = router;
