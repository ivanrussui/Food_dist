// ? пишем функцию tabs и внутрь перемещаем участок кода с tabs из файла script.js
function tabs() {
	// ! Tabs
	const tabs = document.querySelectorAll('.tabheader__item'),
		tabsContent = document.querySelectorAll('.tabcontent'),
		tabsParent = document.querySelector('.tabheader__items');

	// скрыть все ненужные табы
	function hideTabContent() {
		// перебрать псевдомассив
		tabsContent.forEach((item) => {
			item.classList.add('hide');
			item.classList.remove('show', 'fade');
		});

		// скрыв, надо убрать у всех табов класс активности
		tabs.forEach((item) => {
			item.classList.remove('tabheader__item_active');
		});
	}

	// показывать табы
	function showTabContent(i = 0) {
		// надо понять к какому элементу обращаюсь
		tabsContent[i].classList.add('show', 'fade');
		tabsContent[i].classList.remove('hide');
		tabs[i].classList.add('tabheader__item_active');
	}

	hideTabContent();
	showTabContent();

	// вешаю обработчик, клик и колбэк. а в колбэк объект событие
	tabsParent.addEventListener('click', (event) => {
		// обращаю event.target в переменную это делается чтобы проще его было чаще использовать
		const target = event.target;
		// проверяю на таргет (переменная выше) потом таргет.класслист,
		// при помощи контэйнс определяю что точно кликнул в таб
		if (target && target.classList.contains('tabheader__item')) {
			// перебераю псевдомассив, колбэк(айтем - это каждый таб кот перебираю и ай...
			// ай отвечает за номер элемента по порядку)
			tabs.forEach((item, i) => {
				// если таргет (тот элем в кот кликнул) будет совпадать с тем элем кот перебираю
				if (target == item) {
					// то вызоваю 2 функ
					// скрываю все табы
					hideTabContent();
					// показываю только тот который совпадает и передаю ай... (ай номер элемента который совпал)
					showTabContent(i);
				}
			});
		}
	});
}

// ! экспортируем используя CommonJS
module.exports = tabs;