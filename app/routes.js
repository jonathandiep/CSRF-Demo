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


};

// route middleware to make sure
function isLoggedIn(req, res, next) {

	// if user is authenticated in the session, carry on
	if (req.isAuthenticated())
		return next();

	// if they aren't redirect them to the home page
	res.redirect('/');
}
