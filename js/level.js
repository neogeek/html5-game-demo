define(function (require) {

    'use strict';

    var Facade = require('facade');

    require('facadejs-Box2D-plugin');

    var camera = require('./camera');

    var generateEntityFromObject = require('./utils/generateEntityFromObject');

    return function (canvas, file) {

        var stage = new Facade(canvas);

        // stage.resizeForHDPI();

        var world = new Facade.Entity().Box2D('createWorld', { canvas: stage.canvas, gravity: [ 0, 20 ] });

        var entities = {
            background: [],
            platforms: [],
            items: [],
            players: [],
            player1: null,
            foreground: [],
            ui: []
        };

        fetch(file).then(function (response) {
            return response.json();
        }).then(function (data) {

            Object.keys(data).forEach(function (type) {

                var items = data[type];

                if (items.length) {

                    entities[type] = items.map(function (item) {

                        return generateEntityFromObject(item, world);

                    });

                }

            });

            if (data.camera) {

                Object.keys(data.camera).forEach(function (key) {

                    camera.settings[key] = data.camera[key];

                });

            }

        });

        stage.draw(function () {

            this.clear();

            world.Box2D('step');

            this.addToStage(entities.background);

            this.addToStage([
                entities.platforms,
                entities.items,
                entities.players
            ], { x: '+=' + -camera.position.x, y: '+=' + -camera.position.y });

            if (entities.player1) {

                this.addToStage(entities.player1, { x: '+=' + -camera.position.x, y: '+=' + -camera.position.y });

            }

            this.addToStage([
                entities.foreground
            ], { x: '+=' + -camera.position.x, y: '+=' + -camera.position.y });

            this.addToStage(entities.ui);

            // world.Box2D('drawDebug');

        });

        return {
            world: world,
            entities: entities
        };

    };

});
