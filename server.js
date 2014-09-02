// server.js

// set up ========================
var express  = require('express');
var app      = express(); 								// create our app w/ express
var mongoose = require('mongoose');
var passport = require('passport');
var flash 	 = require('connect-flash');
var morgan = require('morgan'); 						// log requests to the console (express4)
var bodyParser = require('body-parser'); 
var cookieParser = require('cookie-parser');				// pull information from HTML POST (express4)
var methodOverride = require('method-override'); 		// simulate DELETE and PUT (express4)
var session      = require('express-session');

// configuration =================
var database = require('./config/database');
mongoose.connect(database.url);

require('./config/passport')(passport); // pass passport for configuration

app.set('view engine', 'ejs')
app.use(express.static(__dirname + '/public')); 				// set the static files location /public/img will be /img for users
app.set('views', __dirname + '/public');
app.use(morgan('dev')); 										// log every request to the console
app.use(cookieParser()); 										// read cookies (needed for auth)
app.use(bodyParser.urlencoded({'extended':'true'})); 			// parse application/x-www-form-urlencoded
app.use(bodyParser.json()); 									// parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(methodOverride());

// required for passport
app.use(session({ secret: 'pablococko' })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

// routes ======================================================================
var routes = require('./app/routes.js')(app,passport);


// listen (start app with node server.js) ======================================
app.listen(8080);
console.log("Escuchando en puerto 8080");

