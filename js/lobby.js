define(function (require) {

    'use strict';

    var Facade = require('facade');

    var datastore = require('./datastore');

    return function (level) {

        var activePlayerEntities = [];

        datastore.on('value', function (players) {

            var currentPlayerKey = localStorage.getItem('currentPlayerKey');

            activePlayerEntities = [];

            players.forEach(function (player) {

                if (player.child('lastUpdatedAt').val() < Date.now() - 10000) {

                    datastore.child(player.key()).remove();

                } else if (player.key() !== currentPlayerKey) {

                    activePlayerEntities.push(new Facade.Image(player.child('src').val(), {
                        x: player.child('x').val(),
                        y: player.child('y').val(),
                        offsetX: player.child('offsetX').val(),
                        offsetY: player.child('offsetY').val(),
                        width: player.child('width').val(),
                        height: player.child('height').val(),
                        frames: [player.child('currentFrame').val()]
                    }));

                }

            });

            level.entities.players = activePlayerEntities;

        });

    };

});
