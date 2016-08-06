'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Layers = function () {
	function Layers(_canvas) {
		_classCallCheck(this, Layers);

		this.canvas = _canvas;
		this.ctx = this.canvas.getContext('2d');
		this.isRuning = false;
		this.particles = {};
	}

	_createClass(Layers, [{
		key: 'removeParticles',
		value: function removeParticles() {
			var _name = arguments.length <= 0 || arguments[0] === undefined ? undefined : arguments[0];

			var _count = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];
		}
	}, {
		key: 'removeRange',
		value: function removeRange() {}
	}, {
		key: 'removeAll',
		value: function removeAll() {}
	}, {
		key: 'addParticles',
		value: function addParticles(_settings) {

			this.particles[_settings.name] = {};
			this.particles[_settings.name].p = [];
			this.particles[_settings.name].update = _settings.update;
			this.particles[_settings.name].draw = _settings.draw;

			if (_settings.globalUpdate && typeof _settings.globalUpdate == 'function') this.particles[_settings.name].globalUpdate = _settings.globalUpdate;else this.particles[_settings.name].globalUpdate = false;

			for (var i = _settings.count - 1; i >= 0; i--) {

				this.particles[_settings.name].p.push(_settings.prop());
			}
		}
	}, {
		key: 'globalUpdate',
		value: function globalUpdate() {

			//pour chaques names
			for (var name in this.particles) {

				if (this.particles[name].globalUpdate && typeof this.particles[name].globalUpdate == 'function') this.particles[name].globalUpdate();
			}
		}
	}, {
		key: 'update',
		value: function update() {

			//pour chaques names
			for (var name in this.particles) {

				//pour chaques particules dans le name
				for (var j = this.particles[name].p.length - 1; j >= 0; j--) {

					//je lance la fonction update avec en parametre les proprietes de la particules
					this.particles[name].p[j] = this.particles[name].update(this.particles[name].p[j]);
				}
			}
		}
	}, {
		key: 'draw',
		value: function draw() {

			this.ctx.fillStyle = "rgba( 0, 0, 0, 0.3 )";
			this.ctx.fillRect(0, 0, oSize.w, oSize.h);

			//pour chaques names
			for (var name in this.particles) {

				//pour chaques particules dans le name
				for (var j = this.particles[name].p.length - 1; j >= 0; j--) {

					//je lance la fonction draw avec en parametre les proprietes de la particules
					this.particles[name].draw(this.particles[name].p[j], this.ctx);
				}
			}
		}
	}, {
		key: 'run',
		value: function run() {

			this.globalUpdate();
			this.update();
			this.draw();
			if (this.isRuning) requestAnimationFrame(this.run.bind(this));
		}
	}, {
		key: 'start',
		value: function start() {
			this.isRuning = !this.isRuning;
			this.run();
		}
	}, {
		key: 'stop',
		value: function stop() {
			this.isRuning = !this.isRuning;
		}
	}]);

	return Layers;
}();