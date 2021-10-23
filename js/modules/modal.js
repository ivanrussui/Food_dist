function closeModal(modalSelector) {
	// ! чтобы получить аргумент-селектор
	const modal = document.querySelector(modalSelector);

	modal.classList.add('hide');
	modal.classList.remove('show');
	// стиль вкл прокрутку при закр мод окна '' означ по умолч браузер сам подставит
	document.body.style.overflow = '';
}

function openModal(modalSelector, modalTimerId) { // * modalTimerId передаем в аргумент
	// ! чтобы получить аргумент-селектор
	const modal = document.querySelector(modalSelector);

	modal.classList.add('show');
	modal.classList.remove('hide');
	// стиль блокирующий прокрутку при откр модальн окна
	document.body.style.overflow = 'hidden';

	console.log(modalTimerId);
	// если modalTimerId был передан, то тогда запускаем clearInterval
	if (modalTimerId) {
		clearInterval(modalTimerId);
	}
}

// ? пишем функцию и внутрь перемещаем участок кода из файла script.js
function modal(triggerSelector, modalSelector, modalTimerId) { // ! передаем аргументы которые принимают селекторы из файла scripts.js и modalTimerId(он выше в коде)

	// ! селекторы идут как аргументы функции
	const modalTrigger = document.querySelectorAll(triggerSelector),
		modal = document.querySelector(modalSelector);

	modalTrigger.forEach((btn) => {	// * мы передаем в функцию modalSelector и поэтому перед функ пишем () => как бы обарачиваем функцию, чтобы она вызывалась только по клику
		btn.addEventListener('click', () => openModal(modalSelector, modalTimerId));
	});

	// закрытие модалки при клике за пределы модалки
	modal.addEventListener('click', (e) => {
		// если е.таргет явлеется modal или е.таргет будет крестиком (получаем атрибут data-close) и равен пустой строке
		if (e.target === modal || e.target.getAttribute('data-close') == '') {
			closeModal(modalSelector); // то мы закрывает модалку
		}
	});

	// закрытие модалки при нажатии Esc
	document.addEventListener('keydown', (e) => {
		// eventcode у Esc - Escape && чтобы функ closeModal() вызывалась только когда модальн окно открыто
		if (e.code === 'Escape' && modal.classList.contains('show')) {
			closeModal(modalSelector);
		}
	});

	// функция появления модалки
	function showModalByScroll() {
		// если прокрученная часть + видимая часть на сайте без прокрутки >= полный сайт (полная прокрутка)
		if (
			window.pageYOffset + document.documentElement.clientHeight >=
			document.documentElement.scrollHeight
		) {
			openModal(modalSelector, modalTimerId);
			// удаляем обработчик события чтобы работал только 1 раз
			window.removeEventListener('scroll', showModalByScroll);
		}
	}

	// модалка появляется когда юзер проскроллил сайт
	window.addEventListener('scroll', showModalByScroll);
}

// ! экспортируем используя ES6
export default modal; // ? экспорт по умолчанию
export {closeModal}; // ? экспорт именнованый
export {openModal};