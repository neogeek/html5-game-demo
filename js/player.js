const Gamepad = require('gamepad.js');

const gamepad = new Gamepad();

require('facadejs-Box2D-plugin');

const camera = require('./camera');
const datastore = require('./datastore');

const generateEntityFromObject = require('./utils/generateEntityFromObject');

module.exports = level => {

    fetch('./data/player.json').then(response => response.json())
        .then(data => {

            let entity = null;

            data.entity.options.image = data.entity.options.images[Math.floor(Math.random() * data.entity.options.images.length)];

            entity = generateEntityFromObject(data.entity, level.world);

            const currentPlayer = {
                'lastUpdatedAt': Date.now()
            };

            let currentPlayerKey = localStorage.getItem('currentPlayerKey');

            const handlePlayerMovement = () => {

                currentPlayer.src = entity.image.src;
                currentPlayer.x = entity.getMetric('x');
                currentPlayer.y = entity.getMetric('y');
                currentPlayer.width = entity.getOption('width');
                currentPlayer.height = entity.getOption('height');
                currentPlayer.offsetX = entity.getOption('offsetX');
                currentPlayer.offsetY = entity.getOption('offsetY');
                currentPlayer.currentFrame = entity.currentFrame;

                currentPlayer.lastUpdatedAt = Date.now();

                if (currentPlayerKey) {

                    datastore.child(currentPlayerKey).set(currentPlayer);

                } else {

                    currentPlayerKey = datastore.push(currentPlayer).key();

                    localStorage.setItem('currentPlayerKey', currentPlayerKey);

                }

                camera.centerOnEntity(entity);

                requestAnimationFrame(handlePlayerMovement);

            };

            requestAnimationFrame(handlePlayerMovement);

            entity.Box2D('setCallback', 'BeginContact', (a, b) => {

                if (level.entities.items.indexOf(b) !== -1) {

                    const removed = level.entities.items.splice(level.entities.items.indexOf(b), 1);

                    removed[0].Box2D('destroyObject');

                }

            });

            Object.keys(data.movement).forEach(button => {

                Object.keys(data.movement[button]).forEach(type => {

                    gamepad.on(type, button, e => {

                        const properties = data.movement[e.button][e.type].entity;

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

                                entity.Box2D(...[entity, ['setVelocity'].concat(properties.box2d_properties.setVelocity)]);

                            }

                        }

                    });

                });

                level.entities.player1 = entity;

                camera.centerOnEntity(entity);

            });

        });

};
