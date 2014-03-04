var playerControllers = angular.module('playerControllers', ['ngCookies']);

playerControllers.controller('IntroCtrl',
    function ($scope, $location, $cookies, $sce, SessionService) {
        $scope.heading = 'Välkommen!';
        $scope.lead = $sce.trustAsHtml('Hjälp mig att utreda om trumljud är tillräckligt för att avgöra vilken genre en låt har.');
        $scope.body = $sce.trustAsHtml('Du kommer få lyssna på ett antal väldigt korta musikspår. Spåren är en blandning av hela låtar och trumljuden från samma låtar. Din uppgift är att ange vilken eller vilka genrer du tycker att låten har.<br><br>Det är fullt tillåtet att säga att en låt tillhör fler än en genre.');
        $scope.btnText = 'Start';
        $scope.label = 'Ditt namn';
        $scope.respondent = '';

        if ($cookies.status == 'already_responded') {
            $location.path('/thanks/');
        }

        $scope.start = function () {
            SessionService.setName($scope.respondent);
            $location.path('/play/');
        }
});

playerControllers.controller('ThanksCtrl', function ($scope) {
    $scope.heading = 'Tack!';
    $scope.thanks = 'Nu är du klar. Tack för att du hjälpte till.';
});

playerControllers.controller('PlayerCtrl',
    function ($scope, $location, $cookies, SessionService, MusicService) {
        $scope.genres = MusicService.getGenres();
        $scope.tracks = MusicService.getTracks();
        $scope.trackIndex = 0;
        $scope.currentTrack = $scope.tracks[$scope.trackIndex];

        if ($cookies.status == 'already_responded') {
            $location.path('/thanks/');
        }

        $scope.hasNext = function () {
            return $scope.trackIndex < $scope.tracks.length - 1;
        };

        $scope.updateSession = function () {
            var genreClassification = $scope.genres.map(function (x) { return x.value; });
            SessionService.addTrack($scope.currentTrack.src, genreClassification);
        };

        $scope.next = function () {
            $scope.updateSession();
            // reset genre values
            $scope.genres = MusicService.getGenres();
            // forward song pointer and play new song
            $scope.currentTrack = $scope.tracks[++$scope.trackIndex];
            var audio = document.getElementById('player');
            var source = document.getElementById('song');
            source.src = $scope.currentTrack.src;
            audio.load();
            audio.play();
        };

        $scope.finish = function () {
            $scope.updateSession();
            SessionService.save();
            $cookies.status = 'already_responded';
            $location.path('/thanks/');
        };
});
