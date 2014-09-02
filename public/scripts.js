// create the module and name it scotchApp
// also include ngRoute for all our routing needs
var MEANPassportApp = angular.module('MEANPassportApp', ['ngRoute']);

// configure our routes
MEANPassportApp.config(function($routeProvider) {
	$routeProvider

		// route for the home page
		.when('/', {
			templateUrl : 'partials/home',
			controller  : 'mainController'
		})
		.when('/login', {
			templateUrl : 'partials/login',
			controller  : 'loginController'
		})
		.when('/signup', {
			templateUrl : 'partials/signup',
			controller  : 'loginController'
		})
		.when('/profile', {
			templateUrl : 'partials/profile',
			controller  : 'loginController'
		})
		.when('/logout', {
			templateUrl : 'partials/logout',
			controller  : 'loginController'
		});
});

// create the controller and inject Angular's $scope
MEANPassportApp.controller('mainController', function($scope, $http) {

});

MEANPassportApp.controller('loginController', function($scope, $http) {
	
});