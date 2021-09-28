window.addEventListener('DOMContentLoaded', () => {
	// Tabs
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
		// формат постарее, в вызове функции передается номер элемента 0
		// function showTabContent(i) {

		// надо понять к какому элементу обращаюсь
		tabsContent[i].classList.add('show', 'fade');
		tabsContent[i].classList.remove('hide');
		tabs[i].classList.add('tabheader__item_active');
	}

	hideTabContent();

	showTabContent();
	// формат постарее, в функ showTabContent передаем аргументом тот номер элемента кот должен быть по умолч активным
	// showTabContent(0);

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
					// покажываю только тот который совпадает и передаю ай... (ай номер элемента который совпал)
					showTabContent(i);
				}
			});
		}
	});

	// Timer

	// переменная определяющая дедлайн
	const deadline = '2021-07-31';

	// функция определяющая разницу между дедлайном и текущим временем
	function getTimeRemaining(endtime) {
		// парсим то что будет приходить в виде строки из deadline
		// получим колич милисек кот будет в конечном времени; отнимаем нашу тек дату в колич милисек
		const t = Date.parse(endtime) - Date.parse(new Date()),
			// необходимо посчитать кол дней кот бу отображ в таймере
			// нужно взять кол милисек и разделить на кол милисек которые нах в 1 дне и надо бу округлить,
			//  чтобы не было дробных значений
			// Math.floor() округление до ближайшего целого
			days = Math.floor(t / (1000 * 60 * 60 * 24)),
			// часы если больше 24 должны % остатком от деления переноситься в дни я так понимаю
			hours = Math.floor((t / (1000 * 60 * 60)) % 24),
			minutes = Math.floor((t / 1000 / 60) % 60),
			seconds = Math.floor((t / 1000) % 60);

		//  чтобы использовать переменные выше глобально, возращаем их
		return {
			total: t,
			days: days,
			hours: hours,
			minutes: minutes,
			seconds: seconds,
		};
	}

	// функ добавляет 0 перед числами меньше 10ти
	function getZero(num) {
		if (num >= 0 && num < 10) {
			return `0${num}`;
		} else {
			return num;
		}
	}

	// функция устанавливающая таймер на страницу
	function setClock(selector, endtime) {
		const timer = document.querySelector(selector),
			days = timer.querySelector('#days'),
			hours = timer.querySelector('#hours'),
			minutes = timer.querySelector('#minutes'),
			seconds = timer.querySelector('#seconds'),
			// созд перем для обнов таймера каждую секунду. в него функцию обнов таймер помещаем
			timeInterval = setInterval(updateClock, 1000);

		// запускаем функцию чтобы при загружки страницы при 0 секунде не было даты из верстки
		updateClock();

		// функция обновляющая таймер каждую секунду
		function updateClock() {
			// расчет времени котор осталось прямо на эту секунду/ получаем из функции getTimeRemaining
			const t = getTimeRemaining(endtime);

			// помещаем расчетные величины на страницу
			// можно через иннерХТМЛ а можно текстКонтент
			days.innerHTML = getZero(t.days);
			hours.innerHTML = getZero(t.hours);
			minutes.innerHTML = getZero(t.minutes);
			seconds.innerHTML = getZero(t.seconds);

			// остановка таймера
			if (t.total <= 0) {
				// встроенная функция (переменная timeInterval)
				clearInterval(timeInterval);
			}
		}
	}

	setClock('.timer', deadline);

	// Modal

	const modalTrigger = document.querySelectorAll('[data-modal]'),
		modal = document.querySelector('.modal');

	// modalTrigger.forEach(btn => {
	//   btn.addEventListener('click', () => {
	//     modal.classList.add('show');
	//     modal.classList.remove('hide');
	// 		// стиль блокирующий прокрутку при откр модальн окна
	// 		document.body.style.overflow = 'hidden';
	//   });
	// });

	// пишу modalTrigger в функцию чтобы код не повторялся и переиспольз функцию
	function openModal() {
		modal.classList.add('show');
		modal.classList.remove('hide');
		// стиль блокирующий прокрутку при откр модальн окна
		document.body.style.overflow = 'hidden';
		// если пользователь открыл сам модалку то clearInterval чтобы не появлялась модалка
		clearInterval(modalTimerId);
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

	// альтернатива методов modalTrigger и modalCloseBtn выше с тоггл
	// modalTrigger.forEach((modalTrigger) => {
	//   modalTrigger.addEventListener('click', () => {
	// 		modal.classList.toggle('show');
	// 		// стиль блокирующий прокрутку при откр модальн окна
	// 		document.body.style.overflow = ' hidden';
	//   });
	// });

	// modalCloseBtn.addEventListener('click', () => {
	// 	modal.classList.toggle('show');
	// 	// стиль вкл прокрутку при закр мод окна '' означ по умолч браузер сам подставит
	// 	document.body.style.overflow = '';
	// });

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

	// Использую классы для карточек

	// получаю карточки
	class MenuCard {
		// путь к картинке, альт текст, заголовок, описание, цена, родитель куда помещаются карточки
		// ...classes это rest оператор
		constructor(src, alt, title, descr, price, parentSelector, ...classes) {
			this.src = src;
			this.alt = alt;
			this.title = title;
			this.descr = descr;
			this.price = price;
			// передаем рекст оператор, он передается как массив
			this.classes = classes;
			//  в this.parent кладем ДОМ элемент
			this.parent = document.querySelector(parentSelector); // можно так же в render() делать
			// для курса валют
			this.transfer = 27;
			// вызываем метод конвертации валюты
			this.changeToUAH(); // его можно было так же и в методе render() вызывать
		}

		// метод конвертации валют
		changeToUAH() {
			// умножаем цену на курс
			this.price = this.price * this.transfer;
			// можно написать +this.price чтобы строка преобразовывалась в число
			// this.price = +this.price * this.transfer;
		}

		render() {
			// метод конвертации валют changeToUAH() можно и тут вызвать. или в конструкторе

			// тут пишем верстку
			// создаем див
			const element = document.createElement('div');

			// назначаем классы this.classes который через rest оператор записан

			// если в ...classes ничего не передается, то присваиваем класс menu__item
			if (this.classes.length === 0) {
				// element.classList.add('menu__item'); // так можно но есть круче способ ниже

				// записываем класс menu__item в свойства this.element
				this.element = 'menu__item';
				element.classList.add(this.element);
			} else {
				// className называем каждый элемент внутри массива. className это аргумент => функции
				this.classes.forEach((className) => element.classList.add(className)); // element это переменная которая выше создана
			}

			element.innerHTML = `
				<img src=${this.src} alt=${this.alt}>
				<h3 class="menu__item-subtitle">${this.title}</h3>
				<div class="menu__item-descr">${this.descr}</div>
				<div class="menu__item-divider"></div>
				<div class="menu__item-price">
					<div class="menu__item-cost">Цена:</div>
					<div class="menu__item-total"><span>${this.price}</span> грн/день</div>
				</div>
			`;
			// наш новый созданный ДОМ элемент помещаем в element
			this.parent.append(element);
		}
	}

	// функция для получения данных с сервера
	const getResource = async (url) => { // url кот передается в fetch, data нет т.к. ниче не отправляем
		// обрабатываем данные которые пришли
		// await как бы (наподобие) делает синхронным, говорит надо дождаться
		const res = await fetch(url);

		// fetch если столкнет с ошибкой http 404 и др. он не выдаст ошибку-catch-reject
		// ошибкой для fetch будет отсутствие инета и др. поэтому надо такое поведение обработать
		if (!res.ok) { // если в запросе что-то не так
			throw new Error(`Cloud not fetch ${url}, status: ${res.status}`); // выбрасываем ошибку()
		}

		// возвращаем как json формат
		return await res.json(); // res это промис
	};

	// создание элементов динамически:

	// ! вместо вариантов ниже пишу через библиотеку axios
	axios.get('http://localhost:3000/menu')
		.then(data => {
			data.data.forEach(({
				img,
				altimg,
				title,
				descr,
				price
			}) => { // используем дестуктуризацию - получаем значения ключей
				new MenuCard(img, altimg, title, descr, price, '.menu .container').render(); // вызваем конструктор MenuCard(в конце 'куда вставляем в верстку').метод render()
			});
		});

	// 1) вариант классами видимо
	// getResource('http://localhost:3000/menu') // url берем из терминала
	// 	.then(data => {	// данные приходящие с сервера, приходят как массив
	// 		data.forEach(({img, altimg, title, descr, price}) => { // используем дестуктуризацию - получаем значения ключей
	// 			new MenuCard(img, altimg, title, descr, price, '.menu .container').render(); // вызваем конструктор MenuCard(в конце 'куда вставляем в верстку').метод render()
	// 		});
	// 	});

	// // 2) вариант отличие в том, что он не использует классы, а формирует верстку на лету
	// // здесь нет шаблонизации, катит если надо только 1н раз что-то построить
	// getResource('http://localhost:3000/menu') // url берем из терминала
	// 	.then(data => createCard(data)); // .then(данные => функция(данные))

	// function createCard(data) { // функция создающая карточку
	// 	data.forEach((({img, altimg, title, descr, price}) => { // дестуктуризация
	// 		const element = document.createElement('div'); // создаем элемент
	// 		element.classList.add('menu__item'); // добавляем класс

	// 		// вставляем верстку 
	// 		element.innerHTML = ` 
	// 			<img src=${img} alt=${altimg}>
	// 			<h3 class="menu__item-subtitle">${title}</h3>
	// 			<div class="menu__item-descr">${descr}</div>
	// 			<div class="menu__item-divider"></div>
	// 			<div class="menu__item-price">
	// 				<div class="menu__item-cost">Цена:</div>
	// 				<div class="menu__item-total"><span>${price * 27}</span> грн/день</div>
	// 			</div>
	// 		`;

	// 		// получаем селектор и аппендим-вставляем(созданный элемент)
	// 		document.querySelector('.menu .container').append(element);
	// 	}));
	// }



	// теперь не рабтает тк данные карточки приходят из БД
	// ровняю среднюю карточку с крайними, она короче получалась. сделал неск вариантов
	// const menuItem = document.querySelectorAll('.menu__item-descr');
	// // const menuItem = document.querySelectorAll('.menu__item-divider');

	// // menuItem[1].style.padding = '0 21px';
	// // menuItem[1].style.marginTop = '59px';

	// menuItem.forEach(element => {
	// 	element.style.padding = '0 21px';
	// });



	// Forms
	// реализуем отправку данных форм, т.к. их 2 то делаем чер функ

	// получаем формы
	const forms = document.querySelectorAll('form');

	// объект который будет вводть юзеру сообщение в зависимости от ситуации
	const message = {
		loading: 'img/form/spinner.svg',
		succes: 'Спасибо! Скоро мы с вами свяжемся',
		failure: 'Что-то пошло не так...'
	};

	// подвязываем под все формы bindPostData
	forms.forEach(item => {
		bindPostData(item);
	});

	// функция отвечающая за постинг данных
	// async говорит что будет асинхронный код
	// async await всегда используются в паре
	const postData = async (url, data) => { // url кот передается в fetch, data данные которые будут поститься
		// обрабатываем данные которые пришли
		// await как бы (наподобие) делает синхронным, говорит надо дождаться
		const res = await fetch(url, { // fetch(url чтобы ссылаться на сервер)
			method: 'POST', // метод
			headers: { // заголовки
				'Content-type': 'application/json'
			},
			body: data // то тело которое мы будем отправлять
		});
		// возвращаем как json формат
		return await res.json(); // res это промис
	};

	// функция отвечающая за привязку постинга
	function bindPostData(form) {
		// событие 'submit', (объект событие) срабатывает каждый раз когда пытаемся отправить форму
		form.addEventListener('submit', (e) => {
			// отменяем стандартное поведение браузера
			e.preventDefault(); // надо писать в начале

			// при отправки запроса юзера будем уведомлять
			// создаем img
			const statusMessage = document.createElement('img');
			// обращаемся к атрибуту
			statusMessage.src = message.loading;
			// как только отправили запрос нажали submit (кнопку отправки формы)  (увидит тока если медленный интернет)
			statusMessage.style.cssText = `
				display: block;
				margin: 0 auto;
			`;

			// отправляем на страницу statusMessage
			// form.append(statusMessage); // тут спинер ломает внизу верстку где форма не в модалке
			// аппендит спинер не в саму форму а после нее. в модалке ниче не поменяется
			// insertAdjacentElement('куда вставляем afterend это после формы', что нужно вставить)
			form.insertAdjacentElement('afterend', statusMessage);


			// работа с сервером fetch api

			// 		// 1) через FormData
			// 		// в перемен конструктор FormData(форма из которой нужно собрать данные)
			// 		const formData = new FormData(form); // ! важно чтобы в верстке у input были атрибуты name


			// 		// работаем с fetch(будем обращаться к server.php)
			// 		fetch('server.php', {
			// 			method: 'POST', // метод
			// 			body: formData // то тело которое мы будем отправлять
			// 		})
			// 		.then(data => data.text()) // модифицируем ответ чтобы он пришел как текст
			// 		.then(data => { // обрабатываем результат запроса через промисы
			// 			// с сервера вернется data
			// 			console.log(data);
			// 			// когда мы сделали запрос и все успешно пришло выводим сообщение succes: 'Спасибо! Скоро мы с вами свяжемся'
			// 			showThanksModal(message.succes);
			// 			// удаляем statusMessage со страницы
			// 			statusMessage.remove();
			// 		}).catch(() => {  // пишем операцию которая соотвествует ошибке
			// catch() есть особенность если к примеру указать путь к серверу не тот, то он все равно выполнит resolve. а вот если к примеру нет сети 404 ошибка и тогда он выполнит reject
			// 			// выводим сообщение failure: 'Что-то пошло не так...'
			// 			showThanksModal(message.failure);
			// 		}).finally(() => { // действие которое будет выполняться всегда вне зависимости от результата
			// 			// очистка формы после успешной отправки
			// 			form.reset(); // обращаемся к форме и метод reset() очищает ее. альтернатива это в этой форме перебрать инпуты и очистить их вэлью
			// 		});
			// 	});
			// }


			// 2) через JSON
			// в перемен конструктор FormData(форма из которой нужно собрать данные)
			// берем formData которая собрала все данные с формы
			const formData = new FormData(form); // ! важно чтобы в верстке у input были атрибуты name

			// entries() превращает объект в массив массивов т.е. в матрицу
			// fromEntries() делает обратно из матрицы в объект
			// данные с формы полученные выше превращаем в матрицу, после в классический объект, а после в JSON
			const json = JSON.stringify(Object.fromEntries(formData.entries()));

			// JSON полученный выше отправляем на сервер
			postData('http://localhost:3000/requests', json) // (url, body который пойдет на сервер)
				.then(data => { // обрабатываем результат запроса через промисы
					// с сервера вернется data
					console.log(data);
					// когда мы сделали запрос и все успешно пришло выводим сообщение succes: 'Спасибо! Скоро мы с вами свяжемся'
					showThanksModal(message.succes);
					// удаляем statusMessage со страницы
					statusMessage.remove();
				}).catch(() => { // пишем операцию которая соотвествует ошибке
					// catch() есть особенность если к примеру указать путь к серверу не тот, то он все равно выполнит resolve. а вот если к примеру нет сети 404 ошибка и тогда он выполнит reject
					// выводим сообщение failure: 'Что-то пошло не так...'
					showThanksModal(message.failure);
				}).finally(() => { // действие которое будет выполняться всегда вне зависимости от результата
					// очистка формы после успешной отправки
					form.reset(); // обращаемся к форме и метод reset() очищает ее. альтернатива это в этой форме перебрать инпуты и очистить их вэлью
				});
		});
	}


	// функция показывает модалку с благодарностью юзеру/ message это будет сообщ кот будет показ юзеру о статусе отправки
	function showThanksModal(message) { // message будем брать из const message котор выше писали при отправке запросов
		const prevModalDialog = document.querySelector('.modal__dialog');

		// скрываем этот блок (не удаляем т к юзер может открыть модалку и попытаться отправить форму)
		prevModalDialog.classList.add('hide');


		// задача открыть класс модал и сформировать структуру внутри

		// открываем модалку openModal() есть выше в коде когда писали модалку
		openModal();

		// нужно создать блок обвертка
		const thanksModal = document.createElement('div'); // создаем див
		// добавляем класс. по сути заменяем класс тот что выше скрыли
		thanksModal.classList.add('modal__dialog');
		// формируем внутри верстку
		thanksModal.innerHTML = `
			<div class='modal__content'>
				<div class='modal__close' data-close>×</div>
				<div class='modal__title'>${message}</div>
			</div>
		`;
		// помещаем на страницу thanksModal
		document.querySelector('.modal').append(thanksModal);

		// нужно чтобы все через время возвращалось обратно
		setTimeout(() => {
			thanksModal.remove(); // убирать thanksModal
			// показывать предидущий контент
			prevModalDialog.classList.add('show'); // доб класс show
			prevModalDialog.classList.remove('hide'); // убир класс hide
			closeModal(); // закр мод окно
		}, 2000);
	}

	// // работа с базой данных
	// fetch('http://localhost:3000/menu') // обращаемся db.json 'адрес при запуске сервера npx json-server db.json'
	// 	.then(data => data.json()) // data ответ от сервера превращаем в json объект
	// 	.then(res => console.log(res));

	// ! Slider

	const slides = document.querySelectorAll('.offer__slide'),
		slider = document.querySelector('.offer__slider'),
		prev = document.querySelector('.offer__slider-prev'),
		next = document.querySelector('.offer__slider-next'),
		total = document.querySelector('#total'),
		current = document.querySelector('#current'),
		slidesWrapper = document.querySelector('.offer__slider-wrapper'),
		slidesField = document.querySelector('.offer__slider-inner'),
		width = window.getComputedStyle(slidesWrapper).width; // получаем compluted style (стили от css)

	// индекс определяющий текущее положение в слайдере
	let slideIndex = 1; // 1 тк в прогр идет с 0
	// отступ чтобы понимать какой слайд показывается
	let offset = 0; // насколько мы отступили

	// условие чтобы подставлялся динамически тотал - сколько всего слайдов
	if (slides.length < 10) {
		total.textContent = `0${slides.length}`;
		current.textContent = `0${slideIndex}`;
	} else {
		total.textContent = slides.length;
		current.textContent = slideIndex;
	}

	// устанавливаем ширину
	slidesField.style.width = 100 * slides.length + '%';
	slidesField.style.display = 'flex';
	slidesField.style.transition = '0.5s all';

	slidesWrapper.style.overflow = 'hidden';


	// перебираем слайды чтобы каждому задать ширину
	slides.forEach(slide => {
		slide.style.width = width;
	});

	slider.style.position = 'relative';

	// обвертка для всех точек (элем навигаци) и их стилизация
	const indicators = document.createElement('ol'),
		// ! созд массив, потом в него будем пушить наши дотсы; потом в условии перекл дотсы
		dots = [];

	indicators.classList.add('carousel-indicators');
	indicators.style.cssText = `
		position: absolute;
		right: 0;
		bottom: 0;
		left: 0;
		z-index: 15;
		display: flex;
		justify-content: center;
		margin-right: 15%;
		margin-left: 15%;
		list-style: none;
	`;
	slider.append(indicators); // помещаем обвертку внутрь сладера

	// создаем с помощью цикла несколько точек
	for (let i = 0; i < slides.length; i++) {
		const dot = document.createElement('li'); // создаем точки
		// ! задаем атрибут,  i + 1 будет добавлять число к атрибуту начиная с 1
		dot.setAttribute('data-slide-to', i + 1);

		// стилизуем точки
		dot.style.cssText = `
			box-sizing: content-box;
			flex: 0 1 auto;
			width: 30px;
			height: 6px;
			margin-right: 3px;
			margin-left: 3px;
			cursor: pointer;
			background-color: #fff;
			background-clip: padding-box;
			border-top: 10px solid transparent;
			border-bottom: 10px solid transparent;
			opacity: .5;
			transition: opacity .6s ease;
		`;

		// когда i == 0 меняем опасити на 1
		if (i == 0) {
			dot.style.opacity = 1;
		}

		// вставляем точки внутрь indicators
		indicators.append(dot);
		// ! в массив dots пушим dot 
		dots.push(dot);
	}

	next.addEventListener('click', () => {
		// если ушли в правую границу (конец слайдера) то перемещаемся в начало
		if (offset == +width.slice(0, width.length - 2) * (slides.length - 1)) {
			offset = 0;
		} else {
			// когда мы нажимаем на стрелку вправо,то к offset будет прибавляться ширина еще одного слайда и слайд будет смещаться
			offset += +width.slice(0, width.length - 2);
		}

		// сдвигаем слайд
		slidesField.style.transform = `translateX(-${offset}px)`;

		// контролируем слайдиндекс
		if (slideIndex == slides.length) {
			slideIndex = 1;
		} else {
			slideIndex++;
		}

		// в зависимости от контроля слайдиндекс меняем значение где цифры
		if (slides.length < 10) {
			current.textContent = `0${slideIndex}`;
		} else {
			current.textContent = slideIndex;
		}

		// ! у массива дотс изначально будет у каждого дот
		dots.forEach(dot => dot.style.opacity = '.5');
		// ! далее опасити меняем / идет поведение как выше у slides.length - 1
		dots[slideIndex - 1].style.opacity = 1;
	});

	prev.addEventListener('click', () => {
		if (offset == 0) { // тут сравниваем
			// а тут присваиваем
			offset = +width.slice(0, width.length - 2) * (slides.length - 1);
		} else {
			offset -= +width.slice(0, width.length - 2);
		}

		// сдвигаем слайд
		slidesField.style.transform = `translateX(-${offset}px)`;

		// контролируем слайдиндекс
		if (slideIndex == 1) {
			slideIndex = slides.length;
		} else {
			slideIndex--;
		}

		// в зависимости от контроля слайдиндекс меняем значение где цифры
		if (slides.length < 10) {
			current.textContent = `0${slideIndex}`;
		} else {
			current.textContent = slideIndex;
		}

		// ! у массива дотс изначально будет у каждого дот
		dots.forEach(dot => dot.style.opacity = '.5');
		// ! далее опасити меняем / идет поведение как выше у slides.length - 1
		dots[slideIndex - 1].style.opacity = 1;
	});

	// пишем переключение слайдов (с нумерацией) при кликах на dots реализовываем через  объект событие и атрибут
	dots.forEach(dot => {
		dot.addEventListener('click', (e) => {
			const slideTo = e.target.getAttribute('data-slide-to');

			// ! ниже все меняем при изменение slideTo (кликнули на 4 и цифрра сменилась на 4)
			slideIndex = slideTo;
			offset = +width.slice(0, width.length - 2) * (slideTo - 1);

			slidesField.style.transform = `translateX(-${offset}px)`;

			if (slides.length < 10) {
				current.textContent = `0${slideIndex}`;
			} else {
				current.textContent = slideIndex;
			}

			dots.forEach(dot => dot.style.opacity = '.5');
			dots[slideIndex - 1].style.opacity = 1;

		});
	});


	// ! ниже вариант слайера попроще
	// // инициализируем слайдер, чтобы он вначале появился
	// showSlides(slideIndex);

	// // условие чтобы подставлялся динамически тотал - сколько всего слайдов
	// if (slides.length < 10) {
	// 	total.textContent = `0${slides.length}`;
	// }	else {
	// 	total.textContent = slides.length;
	// }

	// // функция показа и скрытия слайдов
	// function showSlides(n) { // n это наш слайд индекс
	// 	// если ушли в правую границу (конец слайдера) то перемещаемся в начало
	// 	if (n > slides.length) { 
	// 		slideIndex = 1;
	// 	}

	// 	// если ушли в левую границу (начало слайдера) то перемещаемся в конец
	// 	if ( n < 1) {
	// 		slideIndex = slides.length;
	// 	}

	// 	// скрываем все слайды кроме того который должен быть
	// 	slides.forEach(item => item.style.display = 'none'); // тут скрываем все слайды

	// 	slides[slideIndex - 1].style.display = 'block'; // тут показываем нужный слайд

	// 	// условие чтобы подставлялся динамически current - какой сечас по счету слайд
	// 	if (slides.length < 10) {
	// 		current.textContent = `0${slideIndex}`;
	// 	}	else {
	// 		current.textContent = slideIndex;
	// 	}
	// }

	// // функция изменяющая слайд индекс
	// function plusSlides(n) {
	// 	showSlides(slideIndex += n); // вызываем функцию showSlides  += n тут приходит условие из функ showSlides
	// }

	// prev.addEventListener('click', () => {
	// 	plusSlides(-1); // минус 1 слайд
	// });

	// next.addEventListener('click', () => {
	// 	plusSlides(1); // плюс 1 слайд
	// });
});