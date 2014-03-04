var playerControllers = angular.module('playerControllers', []);

playerControllers.controller('IntroCtrl', function ($scope) {
    $scope.heading = 'Välkommen!';
    $scope.intro = 'Lorem ipsum yada yada';
    $scope.btn_text = 'Start';
});

playerControllers.controller('ThanksCtrl', function ($scope) {
    $scope.heading = 'Tack!';
    $scope.thanks = 'Lorem ipsum yada yada';
});

playerControllers.controller('PlayerCtrl', function ($scope, $location, SessionService, MusicService) {
    $scope.genres = MusicService.get_genres();
    $scope.tracks = MusicService.get_tracks();
    $scope.track_index = 0;
    $scope.currentTrack = $scope.tracks[$scope.track_index];

    $scope.has_next = function () {
        return $scope.track_index < $scope.tracks.length - 1;
    };

    $scope.update_session = function () {
        SessionService.add_track($scope.currentTrack, $scope.genres);
    };

    $scope.next = function () {
        $scope.update_session();
        // reset genre values
        $scope.genres = MusicService.get_genres();
        // forward song pointer and play new song
        $scope.currentTrack = $scope.tracks[++$scope.track_index];
        var audio = document.getElementById('player');
        var source = document.getElementById('song');
        source.src = $scope.currentTrack.src;
        audio.load();
        audio.play();
    };

    $scope.finish = function () {
        $scope.update_session();
        $location.path('/thanks/');
    };
});
