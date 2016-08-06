let rand = ( min, max ) => { return Math.random() * ( max - min) + min; };
let globalResize =  () => { oSize.w = canvas.width = window.innerWidth;  oSize.h = canvas.height = window.innerHeight; };
let oSize 	= {
	h : window.innerHeight,
	w : window.innerWidth
};
let log = (msg) => { console.log(msg) }
window.addEventListener( 'resize', globalResize, false);