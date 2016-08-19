'use strict';

var homeOut = function () {

	var ix = 5;
	var iy = 5;

	var bloc = {
		ix: ix,
		iy: iy,
		w: 100 / ix,
		h: 100 / iy,
		a: []
	};

	var draw = function draw(_canvas) {};

	var build = function build() {

		for (var i = 0; i < iy; i++) {
			for (var j = 0; j < ix; j++) {

				(function (y, x) {

					var o = {
						e: document.createElement('div'),
						x: bloc.w * x,
						y: bloc.h * y
					};

					o.e.id = 'homeOutBloc-' + x + '-' + y;
					o.e.className = 'homeOutBloc homeOutBloc-' + x + '-' + y;
					o.e.style.position = 'absolute';
					o.e.style.left = o.x + '%';
					o.e.style.top = o.y + '%';
					o.e.style.width = bloc.w + '%';
					o.e.style.height = bloc.h + '%';

					bloc.a.push(o);

					document.body.appendChild(o.e);
				})(i, j);
			}
		}
	};

	var toggleClass = function toggleClass(e) {

		var delays = .5 / bloc.a.length;
		var adelays = [];

		for (var i = 0; i < bloc.a.length; i++) {
			adelays.push(delays * i);
		}

		for (var i = 0; i < bloc.a.length; i++) {

			(function (el) {

				var rx = Math.floor(rand(-40, 40));
				var ry = Math.floor(rand(-50, 50));
				var rz = Math.floor(rand(-20, 20));
				var s = rand(0.5, 0.7);
				var d = Math.floor(rand(0, adelays.length));
				var delay = adelays[d];
				adelays.splice(d, 1);

				el.classList.toggle('out');

				if (el.classList.contains('out')) {
					el.style.transform = 'rotateX( ' + rx + 'deg ) rotateY( ' + ry + 'deg ) rotateZ( ' + rz + 'deg ) scale( ' + s + ' )';
					//el.style.transitionDelay = delay + 's';
				} else {
					el.style.transform = '';
				}
			})(bloc.a[i].e);
		}
		console.log(adelays);
	};

	var bind = function bind() {
		for (var i = 0; i < bloc.a.length; i++) {
			bloc.a[i].e.addEventListener('click', toggleClass, false);
		}
	};

	var init = function init() {
		build();
		bind();
	};

	init();

	return {
		build: build,
		bloc: bloc,
		draw: draw
	};
}();