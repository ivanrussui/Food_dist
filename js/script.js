window.addEventListener('DOMContentLoaded', () => {
	// ! импортируем файлы используя CommonJS
	const tabs = require('./modules/tabs'),
		modal = require('./modules/modal'),
		timer = require('./modules/timer'),
		cards = require('./modules/cards'),
		calc = require('./modules/calc'),
		forms = require('./modules/forms'),
		slider = require('./modules/slider');

		// todo вызываем в качестве функций
		tabs();
		modal();
		timer();
		cards();
		calc();
		forms();
		slider();
});