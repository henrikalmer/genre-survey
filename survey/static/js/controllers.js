var playerControllers = angular.module('playerControllers', []);

playerControllers.controller('IntroCtrl', function ($scope, $location, $sce, SessionService) {
    $scope.heading = 'Välkommen!';
    $scope.lead = $sce.trustAsHtml('Hjälp mig att utreda om trumljud är tillräckligt för att avgöra vilken genre en låt har.');
    $scope.body = $sce.trustAsHtml('Du kommer få lyssna på ett antal väldigt korta musikspår. Spåren är en blandning av hela låtar och trumljuden från samma låtar. Din uppgift är att ange vilken eller vilka genrer du tycker att låten har.<br><br>Det är fullt tillåtet att säga att en låt tillhör fler än en genre.');
    $scope.btn_text = 'Start';
    $scope.label = 'Ditt namn';
    $scope.respondent = '';

    $scope.start = function () {
        SessionService.set_name($scope.respondent);
        $location.path('/play/');
    }
});

playerControllers.controller('ThanksCtrl', function ($scope) {
    $scope.heading = 'Tack!';
    $scope.thanks = 'Nu är du klar. Tack för att du hjälpte till.';
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
        genre_classification = $scope.genres.map(function (x) { return x.value; });
        SessionService.add_track($scope.currentTrack.src, genre_classification);
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
        SessionService.save();
        $location.path('/thanks/');
    };
});
