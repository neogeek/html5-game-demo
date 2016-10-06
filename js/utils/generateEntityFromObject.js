'use strict';

var Facade = require('facade.js');

require('facadejs-Box2D-plugin');

var context = document.createElement('canvas').getContext('2d');

function generateEntityFromObject (data, world) {

    var entity,
        img;

    if (data.options.pattern) {

        entity = new Facade.Rect(data.options);

        img = document.createElement('img');

        img.setAttribute('src', data.options.pattern);

        img.addEventListener('load', function () {

            entity._options.fillStyle = context.createPattern(img, 'repeat');

        });

    } else if (data.options.image) {

        entity = new Facade.Image(data.options.image, data.options);

        if (data.options.autoplay) {

            entity.play();

        }

    } else {

        entity = new Facade.Rect(data.options);

    }

    if (world && data.box2d_properties) {

        entity.Box2D('createObject', world, data.box2d_properties);

    }

    return entity;

}

module.exports = generateEntityFromObject;
