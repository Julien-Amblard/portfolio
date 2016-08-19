

let menuHover = (() => {

	let $menuItems;


	let changeHomeColor  = ( e ) => {

		let $el = e.currentTarget;
		let color = parseInt( $el.getAttribute('data-color') );
		Events.emit('changeHomeColor', color );

	}

	let bind = () => {

		for (var i = 0; i < $menuItems.length; i++) $menuItems[i].addEventListener( 'mouseenter', changeHomeColor, false );

	}

	let buildTxt = ( item ) => {

		
		let aStr = item.innerHTML.trim();
		let str = '';

		for (var i = 0; i < aStr.length; i++) {
			if( aStr[i] !== ' ' ) str +=  '<span>' + aStr[i] + '</span>';
			else str += aStr[i];
		}

		item.innerHTML = str;

	}

	let init = () => {

		$menuItems = document.querySelectorAll('.menu li a');

		for (var i = 0; i < $menuItems.length; i++) buildTxt( $menuItems[i]  );

		bind();
		
	}

	init();


})();