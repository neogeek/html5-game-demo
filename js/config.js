require.config({
    'paths': {
        'facade': '../bower_components/facade.js/facade.min',
        'gamepad': '../bower_components/gamepad.js/gamepad.min',
        'facadejs-Box2D-plugin': '../bower_components/facadejs-Box2D-plugin/facadejs-Box2D',
        'box2dweb': '../bower_components/facadejs-Box2D-plugin/vendor/box2dweb/Box2d.min',
        'firebase': '../bower_components/firebase/firebase'
    },
    'shim': {
        'box2dweb': {
            'exports': 'Box2D'
        },
        'firebase': {
            'exports': 'Firebase'
        }
    }
});

require(['app']);
