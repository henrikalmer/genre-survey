var playerServices = angular.module('playerServices', []);

function shuffle (o) {
    for (var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
};

playerServices.service('MusicService', function () {
    this.get_genres = function () {
        var genres = [
            {'name': 'Pop', 'key': 'pop', 'value': 0},
            {'name': 'Rock', 'key': 'rock', 'value': 0},
            {'name': 'Reggae', 'key': 'reggae', 'value': 0},
            {'name': 'Jazz', 'key': 'jazz', 'value': 0},
            {'name': 'Klassiskt', 'key': 'classical', 'value': 0},
        ];
        return genres;
    };

    this.get_tracks = function () {
        var tracks = [
            {'artist': 'Katy Perry', 'title': 'Roar', 'name': 'Mix 1', 'src': 'static/mp3/mix.mp3'},
            {'artist': 'Katy Perry', 'title': 'Roar', 'name': 'Drums 1', 'src': 'static/mp3/drums.mp3'}
        ]
        return shuffle(tracks);
    };
});

playerServices.service('SessionService', function ($http) {
    this.data = {'respondent': '', 'tracks': []};

    this.set_name = function (name) {
        this.data['respondent'] = name;
    };

    this.add_track = function (track, genre_classification) {
        this.data['tracks'].push({
            'track': track,
            'genre_classification': genre_classification}
        );
    }

    this.save = function () {
        $http.post('/api/v1/survey', {"json": JSON.stringify(this.data)});
    };
});
