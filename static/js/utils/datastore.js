const firebase = require('firebase');

firebase.initializeApp({
    'databaseURL': 'https://html5-game-demo.firebaseio.com'
});

module.exports = firebase.database().ref('players');
