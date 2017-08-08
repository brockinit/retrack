const express = require('express');
const passport = require('passport');
const bodyParser = require('body-parser');
const handlebars = require('express-handlebars');
const session = require('express-session');
const pullRequests = require('./pullRequests');
const GitHubStrategy = require('passport-github2').Strategy;
const {
  CLIENT_SECRET,
  CLIENT_ID,
  GRAPHQL_ENDPOINT,
  SERVER_PORT,
  CALLBACK_URL,
} = process.env;

const app = express();
const hbs = handlebars.create({
  extname: 'hbs',
  defaultLayout: 'app',
});
let token;

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(passport.session());

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
  passport.authenticate('github', { scope: ['user:email'] })
);

app.get(
  '/auth/github/callback',
  passport.authenticate('github', { failureRedirect: '/' }),
  (req, res) => {
    res.redirect('/pull-requests');
  }
);

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

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/');
}
