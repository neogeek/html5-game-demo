'use strict';

const Firebase = require('firebase');

const myFirebaseRef = Firebase.initializeApp({
    'databaseURL': 'https://html5-game-demo.firebaseio.com/'
})
.database('players')
.ref();

module.exports = myFirebaseRef;
