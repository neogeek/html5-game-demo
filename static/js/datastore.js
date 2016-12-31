const firebase = require('firebase');

firebase.initializeApp({
    'apiKey': 'AIzaSyBTkqUxvhXJ6UcfmmHAlTS9_Qxp8Y03nJo',
    'authDomain': 'html5-game-demo.firebaseapp.com',
    'databaseURL': 'https://html5-game-demo.firebaseio.com',
    'messagingSenderId': '684890656119',
    'storageBucket': 'html5-game-demo.appspot.com'
});

module.exports = firebase.database().ref('players');
