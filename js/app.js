/* eslint no-unused-vars: 0 */

'use strict';

const Level = require('./level');
const Lobby = require('./lobby');
const Player = require('./player');

const level1 = new Level(document.querySelector('canvas'), './data/level1.json');

const lobby = new Lobby(level1);

const player1 = new Player(level1);
