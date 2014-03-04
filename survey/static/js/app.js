var playerApp = angular.module('playerApp', [
    'ngRoute',
    'playerControllers',
    'playerServices'
]);

playerApp.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
            when('/', {
                templateUrl: 'static/partials/intro.html',
                controller: 'IntroCtrl'
            }).
            when('/thanks/', {
                templateUrl: 'static/partials/thanks.html',
                controller: 'ThanksCtrl'
            }).
            when('/play/', {
                templateUrl: 'static/partials/play.html',
                controller: 'PlayerCtrl'
            }).
            otherwise({
                redirectTo: '/'
            });
    }]);
