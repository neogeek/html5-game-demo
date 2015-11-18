define(function (require) {

    'use strict';

    var Level = require('./level'),
        Lobby = require('./lobby'),
        Player = require('./player');

    var level1 = new Level(document.querySelector('canvas'), './data/level1.json');

    var lobby = new Lobby(level1);

    var player1 = new Player(level1);

});
