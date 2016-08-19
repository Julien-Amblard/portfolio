'use strict';

var homeBgParticles = function () {

	var rMax = 3.1; //rotation max
	var rMin = 1.5; //rotation min
	var count = 3000; //nb particules
	var r = oSize.w * 2.3; //teinte de la couleur
	var color = ', 70%, 70%'; //couleur
	var colorH = rand(190, 210); //teinte hsla
	var centerVariable = 5;
	var aParticlesType = [[r * .4, r * .401, false], [r * .4, r * .406, true], [r * .45, r * .47, true], [r * .44, r * .48, true], [r * .4, r * .48, true], [r * .392, r * .48, true], [r * .48, r * .59, true]];
	var relativeDist = r * .59 - r * .392;
	var newColor = false;
	var colorChangeSpeed = 10;
	var colorSpeed = .1;
	var name = 'home';

	var props = function props() {

		var type = Math.floor(rand(0, aParticlesType.length)); //type de distance
		var ro = rand(rMin, rMax); //rotation de la particule par rapport au centre
		var cx = oSize.w * 1.1 + rand(-centerVariable, centerVariable); //on definie un centre un peu random par rapport au centre
		var cy = -(oSize.h * .4) + rand(-centerVariable, centerVariable); //on definie un centre un peu random par rapport au centre
		var dist = rand(aParticlesType[type][0], aParticlesType[type][1]); //distance du centre
		var pcDist = (dist - aParticlesType[type][0]) / relativeDist * 100;
		var distY = 400;
		var x = cx + dist * Math.cos(ro); ///calculuer position autour d'un cercle : x = centerX + ( rayon * Math.cos( angle ) );
		var y = cy + (dist - distY) * Math.sin(ro); ///calculuer position autour d'un cercle : y = centerY + ( rayon * Math.sin( angle ) );
		var speedUp = .5 * (pcDist / 100); //speed a rajouter en fonction de la distance du centre
		var colorRand = 30; //pour rand un peu la couleur
		var dir = aParticlesType[type][2]; //la direction de la part

		return {
			x: x,
			y: y,
			tx: x,
			ty: y,
			tx1: x,
			ty1: y,
			tx2: x,
			ty2: y,
			r: rand(0.1, 0.7) + pcDist / 60, //largeur du trait
			a: 0, //alpha
			ta: rand(1, 8) / 10, //targeted alpha
			life: rand(70, 100),
			dist: dist,
			distY: distY,
			speed: rand(0.00005, 0.0002) + speedUp / 1000,
			cx: cx,
			cy: cy,
			rMax: rMax,
			rMin: rMin,
			ro: ro,
			colorRand: rand(-colorRand, colorRand),
			dir: dir
		};
	};

	var changeColor = function changeColor(_color) {
		newColor = _color;
	};

	var globalUpdate = function globalUpdate() {

		if (newColor && colorH != newColor) {

			if (colorH < newColor) colorH += colorChangeSpeed;else colorH -= colorChangeSpeed;

			if (colorH - colorChangeSpeed < newColor && colorH + colorChangeSpeed > newColor) newColor = !newColor;
		} else {

			colorH = colorH > 360 ? 0 : colorH + colorSpeed;
		}
	};

	var update = function update(p, i) {

		//decrease his life
		p.life -= 0.1;

		if (p.dir) {

			if (p.ro > p.rMax || p.ro < p.rMin) p = props();else p.ro += p.speed;
		} else {

			if (p.ro > p.rMax || p.ro < p.rMin) p = props();else p.ro -= p.speed * 1.2;
		}

		//update pos
		p.tx2 = p.tx1;
		p.ty2 = p.ty1;
		p.tx1 = p.tx;
		p.ty1 = p.ty;
		p.tx = p.x;
		p.ty = p.y;
		p.x = p.cx + p.dist * Math.cos(p.ro);
		p.y = p.cy + (p.dist - p.distY) * Math.sin(p.ro);

		//if gonna die
		if (p.life <= 0) {

			//if no alpha, you die
			if (p.a <= 0) {
				//good bye my friend
				p = props();
			} else {
				//decrease his alpha
				p.a -= 0.05;
			}
			//if not gonna die
		} else {
			//and you just born, you can appear
			if (p.a < p.ta) p.a += 0.005;
		}

		return p;
	};

	var draw = function draw(p, ctx) {

		ctx.lineCap = "round";

		ctx.beginPath();
		ctx.moveTo(p.tx2, p.ty2);
		ctx.lineTo(p.x, p.y);
		ctx.lineWidth = p.r * 1.2;
		ctx.strokeStyle = 'hsla( ' + (colorH + p.colorRand) + color + ', ' + (p.a - .2) + ' )';
		ctx.stroke();

		ctx.beginPath();
		ctx.moveTo(p.tx1, p.ty1);
		ctx.lineTo(p.x, p.y);
		ctx.lineWidth = p.r;
		ctx.strokeStyle = 'hsla( ' + (colorH + p.colorRand) + color + ', ' + p.a + ' )';
		ctx.stroke();

		ctx.beginPath();
		ctx.moveTo(p.tx, p.ty);
		ctx.lineTo(p.x, p.y);
		ctx.lineWidth = p.r * .8;
		ctx.strokeStyle = 'hsla( ' + (colorH + p.colorRand) + color + ', ' + (p.a + .2) + ' )';
		ctx.stroke();
	};

	var bind = function bind() {

		document.querySelector('.link-cv').addEventListener('click', function () {

			//portfolio.layers.particles[name].update = portfolio.layers.particles[name].updateOut;

		});
	};

	var init = function init() {
		Events.on('changeHomeColor', changeColor);
		bind();
	};

	init();

	return {
		name: name,
		count: count,
		update: update,
		globalUpdate: globalUpdate,
		draw: draw,
		prop: props
	};
}();