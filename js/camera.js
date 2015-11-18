define(function (require) {

    'use strict';

    var position = { x: 0, y: 0 },
        settings = { width: 0, height: 0, minX: 0, minY: 0, maxX: 0, maxY: 0 };

    return {
        centerOnEntity: function (entity) {

            if (entity.getMetric('x') > position.x + (settings.width * 0.6)) {

                position.x += Math.abs(entity.getMetric('x') - (position.x + (settings.width * 0.6)));

            } else if (entity.getMetric('x') - entity.getMetric('width') / 2 < position.x + (settings.width * 0.3)) {

                position.x -= Math.abs(entity.getMetric('x') - (entity.getMetric('width') / 2) - (position.x + (settings.width * 0.3)));

            }

            if (position.x < settings.minX) {

                position.x = settings.minX;

            } else if (position.x > settings.maxX - settings.width) {

                position.x = settings.maxX - settings.width;

            }

        },
        position: position,
        settings: settings
    };

});
