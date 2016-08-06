

let menuHover = (() => {

	let $menuItems;

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
		
	}

	init();


})();