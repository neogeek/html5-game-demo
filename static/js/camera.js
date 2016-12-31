/* eslint no-magic-numbers: 0 */

const position = {
    'x': 0,
    'y': 0
};

const settings = {
    'height': 0,
    'maxX': 0,
    'maxY': 0,
    'minX': 0,
    'minY': 0,
    'width': 0
};

const SCROLL_HORIZONTAL = 0.6;
const SCROLL_VERTICAL = 0.6;

const centerOnEntity = entity => {

    if (entity.getMetric('x') > position.x + (settings.width * SCROLL_HORIZONTAL)) {

        position.x += Math.abs(entity.getMetric('x') - (position.x + (settings.width * SCROLL_HORIZONTAL)));

    } else if (entity.getMetric('x') - (entity.getMetric('width') / 2) < position.x + (settings.width * SCROLL_VERTICAL)) {

        position.x -= Math.abs(entity.getMetric('x') - (entity.getMetric('width') / 2) - (position.x + (settings.width * SCROLL_VERTICAL)));

    }

    if (position.x < settings.minX) {

        position.x = settings.minX;

    } else if (position.x > settings.maxX - settings.width) {

        position.x = settings.maxX - settings.width;

    }

};

module.exports = {
    centerOnEntity,
    position,
    settings
};
