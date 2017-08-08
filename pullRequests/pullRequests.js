const express = require('express');
const constructPayload = require('./constructPayload');
const graphqlService = require('../graphqlService');
const { getPullRequests } = require('../queries');

const router = express.Router();

// For testing only, these will be dynamically generated later
const accountOwner = 'brockinit';
const repoName = 'tuition-yikes';

router.get('/', (req, res) => {
  graphqlService(
    getPullRequests,
    { owner: accountOwner, name: repoName },
    req.accessToken
  )
    .then(data => {
      const payload = data.repository.pullRequests.edges.map(constructPayload);
      res.json(payload);
    })
    .catch(err => {
      res.status(500).json({ error: err });
    });
});

module.exports = router;
