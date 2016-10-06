'use strict';

var Facade = require('facade.js'),
    Gamepad = require('gamepad.js');

var gamepad = new Gamepad();

require('facadejs-Box2D-plugin');

var camera = require('./camera'),
    datastore = require('./datastore');

var generateEntityFromObject = require('./utils/generateEntityFromObject');

module.exports = function (level) {

    fetch('./data/player.json').then(function (response) {
        return response.json();
    }).then(function (data) {

        var entity;

        data.entity.options.image = data.entity.options.images[Math.floor(Math.random() * data.entity.options.images.length)];

        entity = generateEntityFromObject(data.entity, level.world);

        var currentPlayer = { lastUpdatedAt: Date.now() },
            currentPlayerKey = localStorage.getItem('currentPlayerKey');

        function handlePlayerMovement () {

            currentPlayer.src = entity.image.src;
            currentPlayer.x = entity.getMetric('x');
            currentPlayer.y = entity.getMetric('y');
            currentPlayer.width = entity.getOption('width');
            currentPlayer.height = entity.getOption('height');
            currentPlayer.offsetX = entity.getOption('offsetX');
            currentPlayer.offsetY = entity.getOption('offsetY');
            currentPlayer.currentFrame = entity.currentFrame;

            currentPlayer.lastUpdatedAt = Date.now();

            if (!currentPlayerKey) {

                currentPlayerKey = datastore.push(currentPlayer).key();

                localStorage.setItem('currentPlayerKey', currentPlayerKey);

            } else {

                datastore.child(currentPlayerKey).set(currentPlayer);

            }

            camera.centerOnEntity(entity);

            requestAnimationFrame(handlePlayerMovement);

        }

        requestAnimationFrame(handlePlayerMovement);

        entity.Box2D('setCallback', 'BeginContact', function (a, b) {

            if (level.entities.items.indexOf(b) !== -1) {

                var removed = level.entities.items.splice(level.entities.items.indexOf(b), 1);

                removed[0].Box2D('destroyObject');

            }

        });

        Object.keys(data.movement).forEach(function (button) {

            Object.keys(data.movement[button]).forEach(function (type) {

                gamepad.on(type, button, function (e) {

                    var properties = data.movement[e.button][e.type].entity;

                    if (properties.options) {

                        entity.setOptions(properties.options);

                        if (properties.options.autoplay) {

                            entity.play();

                        } else {

                            entity.stop();

                        }

                    }

                    if (properties.box2d_properties) {

                        if (properties.box2d_properties.setVelocity) {

                            entity.Box2D.apply(entity, ['setVelocity'].concat(properties.box2d_properties.setVelocity));

                        }

                    }

                });

            });

            level.entities.player1 = entity;

            camera.centerOnEntity(entity);

        });

    });

};
