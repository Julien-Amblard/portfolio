

let homeOut = (() => {

	let ix = 5;
	let iy = 5;

	let bloc = {
		ix 		: ix,
		iy 		: iy,
		w 		: 100 / ix,
		h 		: 100 / iy,
		a 		: []
	}

	let draw = ( _canvas ) => {


	}

	let build = () => {

		for (var i = 0; i < iy; i++) {
			for (var j = 0; j < ix; j++) {

				(( y, x ) => {

					let o = {
						e 			: document.createElement('div'),
						x 			: bloc.w * x,
						y 			: bloc.h * y
					}

					o.e.id 					= 'homeOutBloc-' + x + '-' + y;
					o.e.className 			= 'homeOutBloc homeOutBloc-' + x + '-' + y;
					o.e.style.position 		= 'absolute';
					o.e.style.left 			= o.x + '%';
					o.e.style.top 			= o.y + '%';
					o.e.style.width 		= bloc.w + '%';
					o.e.style.height		= bloc.h + '%';

					bloc.a.push( o );

					document.body.appendChild( o.e );

				})( i, j );

			}
		}

	}

	let toggleClass = ( e ) => {

		let delays = .5 / bloc.a.length;
		let adelays = [];

		for (var i = 0; i < bloc.a.length; i++) {
			adelays.push( delays * i );
		}

		for (var i = 0; i < bloc.a.length; i++) {

			(( el ) => {

				let rx = Math.floor( rand( -40, 40 ) );
				let ry = Math.floor( rand( -50, 50 ) );
				let rz = Math.floor( rand( -20, 20 ) );
				let s  = rand( 0.5, 0.7 );
				let d  = Math.floor( rand( 0, adelays.length ) );
				let delay = adelays[d];
				adelays.splice( d, 1 );

				el.classList.toggle('out');

				if( el.classList.contains('out') ){
					el.style.transform 	= `rotateX( ${rx}deg ) rotateY( ${ry}deg ) rotateZ( ${rz}deg ) scale( ${s} )`;
					//el.style.transitionDelay = delay + 's';
				}
				else{
					el.style.transform  = '';
				}

			})( bloc.a[i].e )
			
		}
		console.log(adelays  )
	}

	let bind = () => {
		for (var i = 0; i < bloc.a.length; i++) {
			bloc.a[i].e.addEventListener('click', toggleClass, false );
		}
	}

	let init = () => {
		build();
		bind();
	}

	init();

	return {
		build, 
		bloc,
		draw
	}

})();