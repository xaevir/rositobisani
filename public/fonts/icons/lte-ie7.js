/* Load this script using conditional IE comments if you need to support IE 7 and IE 6. */

window.onload = function() {
	function addIcon(el, entity) {
		var html = el.innerHTML;
		el.innerHTML = '<span style="font-family: \'icomoon\'">' + entity + '</span>' + html;
	}
	var icons = {
			'fonticon-tools' : '&#xe000;',
			'fonticon-espresso-machine' : '&#xe001;',
			'fonticon-gelato' : '&#xe002;',
			'fonticon-pizza-oven' : '&#xe003;',
			'fonticon-pasta' : '&#xe004;',
			'fonticon-juicer' : '&#xe005;',
			'fonticon-water-dropplet' : '&#xe006;',
			'fonticon-thermometer' : '&#xe007;',
			'fonticon-milk-pitcher' : '&#xe008;',
			'fonticon-facebook' : '&#xe009;',
			'fonticon-rb-filled' : '&#xe00b;',
			'fonticon-rb-circle' : '&#xe00a;'
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
};