var playerControllers = angular.module('playerControllers', []);

playerControllers.controller('IntroCtrl', function ($scope) {
    $scope.heading = 'Välkommen!';
    $scope.intro = 'Lorem ipsum yada yada';
    $scope.btn_text = 'Start';
});

playerControllers.controller('PlayerCtrl', function ($scope) {
    $scope.heading = 'Lyssna!';
    $scope.genres = [
        {'name': 'Pop', 'key': 'pop', 'value': 0},
        {'name': 'Rock', 'key': 'rock', 'value': 0},
        {'name': 'Reggae', 'key': 'reggae', 'value': 0},
        {'name': 'Jazz', 'key': 'jazz', 'value': 0},
        {'name': 'Klassiskt', 'key': 'classical', 'value': 0},
    ];
});
