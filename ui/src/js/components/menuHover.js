

let menuHover = (() => {

	let $menuItems;


	let hover = ( e ) => {

		let $el = e.currentTarget;
		
	}

	let bind = () => {

		for (var i = 0; i < $menuItems.length; i++) {
			$menuItems[i].addEventListener('mouseenter', hover, false);
		}

	}

	let buildTxt = ( item ) => {

		
		let aStr = item.innerHTML.trim();
		let str = '';

		for (var i = 0; i < aStr.length; i++) {
			if( aStr[i] != ' ' ) str +=  '<span>' + aStr[i] + '</span>';
			else str += ' ';
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