'use strict';

var canvas = document.getElementById('main');

var portfolio = function () {

	canvas.height = oSize.h;
	canvas.width = oSize.w;

	var layers = new Layers(canvas);

	var init = function init() {

		//admeton on est sur la home
		layers.addParticles(home);
		layers.start();
	};

	return {
		init: init,
		layers: layers
	};
}();

window.onload = portfolio.init;