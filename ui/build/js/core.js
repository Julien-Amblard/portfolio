'use strict';

var canvas = document.getElementById('main');

var portfolio = function () {

	canvas.height = oSize.h;
	canvas.width = oSize.w;

	var layers = new Layers(canvas);

	var init = function init() {

		//admeton on est sur la home
		layers.addParticles(homeBgParticles);
		layers.start();

		Events.on('suppHomePart', layers.suppPart);
	};

	return {
		init: init,
		layers: layers
	};
}();

window.onload = portfolio.init;