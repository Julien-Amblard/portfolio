let home = ( () => {

	let rMax 			= 3.1;//rotation max
	let rMin 			= 1.5;//rotation min
	let count 			= 3000;//nb particules
	let r 				= oSize.w * 2.3;//teinte de la couleur
	let color 			= ', 100%, 70%';//couleur
	let colorH			= rand( 190, 210);//saturation hsla
	let centerVariable	= 5;
	let aParticlesType 	= [

		[ r *.4, r *.401 ],
		[ r *.4, r *.401 ],

		[ r *.45, r *.47 ],

		[ r *.401, r *.48 ],
		[ r *.401, r *.48 ],

		[ r *.48, r *.59 ],

	];
	let relativeDist = ( r *.59 ) - ( r *.4 );
	

	let props = () => {

		
		let type 	= Math.floor( rand( 0, aParticlesType.length ) );//type de distance
		let ro 		= rand( rMin, rMax );//rotation de la particule par rapport au centre
		let cX 		= oSize.w * 1.1 + rand( -centerVariable, centerVariable );//on definie un centre un peu random par rapport au centre
		let cY 		= -(oSize.w * .2 ) + rand( -centerVariable, centerVariable );//on definie un centre un peu random par rapport au centre
		let dist 	= rand( aParticlesType[type][0], aParticlesType[type][1] );//distance du centre
		let pcDist	= ( ( dist - aParticlesType[type][0] ) / relativeDist ) * 100;
		let x 		= cX + ( dist * Math.cos( ro ) );///calculuer position autour d'un cercle : x = centerX + ( rayon * Math.cos( angle ) );
		let y 		= cY + ( ( dist - 300 ) * Math.sin( ro ) );///calculuer position autour d'un cercle : y = centerY + ( rayon * Math.sin( angle ) );
		let speedUp	= .5 * ( pcDist / 100 );

		return {
			x 		: x,
			y 		: y,
			tx 		: x,
			ty 		: y,
			tx2 	: x,
			ty2 	: y,
			r 		: 	rand( 0, 1 ), //largeur du trait
			a 		:   0,	//alpha
			ta 		:   rand( 1, 8 ) / 10,//targeted alpha
			life 	: 	rand( 70, 100 ),
			dist 	: 	dist,
			speed 	: 	rand( 0.00015, 0.0002 ) + ( speedUp / 1000 ),
			cX 		: 	cX,
			cY 		: 	cY,
			rMax 	: 	rMax,
			rMin 	: 	rMin,
			ro 		:   ro
		}

	}


	let globalUpdate = () => {

		colorH = ( colorH > 360 ) ? 0 : ( colorH + .05 );

	}


	let update = ( p ) => {

		//decrease his life
		p.life -= 0.1;

		if ( p.ro > p.rMax || p.ro < p.rMin ) 
			p.life = 0;
		else 
			p.ro += p.speed;
		

		//update pos
		p.tx2 = p.tx1;
		p.ty2 = p.ty1;
		p.tx1 = p.tx;
		p.ty1 = p.ty;
		p.tx = p.x;
		p.ty = p.y;
		p.x = p.cX + (p.dist*Math.cos( p.ro ));
		p.y = p.cY + ((p.dist - 300)*Math.sin( p.ro ));


		//if gonna die
		if( p.life <= 0 ){

			//if no alpha, you die
			if( p.a <= 0 ){
				//good bye my friend
				p = props();

			}else{
				//decrease his alpha
				p.a -= 0.05;
			}
		//if not gonna die
		}else{
			//and you just born, you can appear my baby
			if( p.a < p.ta )
				p.a += 0.005;

		}

		return p;
	}

	let draw = ( p, ctx ) => {


  		ctx.beginPath();
		ctx.moveTo( p.tx1, p.ty1 );
		ctx.lineTo( p.x, p.y);
		ctx.lineWidth = p.r * 2;
		ctx.strokeStyle = 'hsla( ' + colorH + color + ', ' + ( p.a - .2 ) + ' )';
		ctx.stroke();


		ctx.beginPath();
		ctx.moveTo( p.tx1, p.ty1 );
		ctx.lineTo( p.x, p.y);
		ctx.lineWidth = p.r;
		ctx.strokeStyle = 'hsla( ' + colorH + color + ', ' + p.a + ' )';
		ctx.stroke();


		ctx.beginPath();
		ctx.moveTo( p.tx2, p.ty2 );
		ctx.lineTo( p.x, p.y);
		ctx.lineWidth = p.r / 2;
		ctx.strokeStyle = 'hsla( ' + colorH + color + ', ' + ( p.a + .2 ) + ' )';
		ctx.stroke();

	}

	return {
		name 			: 'home',
		count 			: count,
		update 			: update,
		globalUpdate 	: globalUpdate,
		draw 			: draw,
		prop  			: props
	}
	
})();