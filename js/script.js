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
    modal = document.querySelector('.modal'),
    modalCloseBtn = document.querySelector('[data-close]');

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

  modalCloseBtn.addEventListener('click', closeModal);

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
    if (e.target === modal) {
      closeModal();
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
  const modalTimerId = setTimeout(openModal, 5000);

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
			<!-- убираем обвертку div class="menu__item", она будет ниже в new MenuCard()-->
				<img src=${this.src} alt=${this.alt}>
				<h3 class="menu__item-subtitle">${this.title}</h3>
				<div class="menu__item-descr">${this.descr}</div>
				<div class="menu__item-divider"></div>
				<div class="menu__item-price">
					<div class="menu__item-cost">Цена:</div>
					<!-- заметь в ${this.price} падает цена конвертированная с помощью метода this.changeToUAH(); -->
					<div class="menu__item-total"><span>${this.price}</span> грн/день</div>
				</div>
			`;
      // наш новый созданный ДОМ элемент помещаем в element
      this.parent.append(element);
    }
  }

  // надо создать новый объект и вызвать метод render()

  // можно импользовать такой синтаксис
  // const div = new MenuCard(сюда аргументы);
  // div.render();

  // но есть метод сокращенней
  // используем объект без помещения в переменную
  // так можно делать если используешь на месте. потом доступа к этому объекту не будет
  new MenuCard(
    // вставляем аргументы src, alt, title и т.д.
    // вставляем с кавычками
    'img/tabs/vegy.jpg',
    'vegy',
    // то что имеет свои ковычки то в одинарные
    'Меню "Фитнес"',
    'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
    // это число как я понял условное просто 9 долларов типо из базы данных ему приходит
    9,
    // родительский селектор parentSelector; в верстке есть класс меню а в нем класс контейнер
    '.menu .container',
    // добавляем класс обвертку menu__item (без .) из метода render()
    'menu__item'
  ).render();

  // пишем еще 2 карточки
  new MenuCard(
    'img/tabs/elite.jpg',
    'elite',
    'Меню "Премиум"',
    'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
    14,
    '.menu .container',
    // добавляем класс обвертку menu__item (без .) из метода render()
    'menu__item'
  ).render();

  new MenuCard(
    'img/tabs/post.jpg',
    'post',
    'Меню "Постное"',
    'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
    21,
    '.menu .container'
    // тут специально нет menu__item
    // мы его добавили через условие if (this.classes.length === 0) в методе render()
  ).render();

	
	// Forms
	// реализуем отправку данных форм, т.к. их 2 то делаем чер функ

	// получаем формы
	const forms = document.querySelectorAll('form');

	// объект который будет вводть юзеру сообщение в зависимости от ситуации
	const message = {
		loading: 'Загрузка',
		succes: 'Спасибо! Скоро мы с вами свяжемся',
		failure: 'Что-то пошло не так...'
	};

	// подвязываем под все формы postData
	forms.forEach(item => {
		postData(item);
	});

	// функция отвечающая за постинг данных
	function postData(form) {
		// событие 'submit', (объект событие) срабатывает каждый раз когда пытаемся отправить форму
		form.addEventListener('submit', (e) => {
			// отменяем стандартное поведение браузера
			e.preventDefault(); // надо писать в начале

			// при отправки запроса юзера будем уведомлять
			// создаем див
			const statusMessage = document.createElement('div');
			// добавляем диву класс
			statusMessage.classList.add('status');
			// как только отправили запрос нажали submit (кнопку отправки формы) выводим сообщение loading: 'Загрузка' (увидит тока если медленный интернет)
			statusMessage.textContent = message.loading;
			// отправляем на страницу statusMessage
			form.append(statusMessage);

			// работаем с объектом XMLHttpRequest
			const request = new XMLHttpRequest();
			// open(метод ПОСТ, путь на который ссылаемся)
			request.open('POST', 'server.php');

			// заголовки которые говорят серверу, что именно приходит (тип контента, обязательно для formData)
			// request.setRequestHeader('Content-type', 'multipart/form-data'); // setRequestHeader не нужно писать используя XMLHttpRequest + formData приводит к ошибке
			request.setRequestHeader('Content-type', 'application/json'); // через JSON

			// нужно сделать так чтобы все данные кот заполнил юзер в форме мы полуили в жс и могли отправить на сервер

			// 1) через formData
			// в перемен конструктор FormData(форма из которой нужно собрать данные)
			// const formData = new FormData(form); // ! важно чтобы в верстке у input были атрибуты name

			// // отправляем данные send(переменная formData)
			// request.send(formData);

			// load отслеживает конечную загрузку запроса
			// request.addEventListener('load', () => {
			// 	// 200 это OK
			// 	if (request.status === 200) {
			// 		// response это ответ от сервера
			// 		console.log(request.response);
			// 		// когда мы сделали запрос и все успешно пришло выводим сообщение succes: 'Спасибо! Скоро мы с вами свяжемся'
			// 		statusMessage.textContent = message.succes;

			// 		// очистка формы после успешной отправки
			// 		form.reset(); // обращаемся к форме и метод reset() очищает ее. альтернатива это в этой форме перебрать инпуты и очистить их вэлью
			// 		// удаляем statusMessage со страницы
			// 		setTimeout(() => {
			// 			statusMessage.remove();
			// 		}, 2000);
			// 	} else { // если что-то не вышло
			// 		// выводим сообщение failure: 'Что-то пошло не так...'
			// 		statusMessage.textContent = message.failure;
			// 	}
			// });

			// 2) через JSON
			// в перемен конструктор FormData(форма из которой нужно собрать данные)
			const formData = new FormData(form); // ! важно чтобы в верстке у input были атрибуты name

			// надо объект FormData превратить в формат JSON
			// FormData специфический объект и так просто его нельзя прогнать в другой формат. для этого делаем:

			// создаем пустой объект
			const object = {};
			// перебираем FormData и все данные помещаем в object
			formData.forEach(function (value, key) {
				object[key] = value;
			});
			// теперь когда мы получили обычный объект а не FormData, можем использовать конвертацию в JSON
			const json = JSON.stringify(object);

			// // отправляем данные send(переменная formData)
			request.send(json);

			// load отслеживает конечную загрузку запроса
			request.addEventListener('load', () => {
				// 200 это OK
				if (request.status === 200) {
					// response это ответ от сервера
					console.log(request.response);
					// когда мы сделали запрос и все успешно пришло выводим сообщение succes: 'Спасибо! Скоро мы с вами свяжемся'
					statusMessage.textContent = message.succes;

					// очистка формы после успешной отправки
					form.reset(); // обращаемся к форме и метод reset() очищает ее. альтернатива это в этой форме перебрать инпуты и очистить их вэлью
					// удаляем statusMessage со страницы
					setTimeout(() => {
						statusMessage.remove();
					}, 2000);
				} else { // если что-то не вышло
					// выводим сообщение failure: 'Что-то пошло не так...'
					statusMessage.textContent = message.failure;
				}
			});
		});
	}
});
