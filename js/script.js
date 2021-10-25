// todo используем полифил
require('es6-promise/auto');
import 'nodelist-foreach-polyfill';

// ! импортируем файлы и функцию используя ES6
import tabs from './modules/tabs';
import modal from './modules/modal';
import timer from './modules/timer';
import cards from './modules/cards';
import calc from './modules/calc';
import forms from './modules/forms';
import slider from './modules/slider';
import openModal from './modules/modal';

window.addEventListener('DOMContentLoaded', () => {
	// модалка появляется спустя время на сайте   // * перед функ пишем () => как бы обарачиваем функцию, чтобы она вызывалась только по клику
	const modalTimerId = setTimeout(() => openModal('.modal', modalTimerId), 50000);

	// ! в аргументы передаем селекторы, которые передаются потом в аргументы функций в других файлах js
	tabs('.tabheader__item', '.tabcontent', '.tabheader__items', 'tabheader__item_active');
	modal('[data-modal]', '.modal', modalTimerId);
	timer('.timer', '2021-12-31');
	cards();
	calc();
	forms('form', modalTimerId); // * modalTimerId передаю чтобы внутри модуля forms использовать
	slider({ // слайдер делаем по типу готовых решений slick  др
		container: '.offer__slider',
		nextArrow: '.offer__slider-next',
		prevArrow: '.offer__slider-prev',
		slide: '.offer__slide',
		totalCounter: '#total',
		currentCounter: '#current',
		wrapper: '.offer__slider-wrapper',
		field: '.offer__slider-inner'
	});
	
});