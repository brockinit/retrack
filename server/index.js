const express = require('express');
const passport = require('passport');
const bodyParser = require('body-parser');
const handlebars = require('express-handlebars');
const GitHubStrategy = require('passport-github2').Strategy;
const pullRequests = require('../pullRequests');
const {
  CLIENT_SECRET,
  CLIENT_ID,
  GRAPHQL_ENDPOINT,
  SERVER_PORT,
  CALLBACK_URL,
} = process.env;

const app = express();
let token;

const hbs = handlebars.create({
  extname: 'hbs',
  defaultLayout: 'app',
});

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(passport.session());

// Auth Flow
passport.serializeUser((user, done) => {
  done(null, user);
});
passport.deserializeUser((obj, done) => {
  done(null, obj);
});
passport.use(
  new GitHubStrategy(
    {
      clientID: CLIENT_ID,
      clientSecret: CLIENT_SECRET,
      callbackURL: CALLBACK_URL,
    },
    (accessToken, refreshToken, profile, done) => {
      token = accessToken;
      return done(null, accessToken);
    }
  )
);
app.get(
  '/auth/github',
  passport.authenticate('github', { scope: ['repo', 'admin:org'] })
);
app.get(
  '/auth/github/callback',
  passport.authenticate('github', { failureRedirect: '/' }),
  (req, res) => {
    res.redirect('/pull-requests');
  }
);

// /pull-requests
app.use(
  '/pull-requests',
  (req, res, next) => {
    req.accessToken = token;
    next();
  },
  pullRequests.handler
);

app.listen(SERVER_PORT, () => {
  console.log(`Server listening on port ${SERVER_PORT}`);
});
