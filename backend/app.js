let express = require('express');
let pg = require('pg');
let pgConfig = {
  user: 'postgres',
  password: 'Password1',
  database: 'isense',
  port: 5432,
  host: 'localhost'
};
let pgClient = new pg.Client(pgConfig);

pgClient.connect(function(err) {
  if (err) {
    return console.error('could not connect to postgres', err);
  }
});

let app = express();
let port = process.env.PORT || 3001;

app.listen(port);

console.log('Listening on port ' + port);

let router = express.Router({strict: app.get('strict routing')});

router.use(function(req, res, next) {
  if (req.headers.origin && req.headers.origin.indexOf('localhost') > -1) {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
  } else if (
      req.headers.origin &&
      req.headers.origin.indexOf('dev.isenseproject.org') > -1) {
    res.header('Access-Control-Allow-Origin', 'https://dev.isenseproject.org');
  } else {
    res.header('Access-Control-Allow-Origin', 'https://isenseproject.org');
  }
  next();
});