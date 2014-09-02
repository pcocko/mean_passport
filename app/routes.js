// app/routes.js

// load the todo model
var User = require('./models/user');


// expose the routes to our app with module.exports
module.exports = function(app, passport) {

	
	app.get('/partials/login', function(req, res){
		if(req.user == null)
	  		res.render('login', { message: "" } );
	  	else
	  		res.render('profile', { user : req.user } );
	});

	app.get('/partials/signup', function(req, res){
	  res.render('signup', { message: req.flash('signupMessage') } );
	});

	app.get('/partials/profile', isLoggedIn, function(req, res) {
		res.render('profile', {
			user : req.user // get the user out of session and pass to template
		});
	});

	app.post('/partials/signup', passport.authenticate('local-signup', {
		successRedirect : '/#/profile', // redirect to the secure profile section
		failureRedirect : '/#/signup', // redirect back to the signup page if there is an error
		failureFlash : true // allow flash messages
	}));

	app.post('/partials/login', passport.authenticate('local-login', {
		successRedirect : '/#/profile', // redirect to the secure profile section
		failureRedirect : '/#/signup', // redirect back to the signup page if there is an error
		failureFlash : true // allow flash messages
	}));

	// =====================================
	// LOGOUT ==============================
	// =====================================
	app.get('/partials/logout', function(req, res) {
		req.logout();
		res.redirect('/#/');
	});

	app.post('/api/adduser', function(req, res) {
		if (!validateEmail(req.body.email)) {
			res.json({ 
				success: false, 
				message: 'Formato de correo no válido.' 
			});
			return;
		}


		// create a todo, information comes from AJAX request from Angular
		User.create({
			email : req.body.email,
			done : false
		}, function(err, todo) {
			if (err)
				res.send(err);
			else
				res.json({ 
					success: true, 
					message: 'Usuario creado.' 
				});
		});
	});

	app.get('/partials/home', function(req, res) {
		
		res.render('home',{ user : req.user });
	});

	// application -------------------------------------------------------------
	app.get('/', function(req, res) {
		console.log("*");
		//res.render('./public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
		res.render('index',{ user : req.user });
	});

};

function validateEmail(email) { 
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {
	console.log("isLoggedIn");
	// if user is authenticated in the session, carry on 
	if (req.isAuthenticated())
		return next();

	// if they aren't redirect them to the home page
	res.redirect('/');
}