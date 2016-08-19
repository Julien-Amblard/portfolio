
class Layers {

	constructor( _canvas ) {

		this.canvas = _canvas;
		this.ctx 	= this.canvas.getContext('2d')
		this.isRuning = false;
		this.particles = {};

	}


	removeParticles ( _name = undefined, _count = false ) {



	}

		removeRange () {
			
		}
		removeAll () {
			
		}


	addParticles ( _settings ) {

		this.particles[ _settings.name ] 			= {};
		this.particles[ _settings.name ].p			= [];
		this.particles[ _settings.name ].update 	= _settings.update;
		this.particles[ _settings.name ].updateOut 	= _settings.updateOut;
		this.particles[ _settings.name ].draw 		= _settings.draw;

		if( _settings.globalUpdate && typeof _settings.globalUpdate == 'function' )
			this.particles[ _settings.name ].globalUpdate = _settings.globalUpdate;
		else
			this.particles[ _settings.name ].globalUpdate = false;


		for (var i = _settings.count - 1; i >= 0; i--) {

			this.particles[ _settings.name ].p.push( _settings.prop() );

		}

		
	}


	globalUpdate () {

		//pour chaques names
		for (var name in this.particles) {

			if( this.particles[name].globalUpdate && typeof this.particles[name].globalUpdate == 'function' )
				this.particles[name].globalUpdate();
			
		}

	}

	update () {

		//pour chaques names
		for (var name in this.particles) {

			//pour chaques particules dans le name
			for (let j = this.particles[name].p.length - 1; j >= 0; j--) {

				//je lance la fonction update avec en parametre les proprietes de la particules
				this.particles[name].p[j] = this.particles[name].update( this.particles[name].p[j], j );

			}
			
		}

	}


	draw () {

		this.ctx.fillStyle = "rgba( 0, 0, 0, 0.3 )";
		this.ctx.fillRect( 0, 0, oSize.w, oSize.h );

		//pour chaques names
		for (var name in this.particles) {

			//pour chaques particules dans le name
			for (let j = this.particles[name].p.length - 1; j >= 0; j--) {

				//je lance la fonction draw avec en parametre les proprietes de la particules
				this.particles[name].draw( this.particles[name].p[j], this.ctx );

			}
			
		}

	}


	run () {

		this.globalUpdate();
		this.update();
		this.draw();
		if( this.isRuning ) requestAnimationFrame( this.run.bind( this ) );

	}

	start () {
		this.isRuning = !this.isRuning;
		this.run();
	}

	stop () {
		this.isRuning = !this.isRuning;
	}

}