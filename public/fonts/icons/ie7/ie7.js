/* To avoid CSS expressions while still supporting IE 7 and IE 6, use this script */
/* The script tag referring to this file must be placed before the ending body tag. */

(function() {
	function addIcon(el, entity) {
		var html = el.innerHTML;
		el.innerHTML = '<span style="font-family: \'icomoon\'">' + entity + '</span>' + html;
	}
	var icons = {
		'fonticon-water-dropplet': '&#xe600;',
		'fonticon-tools': '&#xe601;',
		'fonticon-thermometer': '&#xe602;',
		'fonticon-rosito-bisani': '&#xe603;',
		'fonticon-rb-icon': '&#xe604;',
		'fonticon-pizza-oven': '&#xe605;',
		'fonticon-pasta': '&#xe606;',
		'fonticon-milk-pitcher': '&#xe607;',
		'fonticon-juicer': '&#xe608;',
		'fonticon-gelato': '&#xe609;',
		'fonticon-espresso-machine': '&#xe60a;',
		'fonticon-reale-logo': '&#xe60b;',
		'fonticon-facebook': '&#xe60c;',
		'fonticon-specialty-foodservice-equipment': '&#xe60e;',
		'fonticon-made-italy5': '&#xe60d;',
		'0': 0
		},
		els = document.getElementsByTagName('*'),
		i, attr, c, el;
	for (i = 0; ; i += 1) {
		el = els[i];
		if(!el) {
			break;
		}
		attr = el.getAttribute('data-icon');
		if (attr) {
			addIcon(el, attr);
		}
		c = el.className;
		c = c.match(/fonticon-[^\s'"]+/);
		if (c && icons[c[0]]) {
			addIcon(el, icons[c[0]]);
		}
	}
}());
