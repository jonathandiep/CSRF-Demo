var express = require('express');
var session = require('express-session');
var app = express();
var mysql = require('mysql');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var passport = require('passport');
var csrf = require('csurf');
var path = require('path');
var config = require('./config/config');

var connection = mysql.createConnection({
  host: config.host,
  user: config.user,
  password: config.password,
  database: config.mysqldb
});

connection.connect();

require('./config/passport')(passport);

var csrfProtection = csrf({ cookie: true });
var parseForm = bodyParser.urlencoded({ extended: false });

app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// configure app to handle CORS requests
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
  next();
});

// required for passport
app.use(session({
	secret: 'supersecrettosignsessionidcookie',
	resave: true,
	saveUninitialized: true
 } )); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions

app.use(express.static(`${__dirname}/public`));

// API routes
var apiRoutes = require('./app/api')(app);
app.use('/api', apiRoutes);

require('./app/routes')(app, passport);

app.get('/csrfToken', csrfProtection, (req, res) => {
  res.json({
    csrfToken: req.csrfToken()
  });
});

app.post('/send-v2', parseForm, csrfProtection, (req, res) => {
  var from = req.query.from;
  var to = req.query.to;
  var amount = Number(req.query.amount).toFixed(2);
  console.log(req.query);
  connection.query(`INSERT INTO Transaction (toAccount, fromAccount, amount) VALUES ('${to}', '${from}', ${amount});`, (err, rows) => {
    if (err) throw err;

    connection.query(`UPDATE Account SET money = money - ${amount} WHERE email = '${from}'`, (err, rows) => {
      if (err) throw err;

      connection.query(`UPDATE Account SET money = money + ${amount} WHERE email = '${to}';`, (err, rows) => {
        if (err) throw err;

      })
    })
  });
  res.send(`$${req.query.amount} sent to ${req.query.to}`);
});

// catchall route (send users to Angular frontend)
app.get('*', (req, res) => {
  res.sendFile(path.join(`${__dirname}/public/app/views/index.html`));
});

app.listen(config.port);
console.log(`Working on port ${config.port}`);
