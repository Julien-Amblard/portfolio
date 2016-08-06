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

window.addEventListener('resize', globalResize, false);