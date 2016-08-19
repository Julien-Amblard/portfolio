

let canvas = document.getElementById('main');


let portfolio = (() => {

	canvas.height 	= oSize.h;
	canvas.width 	= oSize.w;

	let layers = new Layers( canvas );
	
	let init = () => {

		//admeton on est sur la home
		layers.addParticles( homeBgParticles );
		layers.start()


		Events.on('suppHomePart', layers.suppPart)


	}	

	return {
		init,
		layers
	}

})();

window.onload = portfolio.init;