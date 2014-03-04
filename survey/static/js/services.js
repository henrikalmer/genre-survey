var playerServices = angular.module('playerServices', []);

function shuffle (o) {
    for (var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
};

playerServices.service('MusicService', function () {
    this.getGenres = function () {
        var genres = [
            {'name': 'Pop', 'key': 'pop', 'value': 0},
            {'name': 'Rock', 'key': 'rock', 'value': 0},
            {'name': 'Reggae', 'key': 'reggae', 'value': 0},
            {'name': 'Jazz', 'key': 'jazz', 'value': 0},
            {'name': 'Klassiskt', 'key': 'classical', 'value': 0},
        ];
        return genres;
    };

    this.getTracks = function () {
        var tracks = [
            {'artist': 'Katy Perry', 'title': 'Roar', 'name': 'Mix 1', 'src': 'static/mp3/mix.mp3'},
            {'artist': 'Katy Perry', 'title': 'Roar', 'name': 'Drums 1', 'src': 'static/mp3/drums.mp3'}
        ]
        return shuffle(tracks);
    };
});

playerServices.service('SessionService', function ($http) {
    this.data = {'respondent': '', 'tracks': []};

    this.setName = function (name) {
        this.data['respondent'] = name;
    };

    this.addTrack = function (track, genreClassification) {
        this.data['tracks'].push({
            'track': track,
            'genre_classification': genreClassification}
        );
    }

    this.save = function () {
        $http.post('/api/v1/survey', {"json": JSON.stringify(this.data)});
    };
});

playerServices.service('ResultService', function ($http) {
    this.getResults = function () {
        return $http.get('/api/v1/survey');
    }
});
