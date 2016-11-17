'use strict';

const Facade = require('facade.js');

require('facadejs-Box2D-plugin');

const camera = require('./camera');

const generateEntityFromObject = require('./utils/generateEntityFromObject');

const GRAVITY = 20;

module.exports = (canvas, file) => {

    const stage = new Facade(canvas);

    // stage.resizeForHDPI();

    const world = new Facade.Entity().Box2D('createWorld', {
        'canvas': stage.canvas,
        'gravity': [0, GRAVITY]
    });

    const entities = {
        'background': [],
        'foreground': [],
        'items': [],
        'platforms': [],
        'player1': null,
        'players': [],
        'ui': []
    };

    fetch(file).then(response => response.json())
        .then(data => {

            Object.keys(data).forEach(type => {

                if (data[type].length) {

                    entities[type] = data[type].map(item =>
                        generateEntityFromObject(item, world));

                }

            });

            if (data.camera) {

                Object.keys(data.camera).forEach(key => {

                    camera.settings[key] = data.camera[key];

                });

            }

        });

    stage.draw(() => {

        stage.clear();

        world.Box2D('step');

        stage.addToStage(entities.background);

        stage.addToStage([
            entities.platforms,
            entities.items,
            entities.players
        ], {
            'x': `+=${-camera.position.x}`,
            'y': `+=${-camera.position.y}`
        });

        if (entities.player1) {

            stage.addToStage(entities.player1, {
                'x': `+=${-camera.position.x}`,
                'y': `+=${-camera.position.y}`
            });

        }

        stage.addToStage([
            entities.foreground
        ], {
            'x': `+=${-camera.position.x}`,
            'y': `+=${-camera.position.y}`
        });

        stage.addToStage(entities.ui);

        // world.Box2D('drawDebug');

    });

    return {
        entities,
        world
    };

};
