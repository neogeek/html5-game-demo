const Facade = require('facade.js');

const datastore = require('./utils/datastore');

const MILLISECOND = 10000;

module.exports = level => {

    let activePlayerEntities = [];

    datastore.on('value', players => {

        const currentPlayerKey = localStorage.getItem('currentPlayerKey');

        activePlayerEntities = [];

        players.forEach(player => {

            if (player.child('lastUpdatedAt').val() < Date.now() - MILLISECOND) {

                datastore.child(player.key).remove();

            } else if (player.key !== currentPlayerKey) {

                activePlayerEntities.push(new Facade.Image(player.child('src').val(), {
                    'frames': [player.child('currentFrame').val()],
                    'height': player.child('height').val(),
                    'offsetX': player.child('offsetX').val(),
                    'offsetY': player.child('offsetY').val(),
                    'width': player.child('width').val(),
                    'x': player.child('x').val(),
                    'y': player.child('y').val()
                }));

            }

        });

        level.entities.players = activePlayerEntities;

    });

};
