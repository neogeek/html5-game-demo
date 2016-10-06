'use strict';

var Firebase = require('firebase');

console.log(Firebase);

var myFirebaseRef = new Firebase('https://html5-game-demo.firebaseio.com/players/');

module.exports = myFirebaseRef;
