'use strict';

var menuHover = function () {

	var $menuItems = void 0;

	var buildTxt = function buildTxt(item) {

		var aStr = item.innerHTML.trim();
		var str = '';

		for (var i = 0; i < aStr.length; i++) {
			if (aStr[i] !== ' ') str += '<span>' + aStr[i] + '</span>';else str += aStr[i];
		}

		item.innerHTML = str;
	};

	var init = function init() {

		$menuItems = document.querySelectorAll('.menu li a');

		for (var i = 0; i < $menuItems.length; i++) {
			buildTxt($menuItems[i]);
		}
	};

	init();
}();