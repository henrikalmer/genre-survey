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
            'static/mp3/abba-drums-1.mp3',
            'static/mp3/judas-priest-drums-1.mp3',
            'static/mp3/abba-drums-2.mp3',
            'static/mp3/judas-priest-drums-2.mp3',
            'static/mp3/andrew-sisters-drums-1.mp3',
            'static/mp3/katy-perry-drums-1.mp3',
            'static/mp3/andrew-sisters-drums-2.mp3',
            'static/mp3/katy-perry-drums-2.mp3',
            'static/mp3/billie-holiday-drums-1.mp3',
            'static/mp3/led-zeppelin-drums-1.mp3',
            'static/mp3/billie-holiday-drums-2.mp3',
            'static/mp3/led-zeppelin-drums-2.mp3',
            'static/mp3/black-sabbath-drums-1.mp3',
            'static/mp3/louis-armstrong-drums-1.mp3',
            'static/mp3/black-sabbath-drums-2.mp3',
            'static/mp3/louis-armstrong-drums-2.mp3',
            'static/mp3/bob-marley-is-this-love-drums-1.mp3',
            'static/mp3/madonna-drums-1.mp3',
            'static/mp3/bob-marley-is-this-love-drums-2.mp3',
            'static/mp3/madonna-drums-2.mp3',
            'static/mp3/bob-marley-no-woman-no-cry-1.mp3',
            'static/mp3/motorhead-drums-1.mp3',
            'static/mp3/bob-marley-no-woman-no-cry-2.mp3',
            'static/mp3/motorhead-drums-2.mp3',
            'static/mp3/britney-spears-drums-1.mp3',
            'static/mp3/nessun-dorma-drums-1.mp3',
            'static/mp3/britney-spears-drums-2.mp3',
            'static/mp3/nessun-dorma-drums-2.mp3',
            'static/mp3/ella-fitzgerald-drums-1.mp3',
            'static/mp3/peter-tosh-drums-1.mp3',
            'static/mp3/ella-fitzgerald-drums-2.mp3',
            'static/mp3/peter-tosh-drums-2.mp3',
            'static/mp3/flight-of-the-bumblebee-drums-1.mp3',
            'static/mp3/wham-drums-1.mp3',
            'static/mp3/flight-of-the-bumblebee-drums-2.mp3',
            'static/mp3/wham-drums-2.mp3',
            'static/mp3/iron-maiden-drums-1.mp3',
            'static/mp3/william-tell-drums-1.mp3',
            'static/mp3/iron-maiden-drums-2.mp3',
            'static/mp3/william-tell-drums-2.mp3',
            'static/mp3/abba-mix.mp3',
            'static/mp3/judas-priest-mix.mp3',
            'static/mp3/andrew-sisters-mix.mp3',
            'static/mp3/katy-perry-mix.mp3',
            'static/mp3/billie-holiday-mix.mp3',
            'static/mp3/led-zeppelin-mix.mp3',
            'static/mp3/black-sabbath-mix.mp3',
            'static/mp3/louis-armstrong-mix.mp3',
            'static/mp3/bob-marley-is-this-love-mix.mp3',
            'static/mp3/madonna-mix.mp3',
            'static/mp3/bob-marley-no-woman-no-cry-mix.mp3',
            'static/mp3/motorhead-mix.mp3',
            'static/mp3/britney-spears-mix.mp3',
            'static/mp3/nessun-dorma-mix.mp3',
            'static/mp3/ella-fitzgerald-mix.mp3',
            'static/mp3/peter-tosh-mix.mp3',
            'static/mp3/flight-of-the-bumblebee-mix.mp3',
            'static/mp3/wham-mix.mp3',
            'static/mp3/iron-maiden-mix.mp3',
            'static/mp3/william-tell-mix.mp3'
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
