var path = require('path');

module.exports = function(app, passport) {

  app.get('/', (req, res) => {
    res.sendFile(path.join(`${__dirname}/../public/app/views/index.html`));
  });

  app.post('/signup', passport.authenticate('local-signup'), (req, res) => {
    delete req.user.password;
    console.log(req.user);
    res.json(req.user);
  });

  app.post('/login', passport.authenticate('local-login'), (req, res) => {
    delete req.user.password;
    console.log(req.user);
    if (req.body.remember) {
      req.session.cookie.maxAge = 1000 * 60 * 3;
    } else {
      req.session.cookie.expires = false;
    }
    res.json(req.user);
  });

  app.get('/user', (req, res) => {
    if (req.user) {
      delete req.user.password;
      delete req.user.money;
      console.log(req.user);
      res.json(req.user);
    } else {
      res.send('user is not logged in');
    }

  });

  app.get('/logout', (req, res) => {
    req.logout();
    res.send('bye');
  });

};

// route middleware to make sure
function isLoggedIn(req, res, next) {

	// if user is authenticated in the session, carry on
	if (req.isAuthenticated())
		return next();

	// if they aren't redirect them to the home page
	res.redirect('/');
}
