// ? пишем функцию и внутрь перемещаем участок кода из файла script.js
function modal() {
	// ! Modal

	const modalTrigger = document.querySelectorAll('[data-modal]'),
		modal = document.querySelector('.modal');

	// пишу modalTrigger в функцию чтобы код не повторялся и переиспольз функцию
	function openModal() {
		modal.classList.add('show');
		modal.classList.remove('hide');
		// стиль блокирующий прокрутку при откр модальн окна
		document.body.style.overflow = 'hidden';
		// если пользователь открыл сам модалку то clearInterval чтобы не появлялась модалка
		clearInterval(modalTimerId); // ! специально временно коменчу чтобы не мешало
	}

	modalTrigger.forEach((btn) => {
		btn.addEventListener('click', openModal);
	});

	// пишу modalCloseBtn в функцию чтобы код не повторялся и переиспольз функцию ниже
	function closeModal() {
		modal.classList.add('hide');
		modal.classList.remove('show');
		// стиль вкл прокрутку при закр мод окна '' означ по умолч браузер сам подставит
		document.body.style.overflow = '';
	}

	// закрытие модалки при клике за пределы модалки
	modal.addEventListener('click', (e) => {
		// если е.таргет явлеется modal или е.таргет будет крестиком (получаем атрибут data-close) и равен пустой строке
		if (e.target === modal || e.target.getAttribute('data-close') == '') {
			closeModal(); // то мы закрывает модалку
		}
	});

	// закрытие модалки при нажатии Esc
	document.addEventListener('keydown', (e) => {
		// eventcode у Esc - Escape && чтобы функ closeModal() вызывалась только когда модальн окно открыто
		if (e.code === 'Escape' && modal.classList.contains('show')) {
			closeModal();
		}
	});

	// модалка появляется спустя время на сайте
	const modalTimerId = setTimeout(openModal, 50000);

	// функция появления модалки
	function showModalByScroll() {
		// если прокрученная часть + видимая часть на сайте без прокрутки >= полный сайт (полная прокрутка)
		if (
			window.pageYOffset + document.documentElement.clientHeight >=
			document.documentElement.scrollHeight
		) {
			openModal();
			// удаляем обработчик события чтобы работал только 1 раз
			window.removeEventListener('scroll', showModalByScroll);
		}
	}

	// модалка появляется когда юзер проскроллил сайт
	window.addEventListener('scroll', showModalByScroll);
}

// ! экспортируем используя CommonJS
module.exports = modal;