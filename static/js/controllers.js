var playerControllers = angular.module('playerControllers', []);

playerControllers.controller('IntroCtrl', function ($scope) {
	$scope.heading = 'Välkommen!';
	$scope.intro = 'Lorem ipsum yada yada';
	$scope.btn_text = 'Start';
});

playerControllers.controller('PlayerCtrl', function ($scope) {
	$scope.heading = 'Lyssna!';
});
