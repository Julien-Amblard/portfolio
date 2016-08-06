'use strict';

var rand = function rand(min, max) {
	return Math.random() * (max - min) + min;
};
var globalResize = function globalResize() {
	oSize.w = canvas.width = window.innerWidth;oSize.h = canvas.height = window.innerHeight;
};
var oSize = {
	h: window.innerHeight,
	w: window.innerWidth
};
var log = function log(msg) {
	console.log(msg);
};
window.addEventListener('resize', globalResize, false);