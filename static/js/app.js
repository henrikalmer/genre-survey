var playerApp = angular.module('playerApp', [
	'ngRoute',
	'playerControllers'
]);

playerApp.config(['$routeProvider',
	function($routeProvider) {
		$routeProvider.
			when('/', {
				templateUrl: 'static/partials/intro.html',
				controller: 'IntroCtrl'
			}).
			when('/play/', {
				templateUrl: 'static/partials/play.html',
				controller: 'PlayerCtrl'
			}).
			otherwise({
				redirectTo: '/'
			});
	}]);
