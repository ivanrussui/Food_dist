/******/ (function() { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./js/modules/calc.js":
/*!****************************!*\
  !*** ./js/modules/calc.js ***!
  \****************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
// ? пишем функцию и внутрь перемещаем участок кода из файла script.js
function calc() {
  const result = document.querySelector('.calculating__result span'); // внутри класса span

  let sex, height, weight, age, ratio; // ? если в localStorage есть инфа мы ее оттуда берем и помезщаем в переменные, а если инфы нет то задае ее по умолчанию

  if (localStorage.getItem('sex')) {
    sex = localStorage.getItem('sex');
  } else {
    sex = 'female';
    localStorage.setItem('sex', 'female');
  }

  if (localStorage.getItem('ratio')) {
    ratio = localStorage.getItem('ratio');
  } else {
    ratio = 1.375;
    localStorage.setItem('ratio', 1.375);
  } // функция активности блоков. Инициализирует выбранные блоки


  function initLocalSettings(selector, activeClass) {
    const elements = document.querySelectorAll(selector); // * логика такая при загрузке страницы проверяется ratio и sex на значения заданные в localStorage

    elements.forEach(elem => {
      elem.classList.remove(activeClass); // удаляем класс активности

      if (elem.getAttribute('id') === localStorage.getItem('sex')) {
        // если элемент кот перебираем будет по значению атрибута id равен из локалстоража айтему sex
        elem.classList.add(activeClass); // то назначаем класс активности
      }

      if (elem.getAttribute('data-ratio') === localStorage.getItem('ratio')) {
        // аналогично только для значения атрибута data-ratio
        elem.classList.add(activeClass);
      }
    });
  } // !               div так как мы обращаемся к блокам этих селекторов


  initLocalSettings('#gender div', 'calculating__choose-item_active');
  initLocalSettings('.calculating__choose_big div', 'calculating__choose-item_active'); // функция расчета

  function calcTotal() {
    if (!sex || !height || !weight || !age || !ratio) {
      result.textContent = '____';
      return; // return сразу прекратит функцию если условие выше выполнится
    }

    if (sex === 'female') {
      result.textContent = Math.round((447.6 + 9.2 * weight + 3.1 * height - 4.3 * age) * ratio);
    } else {
      result.textContent = Math.round((88.36 + 13.4 * weight + 4.8 * height - 5.7 * age) * ratio);
    }
  } // * эту функ вызываем неск раз так как при любых изменениях должен идти пересчет


  calcTotal(); // функция показывающая переключение, активные блоки и т.д.

  function getStaticInformation(selector, activeClass) {
    // ? таким образом получает внутри parentSelector все divы
    const elements = document.querySelectorAll(selector); // ! перебираем, делигирование тут не прокатит будет между элементами при клике глюк

    elements.forEach(elem => {
      elem.addEventListener('click', e => {
        // тут пишем чтобы куда мы кликнем оттуда активность/пол
        if (e.target.getAttribute('data-ratio')) {
          // по дата атрибутам
          ratio = +e.target.getAttribute('data-ratio'); // * localStorage записываем по атрибуту

          localStorage.setItem('ratio', +e.target.getAttribute('data-ratio'));
        } else {
          sex = e.target.getAttribute('id'); // по полу

          localStorage.setItem('sex', e.target.getAttribute('id'));
        } // todo работаем с классами активности


        elements.forEach(elem => {
          elem.classList.remove(activeClass); // убираем класс активности кот передали в функцию
        });
        e.target.classList.add(activeClass); // доб класс активности тому элементу на кот кликнули			
        // * эту функ вызываем неск раз так как при любых изменениях должен идти пересчет

        calcTotal();
      });
    });
  } // !                  div так как мы обращаемся к блокам этих селекторов


  getStaticInformation('#gender div', 'calculating__choose-item_active');
  getStaticInformation('.calculating__choose_big div', 'calculating__choose-item_active'); // функция собирающая  данные из инпутов

  function getDynamicInformation(selector) {
    const input = document.querySelector(selector);
    input.addEventListener('input', () => {
      // ! если юзер вводит буквы
      if (input.value.match(/\D/g)) {
        input.style.border = '1px solid red';
      } else {
        input.style.border = 'none';
      } // ? используем switch/case чтобы с разных инпутов можно было подобрать данные


      switch (input.getAttribute('id')) {
        case 'height':
          height = +input.value;
          break;

        case 'weight':
          weight = +input.value;
          break;

        case 'age':
          age = +input.value;
          break;
      } // * эту функ вызываем неск раз так как при любых изменениях должен идти пересчет


      calcTotal();
    });
  }

  getDynamicInformation('#height');
  getDynamicInformation('#weight');
  getDynamicInformation('#age');
} // ! экспортируем используя ES6


/* harmony default export */ __webpack_exports__["default"] = (calc);

/***/ }),

/***/ "./js/modules/cards.js":
/*!*****************************!*\
  !*** ./js/modules/cards.js ***!
  \*****************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/services */ "./js/services/services.js");
 // ? пишем функцию cards и внутрь перемещаем участок кода с cards из файла script.js

function cards() {
  // получаю карточки
  class MenuCard {
    // путь к картинке, альт текст, заголовок, описание, цена, родитель куда помещаются карточки
    // ...classes это rest оператор
    constructor(src, alt, title, descr, price, parentSelector, ...classes) {
      this.src = src;
      this.alt = alt;
      this.title = title;
      this.descr = descr;
      this.price = price; // передаем рекст оператор, он передается как массив

      this.classes = classes; //  в this.parent кладем ДОМ элемент

      this.parent = document.querySelector(parentSelector); // можно так же в render() делать
      // для курса валют

      this.transfer = 27; // вызываем метод конвертации валюты

      this.changeToUAH(); // его можно было так же и в методе render() вызывать
    } // метод конвертации валют


    changeToUAH() {
      // умножаем цену на курс
      this.price = this.price * this.transfer; // можно написать +this.price чтобы строка преобразовывалась в число
      // this.price = +this.price * this.transfer;
    }

    render() {
      // метод конвертации валют changeToUAH() можно и тут вызвать. или в конструкторе
      // тут пишем верстку
      // создаем див
      const element = document.createElement('div'); // назначаем классы this.classes который через rest оператор записан
      // если в ...classes ничего не передается, то присваиваем класс menu__item

      if (this.classes.length === 0) {
        // element.classList.add('menu__item'); // так можно но есть круче способ ниже
        // записываем класс menu__item в свойства this.element
        this.element = 'menu__item';
        element.classList.add(this.element);
      } else {
        // className называем каждый элемент внутри массива. className это аргумент => функции
        this.classes.forEach(className => element.classList.add(className)); // element это переменная которая выше создана
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
			`; // наш новый созданный ДОМ элемент помещаем в element

      this.parent.append(element);
    }

  } // создание элементов динамически:
  // классами


  (0,_services_services__WEBPACK_IMPORTED_MODULE_0__.getResource)('http://localhost:3000/menu') // url берем из терминала
  .then(data => {
    // данные приходящие с сервера, приходят как массив
    data.forEach(({
      img,
      altimg,
      title,
      descr,
      price
    }) => {
      // используем дестуктуризацию - получаем значения ключей
      new MenuCard(img, altimg, title, descr, price, '.menu .container').render(); // вызваем конструктор MenuCard(в конце 'куда вставляем в верстку').метод render()
    });
  });
} // ! экспортируем используя ES6


/* harmony default export */ __webpack_exports__["default"] = (cards);

/***/ }),

/***/ "./js/modules/forms.js":
/*!*****************************!*\
  !*** ./js/modules/forms.js ***!
  \*****************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modal */ "./js/modules/modal.js");
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../services/services */ "./js/services/services.js");
// ! импорты должны быть в самом верху

 // ? пишем функцию и внутрь перемещаем участок кода из файла script.js

function forms(formSelector, modalTimerId) {
  // ! передаем аргументы которые принимают селекторы из файла scripts.js
  // реализуем отправку данных форм, т.к. их 2 то делаем чер функ
  // получаем формы
  const forms = document.querySelectorAll(formSelector); // объект который будет вводть юзеру сообщение в зависимости от ситуации

  const message = {
    loading: 'img/form/spinner.svg',
    succes: 'Спасибо! Скоро мы с вами свяжемся',
    failure: 'Что-то пошло не так...'
  }; // подвязываем под все формы bindPostData

  forms.forEach(item => {
    bindPostData(item);
  }); // функция отвечающая за привязку постинга

  function bindPostData(form) {
    // событие 'submit', (объект событие) срабатывает каждый раз когда пытаемся отправить форму
    form.addEventListener('submit', e => {
      // отменяем стандартное поведение браузера
      e.preventDefault(); // надо писать в начале
      // при отправки запроса юзера будем уведомлять
      // создаем img

      const statusMessage = document.createElement('img'); // обращаемся к атрибуту

      statusMessage.src = message.loading; // как только отправили запрос нажали submit (кнопку отправки формы)  (увидит тока если медленный интернет)

      statusMessage.style.cssText = `
				display: block;
				margin: 0 auto;
			`; // отправляем на страницу statusMessage
      // form.append(statusMessage); // тут спинер ломает внизу верстку где форма не в модалке
      // аппендит спинер не в саму форму а после нее. в модалке ниче не поменяется
      // insertAdjacentElement('куда вставляем afterend это после формы', что нужно вставить)

      form.insertAdjacentElement('afterend', statusMessage); // работа с сервером fetch api
      // через JSON
      // в перемен конструктор FormData(форма из которой нужно собрать данные)
      // берем formData которая собрала все данные с формы

      const formData = new FormData(form); // ! важно чтобы в верстке у input были атрибуты name
      // entries() превращает объект в массив массивов т.е. в матрицу
      // fromEntries() делает обратно из матрицы в объект
      // данные с формы полученные выше превращаем в матрицу, после в классический объект, а после в JSON

      const json = JSON.stringify(Object.fromEntries(formData.entries())); // JSON полученный выше отправляем на сервер

      (0,_services_services__WEBPACK_IMPORTED_MODULE_1__.postData)('http://localhost:3000/requests', json) // (url, body который пойдет на сервер)
      .then(data => {
        // обрабатываем результат запроса через промисы
        // с сервера вернется data
        console.log(data); // когда мы сделали запрос и все успешно пришло выводим сообщение succes: 'Спасибо! Скоро мы с вами свяжемся'

        showThanksModal(message.succes); // удаляем statusMessage со страницы

        statusMessage.remove();
      }).catch(() => {
        // пишем операцию которая соотвествует ошибке
        // catch() есть особенность если к примеру указать путь к серверу не тот, то он все равно выполнит resolve. а вот если к примеру нет сети 404 ошибка и тогда он выполнит reject
        // выводим сообщение failure: 'Что-то пошло не так...'
        showThanksModal(message.failure);
      }).finally(() => {
        // действие которое будет выполняться всегда вне зависимости от результата
        // очистка формы после успешной отправки
        form.reset(); // обращаемся к форме и метод reset() очищает ее. альтернатива это в этой форме перебрать инпуты и очистить их вэлью
      });
    });
  } // функция показывает модалку с благодарностью юзеру/ message это будет сообщ кот будет показ юзеру о статусе отправки


  function showThanksModal(message) {
    // message будем брать из const message котор выше писали при отправке запросов
    const prevModalDialog = document.querySelector('.modal__dialog'); // скрываем этот блок (не удаляем т к юзер может открыть модалку и попытаться отправить форму)

    prevModalDialog.classList.add('hide'); // задача открыть класс модал и сформировать структуру внутри
    // открываем модалку openModal() есть выше в коде когда писали модалку

    (0,_modal__WEBPACK_IMPORTED_MODULE_0__.openModal)('.modal', modalTimerId); // (селектор модальн окна кот будем закрывать, modalTimerId приходит из файла script.js)
    // нужно создать блок обвертка

    const thanksModal = document.createElement('div'); // создаем див
    // добавляем класс. по сути заменяем класс тот что выше скрыли

    thanksModal.classList.add('modal__dialog'); // формируем внутри верстку

    thanksModal.innerHTML = `
			<div class='modal__content'>
				<div class='modal__close' data-close>×</div>
				<div class='modal__title'>${message}</div>
			</div>
		`; // помещаем на страницу thanksModal

    document.querySelector('.modal').append(thanksModal); // нужно чтобы все через время возвращалось обратно

    setTimeout(() => {
      thanksModal.remove(); // убирать thanksModal
      // показывать предидущий контент

      prevModalDialog.classList.add('show'); // доб класс show

      prevModalDialog.classList.remove('hide'); // убир класс hide

      (0,_modal__WEBPACK_IMPORTED_MODULE_0__.closeModal)('.modal'); // закр мод окно (селектор модальн окна кот будем закрывать)
    }, 2000);
  }
} // ! экспортируем используя ES6


/* harmony default export */ __webpack_exports__["default"] = (forms);

/***/ }),

/***/ "./js/modules/modal.js":
/*!*****************************!*\
  !*** ./js/modules/modal.js ***!
  \*****************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "closeModal": function() { return /* binding */ closeModal; },
/* harmony export */   "openModal": function() { return /* binding */ openModal; }
/* harmony export */ });
function closeModal(modalSelector) {
  // ! чтобы получить аргумент-селектор
  const modal = document.querySelector(modalSelector);
  modal.classList.add('hide');
  modal.classList.remove('show'); // стиль вкл прокрутку при закр мод окна '' означ по умолч браузер сам подставит

  document.body.style.overflow = '';
}

function openModal(modalSelector, modalTimerId) {
  // * modalTimerId передаем в аргумент
  // ! чтобы получить аргумент-селектор
  const modal = document.querySelector(modalSelector);
  modal.classList.add('show');
  modal.classList.remove('hide'); // стиль блокирующий прокрутку при откр модальн окна

  document.body.style.overflow = 'hidden';
  console.log(modalTimerId); // если modalTimerId был передан, то тогда запускаем clearInterval

  if (modalTimerId) {
    clearInterval(modalTimerId);
  }
} // ? пишем функцию и внутрь перемещаем участок кода из файла script.js


function modal(triggerSelector, modalSelector, modalTimerId) {
  // ! передаем аргументы которые принимают селекторы из файла scripts.js и modalTimerId(он выше в коде)
  // ! селекторы идут как аргументы функции
  const modalTrigger = document.querySelectorAll(triggerSelector),
        modal = document.querySelector(modalSelector);
  modalTrigger.forEach(btn => {
    // * мы передаем в функцию modalSelector и поэтому перед функ пишем () => как бы обарачиваем функцию, чтобы она вызывалась только по клику
    btn.addEventListener('click', () => openModal(modalSelector, modalTimerId));
  }); // закрытие модалки при клике за пределы модалки

  modal.addEventListener('click', e => {
    // если е.таргет явлеется modal или е.таргет будет крестиком (получаем атрибут data-close) и равен пустой строке
    if (e.target === modal || e.target.getAttribute('data-close') == '') {
      closeModal(modalSelector); // то мы закрывает модалку
    }
  }); // закрытие модалки при нажатии Esc

  document.addEventListener('keydown', e => {
    // eventcode у Esc - Escape && чтобы функ closeModal() вызывалась только когда модальн окно открыто
    if (e.code === 'Escape' && modal.classList.contains('show')) {
      closeModal(modalSelector);
    }
  }); // функция появления модалки

  function showModalByScroll() {
    // если прокрученная часть + видимая часть на сайте без прокрутки >= полный сайт (полная прокрутка)
    if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
      openModal(modalSelector, modalTimerId); // удаляем обработчик события чтобы работал только 1 раз

      window.removeEventListener('scroll', showModalByScroll);
    }
  } // модалка появляется когда юзер проскроллил сайт


  window.addEventListener('scroll', showModalByScroll);
} // ! экспортируем используя ES6


/* harmony default export */ __webpack_exports__["default"] = (modal); // ? экспорт по умолчанию

 // ? экспорт именнованый



/***/ }),

/***/ "./js/modules/slider.js":
/*!******************************!*\
  !*** ./js/modules/slider.js ***!
  \******************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
// ? пишем функцию и внутрь перемещаем участок кода из файла script.js
function slider({
  container,
  slide,
  nextArrow,
  prevArrow,
  totalCounter,
  currentCounter,
  wrapper,
  field
}) {
  const slides = document.querySelectorAll(slide),
        slider = document.querySelector(container),
        prev = document.querySelector(prevArrow),
        next = document.querySelector(nextArrow),
        total = document.querySelector(totalCounter),
        current = document.querySelector(currentCounter),
        slidesWrapper = document.querySelector(wrapper),
        slidesField = document.querySelector(field),
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
  } // устанавливаем ширину


  slidesField.style.width = 100 * slides.length + '%';
  slidesField.style.display = 'flex';
  slidesField.style.transition = '0.5s all';
  slidesWrapper.style.overflow = 'hidden'; // перебираем слайды чтобы каждому задать ширину

  slides.forEach(slide => {
    slide.style.width = width;
  });
  slider.style.position = 'relative'; // обвертка для всех точек (элем навигаци) и их стилизация

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

    dot.setAttribute('data-slide-to', i + 1); // стилизуем точки

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
		`; // когда i == 0 меняем опасити на 1

    if (i == 0) {
      dot.style.opacity = 1;
    } // вставляем точки внутрь indicators


    indicators.append(dot); // ! в массив dots пушим dot 

    dots.push(dot);
  } // функция изменения опасити у dots


  function changeDotsOpacity() {
    // ! у массива дотс изначально будет у каждого дот
    dots.forEach(dot => dot.style.opacity = '.5'); // ! далее опасити меняем / идет поведение как выше у slides.length - 1

    dots[slideIndex - 1].style.opacity = 1;
  } // функция изменения цифр у счетчика слайдера 


  function changeSlideIndex() {
    // в зависимости от контроля слайдиндекс меняем значение где цифры
    if (slides.length < 10) {
      current.textContent = `0${slideIndex}`;
    } else {
      current.textContent = slideIndex;
    }
  } // функция трансормирует строку в цисло и заменяет с помощью replace() удаляем все не числа из стркоки


  function deleteNotDigits(str) {
    return +str.replace(/\D/g, '');
  }

  next.addEventListener('click', () => {
    // если ушли в правую границу (конец слайдера) то перемещаемся в начало
    if (offset == deleteNotDigits(width) * (slides.length - 1)) {
      offset = 0;
    } else {
      // когда мы нажимаем на стрелку вправо,то к offset будет прибавляться ширина еще одного слайда и слайд будет смещаться
      offset += deleteNotDigits(width);
    } // сдвигаем слайд


    slidesField.style.transform = `translateX(-${offset}px)`; // контролируем слайдиндекс

    if (slideIndex == slides.length) {
      slideIndex = 1;
    } else {
      slideIndex++;
    }

    changeSlideIndex();
    changeDotsOpacity();
  });
  prev.addEventListener('click', () => {
    if (offset == 0) {
      // тут сравниваем
      // а тут присваиваем
      offset = deleteNotDigits(width) * (slides.length - 1);
    } else {
      offset -= deleteNotDigits(width);
    } // сдвигаем слайд


    slidesField.style.transform = `translateX(-${offset}px)`; // контролируем слайдиндекс

    if (slideIndex == 1) {
      slideIndex = slides.length;
    } else {
      slideIndex--;
    }

    changeSlideIndex();
    changeDotsOpacity();
  }); // пишем переключение слайдов (с нумерацией) при кликах на dots реализовываем через  объект событие и атрибут

  dots.forEach(dot => {
    dot.addEventListener('click', e => {
      const slideTo = e.target.getAttribute('data-slide-to'); // ! ниже все меняем при изменение slideTo (кликнули на 4 и цифрра сменилась на 4)

      slideIndex = slideTo;
      offset = deleteNotDigits(width) * (slideTo - 1);
      slidesField.style.transform = `translateX(-${offset}px)`;
      changeSlideIndex();
      changeDotsOpacity();
    });
  });
} // ! экспортируем используя ES6


/* harmony default export */ __webpack_exports__["default"] = (slider);

/***/ }),

/***/ "./js/modules/tabs.js":
/*!****************************!*\
  !*** ./js/modules/tabs.js ***!
  \****************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
// ? пишем функцию tabs и внутрь перемещаем участок кода с tabs из файла script.js
function tabs(tabsSelector, tabsContentSelector, tabsParentSelector, activeClass) {
  const tabs = document.querySelectorAll(tabsSelector),
        tabsContent = document.querySelectorAll(tabsContentSelector),
        tabsParent = document.querySelector(tabsParentSelector); // скрыть все ненужные табы

  function hideTabContent() {
    // перебрать псевдомассив
    tabsContent.forEach(item => {
      item.classList.add('hide');
      item.classList.remove('show', 'fade');
    }); // скрыв, надо убрать у всех табов класс активности

    tabs.forEach(item => {
      item.classList.remove(activeClass);
    });
  } // показывать табы


  function showTabContent(i = 0) {
    // надо понять к какому элементу обращаюсь
    tabsContent[i].classList.add('show', 'fade');
    tabsContent[i].classList.remove('hide');
    tabs[i].classList.add(activeClass);
  }

  hideTabContent();
  showTabContent(); // вешаю обработчик, клик и колбэк. а в колбэк объект событие

  tabsParent.addEventListener('click', event => {
    // обращаю event.target в переменную это делается чтобы проще его было чаще использовать
    const target = event.target; // проверяю на таргет (переменная выше) потом таргет.класслист,
    // при помощи контэйнс определяю что точно кликнул в таб

    if (target && target.classList.contains(tabsSelector.slice(1))) {
      // * tabsSelector.slice(1) пишем так потому что tabsSelector передается с точкой и slice формирует новую строку без 1 символа, то есть точки 
      // перебераю псевдомассив, колбэк(айтем - это каждый таб кот перебираю и ай...
      // ай отвечает за номер элемента по порядку)
      tabs.forEach((item, i) => {
        // если таргет (тот элем в кот кликнул) будет совпадать с тем элем кот перебираю
        if (target == item) {
          // то вызоваю 2 функ
          // скрываю все табы
          hideTabContent(); // показываю только тот который совпадает и передаю ай... (ай номер элемента который совпал)

          showTabContent(i);
        }
      });
    }
  });
} // ! экспортируем используя ES6


/* harmony default export */ __webpack_exports__["default"] = (tabs);

/***/ }),

/***/ "./js/modules/timer.js":
/*!*****************************!*\
  !*** ./js/modules/timer.js ***!
  \*****************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
// ? пишем функцию и внутрь перемещаем участок кода из файла script.js
function timer(id, deadline) {
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
    hours = Math.floor(t / (1000 * 60 * 60) % 24),
          minutes = Math.floor(t / 1000 / 60 % 60),
          seconds = Math.floor(t / 1000 % 60); //  чтобы использовать переменные выше глобально, возращаем их

    return {
      total: t,
      days: days,
      hours: hours,
      minutes: minutes,
      seconds: seconds
    };
  } // функ добавляет 0 перед числами меньше 10ти


  function getZero(num) {
    if (num >= 0 && num < 10) {
      return `0${num}`;
    } else {
      return num;
    }
  } // функция устанавливающая таймер на страницу


  function setClock(selector, endtime) {
    const timer = document.querySelector(selector),
          days = timer.querySelector('#days'),
          hours = timer.querySelector('#hours'),
          minutes = timer.querySelector('#minutes'),
          seconds = timer.querySelector('#seconds'),
          // созд перем для обнов таймера каждую секунду. в него функцию обнов таймер помещаем
    timeInterval = setInterval(updateClock, 1000); // запускаем функцию чтобы при загружки страницы при 0 секунде не было даты из верстки

    updateClock(); // функция обновляющая таймер каждую секунду

    function updateClock() {
      // расчет времени котор осталось прямо на эту секунду/ получаем из функции getTimeRemaining
      const t = getTimeRemaining(endtime); // помещаем расчетные величины на страницу
      // можно через иннерХТМЛ а можно текстКонтент

      days.innerHTML = getZero(t.days);
      hours.innerHTML = getZero(t.hours);
      minutes.innerHTML = getZero(t.minutes);
      seconds.innerHTML = getZero(t.seconds); // остановка таймера

      if (t.total <= 0) {
        // встроенная функция (переменная timeInterval)
        clearInterval(timeInterval);
      }
    }
  }

  setClock(id, deadline);
} // ! экспортируем используя ES6


/* harmony default export */ __webpack_exports__["default"] = (timer);

/***/ }),

/***/ "./js/services/services.js":
/*!*********************************!*\
  !*** ./js/services/services.js ***!
  \*********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "postData": function() { return /* binding */ postData; },
/* harmony export */   "getResource": function() { return /* binding */ getResource; }
/* harmony export */ });
// ! вынесли в отдельную папку так как работает с сервером
// функция отвечающая за постинг данных
// async говорит что будет асинхронный код
// async await всегда используются в паре
const postData = async (url, data) => {
  // url кот передается в fetch, data данные которые будут поститься
  // обрабатываем данные которые пришли
  // await как бы (наподобие) делает синхронным, говорит надо дождаться
  const res = await fetch(url, {
    // fetch(url чтобы ссылаться на сервер)
    method: 'POST',
    // метод
    headers: {
      // заголовки
      'Content-type': 'application/json'
    },
    body: data // то тело которое мы будем отправлять

  }); // возвращаем как json формат

  return await res.json(); // res это промис
}; // функция для получения данных с сервера


async function getResource(url) {
  // url кот передается в fetch, data нет т.к. ниче не отправляем
  // обрабатываем данные которые пришли
  // await как бы (наподобие) делает синхронным, говорит надо дождаться
  let res = await fetch(url); // fetch если столкнет с ошибкой http 404 и др. он не выдаст ошибку-catch-reject
  // ошибкой для fetch будет отсутствие инета и др. поэтому надо такое поведение обработать

  if (!res.ok) {
    // если в запросе что-то не так
    throw new Error(`Cloud not fetch ${url}, status: ${res.status}`); // выбрасываем ошибку()
  } // возвращаем как json формат


  return await res.json(); // res это промис
}




/***/ }),

/***/ "./node_modules/es6-promise/auto.js":
/*!******************************************!*\
  !*** ./node_modules/es6-promise/auto.js ***!
  \******************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";
// This file can be required in Browserify and Node.js for automatic polyfill
// To use it:  require('es6-promise/auto');

module.exports = __webpack_require__(/*! ./ */ "./node_modules/es6-promise/dist/es6-promise.js").polyfill();


/***/ }),

/***/ "./node_modules/es6-promise/dist/es6-promise.js":
/*!******************************************************!*\
  !*** ./node_modules/es6-promise/dist/es6-promise.js ***!
  \******************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/*!
 * @overview es6-promise - a tiny implementation of Promises/A+.
 * @copyright Copyright (c) 2014 Yehuda Katz, Tom Dale, Stefan Penner and contributors (Conversion to ES6 API by Jake Archibald)
 * @license   Licensed under MIT license
 *            See https://raw.githubusercontent.com/stefanpenner/es6-promise/master/LICENSE
 * @version   v4.2.8+1e68dce6
 */

(function (global, factory) {
	 true ? module.exports = factory() :
	0;
}(this, (function () { 'use strict';

function objectOrFunction(x) {
  var type = typeof x;
  return x !== null && (type === 'object' || type === 'function');
}

function isFunction(x) {
  return typeof x === 'function';
}



var _isArray = void 0;
if (Array.isArray) {
  _isArray = Array.isArray;
} else {
  _isArray = function (x) {
    return Object.prototype.toString.call(x) === '[object Array]';
  };
}

var isArray = _isArray;

var len = 0;
var vertxNext = void 0;
var customSchedulerFn = void 0;

var asap = function asap(callback, arg) {
  queue[len] = callback;
  queue[len + 1] = arg;
  len += 2;
  if (len === 2) {
    // If len is 2, that means that we need to schedule an async flush.
    // If additional callbacks are queued before the queue is flushed, they
    // will be processed by this flush that we are scheduling.
    if (customSchedulerFn) {
      customSchedulerFn(flush);
    } else {
      scheduleFlush();
    }
  }
};

function setScheduler(scheduleFn) {
  customSchedulerFn = scheduleFn;
}

function setAsap(asapFn) {
  asap = asapFn;
}

var browserWindow = typeof window !== 'undefined' ? window : undefined;
var browserGlobal = browserWindow || {};
var BrowserMutationObserver = browserGlobal.MutationObserver || browserGlobal.WebKitMutationObserver;
var isNode = typeof self === 'undefined' && typeof process !== 'undefined' && {}.toString.call(process) === '[object process]';

// test for web worker but not in IE10
var isWorker = typeof Uint8ClampedArray !== 'undefined' && typeof importScripts !== 'undefined' && typeof MessageChannel !== 'undefined';

// node
function useNextTick() {
  // node version 0.10.x displays a deprecation warning when nextTick is used recursively
  // see https://github.com/cujojs/when/issues/410 for details
  return function () {
    return process.nextTick(flush);
  };
}

// vertx
function useVertxTimer() {
  if (typeof vertxNext !== 'undefined') {
    return function () {
      vertxNext(flush);
    };
  }

  return useSetTimeout();
}

function useMutationObserver() {
  var iterations = 0;
  var observer = new BrowserMutationObserver(flush);
  var node = document.createTextNode('');
  observer.observe(node, { characterData: true });

  return function () {
    node.data = iterations = ++iterations % 2;
  };
}

// web worker
function useMessageChannel() {
  var channel = new MessageChannel();
  channel.port1.onmessage = flush;
  return function () {
    return channel.port2.postMessage(0);
  };
}

function useSetTimeout() {
  // Store setTimeout reference so es6-promise will be unaffected by
  // other code modifying setTimeout (like sinon.useFakeTimers())
  var globalSetTimeout = setTimeout;
  return function () {
    return globalSetTimeout(flush, 1);
  };
}

var queue = new Array(1000);
function flush() {
  for (var i = 0; i < len; i += 2) {
    var callback = queue[i];
    var arg = queue[i + 1];

    callback(arg);

    queue[i] = undefined;
    queue[i + 1] = undefined;
  }

  len = 0;
}

function attemptVertx() {
  try {
    var vertx = Function('return this')().require('vertx');
    vertxNext = vertx.runOnLoop || vertx.runOnContext;
    return useVertxTimer();
  } catch (e) {
    return useSetTimeout();
  }
}

var scheduleFlush = void 0;
// Decide what async method to use to triggering processing of queued callbacks:
if (isNode) {
  scheduleFlush = useNextTick();
} else if (BrowserMutationObserver) {
  scheduleFlush = useMutationObserver();
} else if (isWorker) {
  scheduleFlush = useMessageChannel();
} else if (browserWindow === undefined && "function" === 'function') {
  scheduleFlush = attemptVertx();
} else {
  scheduleFlush = useSetTimeout();
}

function then(onFulfillment, onRejection) {
  var parent = this;

  var child = new this.constructor(noop);

  if (child[PROMISE_ID] === undefined) {
    makePromise(child);
  }

  var _state = parent._state;


  if (_state) {
    var callback = arguments[_state - 1];
    asap(function () {
      return invokeCallback(_state, child, callback, parent._result);
    });
  } else {
    subscribe(parent, child, onFulfillment, onRejection);
  }

  return child;
}

/**
  `Promise.resolve` returns a promise that will become resolved with the
  passed `value`. It is shorthand for the following:

  ```javascript
  let promise = new Promise(function(resolve, reject){
    resolve(1);
  });

  promise.then(function(value){
    // value === 1
  });
  ```

  Instead of writing the above, your code now simply becomes the following:

  ```javascript
  let promise = Promise.resolve(1);

  promise.then(function(value){
    // value === 1
  });
  ```

  @method resolve
  @static
  @param {Any} value value that the returned promise will be resolved with
  Useful for tooling.
  @return {Promise} a promise that will become fulfilled with the given
  `value`
*/
function resolve$1(object) {
  /*jshint validthis:true */
  var Constructor = this;

  if (object && typeof object === 'object' && object.constructor === Constructor) {
    return object;
  }

  var promise = new Constructor(noop);
  resolve(promise, object);
  return promise;
}

var PROMISE_ID = Math.random().toString(36).substring(2);

function noop() {}

var PENDING = void 0;
var FULFILLED = 1;
var REJECTED = 2;

function selfFulfillment() {
  return new TypeError("You cannot resolve a promise with itself");
}

function cannotReturnOwn() {
  return new TypeError('A promises callback cannot return that same promise.');
}

function tryThen(then$$1, value, fulfillmentHandler, rejectionHandler) {
  try {
    then$$1.call(value, fulfillmentHandler, rejectionHandler);
  } catch (e) {
    return e;
  }
}

function handleForeignThenable(promise, thenable, then$$1) {
  asap(function (promise) {
    var sealed = false;
    var error = tryThen(then$$1, thenable, function (value) {
      if (sealed) {
        return;
      }
      sealed = true;
      if (thenable !== value) {
        resolve(promise, value);
      } else {
        fulfill(promise, value);
      }
    }, function (reason) {
      if (sealed) {
        return;
      }
      sealed = true;

      reject(promise, reason);
    }, 'Settle: ' + (promise._label || ' unknown promise'));

    if (!sealed && error) {
      sealed = true;
      reject(promise, error);
    }
  }, promise);
}

function handleOwnThenable(promise, thenable) {
  if (thenable._state === FULFILLED) {
    fulfill(promise, thenable._result);
  } else if (thenable._state === REJECTED) {
    reject(promise, thenable._result);
  } else {
    subscribe(thenable, undefined, function (value) {
      return resolve(promise, value);
    }, function (reason) {
      return reject(promise, reason);
    });
  }
}

function handleMaybeThenable(promise, maybeThenable, then$$1) {
  if (maybeThenable.constructor === promise.constructor && then$$1 === then && maybeThenable.constructor.resolve === resolve$1) {
    handleOwnThenable(promise, maybeThenable);
  } else {
    if (then$$1 === undefined) {
      fulfill(promise, maybeThenable);
    } else if (isFunction(then$$1)) {
      handleForeignThenable(promise, maybeThenable, then$$1);
    } else {
      fulfill(promise, maybeThenable);
    }
  }
}

function resolve(promise, value) {
  if (promise === value) {
    reject(promise, selfFulfillment());
  } else if (objectOrFunction(value)) {
    var then$$1 = void 0;
    try {
      then$$1 = value.then;
    } catch (error) {
      reject(promise, error);
      return;
    }
    handleMaybeThenable(promise, value, then$$1);
  } else {
    fulfill(promise, value);
  }
}

function publishRejection(promise) {
  if (promise._onerror) {
    promise._onerror(promise._result);
  }

  publish(promise);
}

function fulfill(promise, value) {
  if (promise._state !== PENDING) {
    return;
  }

  promise._result = value;
  promise._state = FULFILLED;

  if (promise._subscribers.length !== 0) {
    asap(publish, promise);
  }
}

function reject(promise, reason) {
  if (promise._state !== PENDING) {
    return;
  }
  promise._state = REJECTED;
  promise._result = reason;

  asap(publishRejection, promise);
}

function subscribe(parent, child, onFulfillment, onRejection) {
  var _subscribers = parent._subscribers;
  var length = _subscribers.length;


  parent._onerror = null;

  _subscribers[length] = child;
  _subscribers[length + FULFILLED] = onFulfillment;
  _subscribers[length + REJECTED] = onRejection;

  if (length === 0 && parent._state) {
    asap(publish, parent);
  }
}

function publish(promise) {
  var subscribers = promise._subscribers;
  var settled = promise._state;

  if (subscribers.length === 0) {
    return;
  }

  var child = void 0,
      callback = void 0,
      detail = promise._result;

  for (var i = 0; i < subscribers.length; i += 3) {
    child = subscribers[i];
    callback = subscribers[i + settled];

    if (child) {
      invokeCallback(settled, child, callback, detail);
    } else {
      callback(detail);
    }
  }

  promise._subscribers.length = 0;
}

function invokeCallback(settled, promise, callback, detail) {
  var hasCallback = isFunction(callback),
      value = void 0,
      error = void 0,
      succeeded = true;

  if (hasCallback) {
    try {
      value = callback(detail);
    } catch (e) {
      succeeded = false;
      error = e;
    }

    if (promise === value) {
      reject(promise, cannotReturnOwn());
      return;
    }
  } else {
    value = detail;
  }

  if (promise._state !== PENDING) {
    // noop
  } else if (hasCallback && succeeded) {
    resolve(promise, value);
  } else if (succeeded === false) {
    reject(promise, error);
  } else if (settled === FULFILLED) {
    fulfill(promise, value);
  } else if (settled === REJECTED) {
    reject(promise, value);
  }
}

function initializePromise(promise, resolver) {
  try {
    resolver(function resolvePromise(value) {
      resolve(promise, value);
    }, function rejectPromise(reason) {
      reject(promise, reason);
    });
  } catch (e) {
    reject(promise, e);
  }
}

var id = 0;
function nextId() {
  return id++;
}

function makePromise(promise) {
  promise[PROMISE_ID] = id++;
  promise._state = undefined;
  promise._result = undefined;
  promise._subscribers = [];
}

function validationError() {
  return new Error('Array Methods must be provided an Array');
}

var Enumerator = function () {
  function Enumerator(Constructor, input) {
    this._instanceConstructor = Constructor;
    this.promise = new Constructor(noop);

    if (!this.promise[PROMISE_ID]) {
      makePromise(this.promise);
    }

    if (isArray(input)) {
      this.length = input.length;
      this._remaining = input.length;

      this._result = new Array(this.length);

      if (this.length === 0) {
        fulfill(this.promise, this._result);
      } else {
        this.length = this.length || 0;
        this._enumerate(input);
        if (this._remaining === 0) {
          fulfill(this.promise, this._result);
        }
      }
    } else {
      reject(this.promise, validationError());
    }
  }

  Enumerator.prototype._enumerate = function _enumerate(input) {
    for (var i = 0; this._state === PENDING && i < input.length; i++) {
      this._eachEntry(input[i], i);
    }
  };

  Enumerator.prototype._eachEntry = function _eachEntry(entry, i) {
    var c = this._instanceConstructor;
    var resolve$$1 = c.resolve;


    if (resolve$$1 === resolve$1) {
      var _then = void 0;
      var error = void 0;
      var didError = false;
      try {
        _then = entry.then;
      } catch (e) {
        didError = true;
        error = e;
      }

      if (_then === then && entry._state !== PENDING) {
        this._settledAt(entry._state, i, entry._result);
      } else if (typeof _then !== 'function') {
        this._remaining--;
        this._result[i] = entry;
      } else if (c === Promise$1) {
        var promise = new c(noop);
        if (didError) {
          reject(promise, error);
        } else {
          handleMaybeThenable(promise, entry, _then);
        }
        this._willSettleAt(promise, i);
      } else {
        this._willSettleAt(new c(function (resolve$$1) {
          return resolve$$1(entry);
        }), i);
      }
    } else {
      this._willSettleAt(resolve$$1(entry), i);
    }
  };

  Enumerator.prototype._settledAt = function _settledAt(state, i, value) {
    var promise = this.promise;


    if (promise._state === PENDING) {
      this._remaining--;

      if (state === REJECTED) {
        reject(promise, value);
      } else {
        this._result[i] = value;
      }
    }

    if (this._remaining === 0) {
      fulfill(promise, this._result);
    }
  };

  Enumerator.prototype._willSettleAt = function _willSettleAt(promise, i) {
    var enumerator = this;

    subscribe(promise, undefined, function (value) {
      return enumerator._settledAt(FULFILLED, i, value);
    }, function (reason) {
      return enumerator._settledAt(REJECTED, i, reason);
    });
  };

  return Enumerator;
}();

/**
  `Promise.all` accepts an array of promises, and returns a new promise which
  is fulfilled with an array of fulfillment values for the passed promises, or
  rejected with the reason of the first passed promise to be rejected. It casts all
  elements of the passed iterable to promises as it runs this algorithm.

  Example:

  ```javascript
  let promise1 = resolve(1);
  let promise2 = resolve(2);
  let promise3 = resolve(3);
  let promises = [ promise1, promise2, promise3 ];

  Promise.all(promises).then(function(array){
    // The array here would be [ 1, 2, 3 ];
  });
  ```

  If any of the `promises` given to `all` are rejected, the first promise
  that is rejected will be given as an argument to the returned promises's
  rejection handler. For example:

  Example:

  ```javascript
  let promise1 = resolve(1);
  let promise2 = reject(new Error("2"));
  let promise3 = reject(new Error("3"));
  let promises = [ promise1, promise2, promise3 ];

  Promise.all(promises).then(function(array){
    // Code here never runs because there are rejected promises!
  }, function(error) {
    // error.message === "2"
  });
  ```

  @method all
  @static
  @param {Array} entries array of promises
  @param {String} label optional string for labeling the promise.
  Useful for tooling.
  @return {Promise} promise that is fulfilled when all `promises` have been
  fulfilled, or rejected if any of them become rejected.
  @static
*/
function all(entries) {
  return new Enumerator(this, entries).promise;
}

/**
  `Promise.race` returns a new promise which is settled in the same way as the
  first passed promise to settle.

  Example:

  ```javascript
  let promise1 = new Promise(function(resolve, reject){
    setTimeout(function(){
      resolve('promise 1');
    }, 200);
  });

  let promise2 = new Promise(function(resolve, reject){
    setTimeout(function(){
      resolve('promise 2');
    }, 100);
  });

  Promise.race([promise1, promise2]).then(function(result){
    // result === 'promise 2' because it was resolved before promise1
    // was resolved.
  });
  ```

  `Promise.race` is deterministic in that only the state of the first
  settled promise matters. For example, even if other promises given to the
  `promises` array argument are resolved, but the first settled promise has
  become rejected before the other promises became fulfilled, the returned
  promise will become rejected:

  ```javascript
  let promise1 = new Promise(function(resolve, reject){
    setTimeout(function(){
      resolve('promise 1');
    }, 200);
  });

  let promise2 = new Promise(function(resolve, reject){
    setTimeout(function(){
      reject(new Error('promise 2'));
    }, 100);
  });

  Promise.race([promise1, promise2]).then(function(result){
    // Code here never runs
  }, function(reason){
    // reason.message === 'promise 2' because promise 2 became rejected before
    // promise 1 became fulfilled
  });
  ```

  An example real-world use case is implementing timeouts:

  ```javascript
  Promise.race([ajax('foo.json'), timeout(5000)])
  ```

  @method race
  @static
  @param {Array} promises array of promises to observe
  Useful for tooling.
  @return {Promise} a promise which settles in the same way as the first passed
  promise to settle.
*/
function race(entries) {
  /*jshint validthis:true */
  var Constructor = this;

  if (!isArray(entries)) {
    return new Constructor(function (_, reject) {
      return reject(new TypeError('You must pass an array to race.'));
    });
  } else {
    return new Constructor(function (resolve, reject) {
      var length = entries.length;
      for (var i = 0; i < length; i++) {
        Constructor.resolve(entries[i]).then(resolve, reject);
      }
    });
  }
}

/**
  `Promise.reject` returns a promise rejected with the passed `reason`.
  It is shorthand for the following:

  ```javascript
  let promise = new Promise(function(resolve, reject){
    reject(new Error('WHOOPS'));
  });

  promise.then(function(value){
    // Code here doesn't run because the promise is rejected!
  }, function(reason){
    // reason.message === 'WHOOPS'
  });
  ```

  Instead of writing the above, your code now simply becomes the following:

  ```javascript
  let promise = Promise.reject(new Error('WHOOPS'));

  promise.then(function(value){
    // Code here doesn't run because the promise is rejected!
  }, function(reason){
    // reason.message === 'WHOOPS'
  });
  ```

  @method reject
  @static
  @param {Any} reason value that the returned promise will be rejected with.
  Useful for tooling.
  @return {Promise} a promise rejected with the given `reason`.
*/
function reject$1(reason) {
  /*jshint validthis:true */
  var Constructor = this;
  var promise = new Constructor(noop);
  reject(promise, reason);
  return promise;
}

function needsResolver() {
  throw new TypeError('You must pass a resolver function as the first argument to the promise constructor');
}

function needsNew() {
  throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.");
}

/**
  Promise objects represent the eventual result of an asynchronous operation. The
  primary way of interacting with a promise is through its `then` method, which
  registers callbacks to receive either a promise's eventual value or the reason
  why the promise cannot be fulfilled.

  Terminology
  -----------

  - `promise` is an object or function with a `then` method whose behavior conforms to this specification.
  - `thenable` is an object or function that defines a `then` method.
  - `value` is any legal JavaScript value (including undefined, a thenable, or a promise).
  - `exception` is a value that is thrown using the throw statement.
  - `reason` is a value that indicates why a promise was rejected.
  - `settled` the final resting state of a promise, fulfilled or rejected.

  A promise can be in one of three states: pending, fulfilled, or rejected.

  Promises that are fulfilled have a fulfillment value and are in the fulfilled
  state.  Promises that are rejected have a rejection reason and are in the
  rejected state.  A fulfillment value is never a thenable.

  Promises can also be said to *resolve* a value.  If this value is also a
  promise, then the original promise's settled state will match the value's
  settled state.  So a promise that *resolves* a promise that rejects will
  itself reject, and a promise that *resolves* a promise that fulfills will
  itself fulfill.


  Basic Usage:
  ------------

  ```js
  let promise = new Promise(function(resolve, reject) {
    // on success
    resolve(value);

    // on failure
    reject(reason);
  });

  promise.then(function(value) {
    // on fulfillment
  }, function(reason) {
    // on rejection
  });
  ```

  Advanced Usage:
  ---------------

  Promises shine when abstracting away asynchronous interactions such as
  `XMLHttpRequest`s.

  ```js
  function getJSON(url) {
    return new Promise(function(resolve, reject){
      let xhr = new XMLHttpRequest();

      xhr.open('GET', url);
      xhr.onreadystatechange = handler;
      xhr.responseType = 'json';
      xhr.setRequestHeader('Accept', 'application/json');
      xhr.send();

      function handler() {
        if (this.readyState === this.DONE) {
          if (this.status === 200) {
            resolve(this.response);
          } else {
            reject(new Error('getJSON: `' + url + '` failed with status: [' + this.status + ']'));
          }
        }
      };
    });
  }

  getJSON('/posts.json').then(function(json) {
    // on fulfillment
  }, function(reason) {
    // on rejection
  });
  ```

  Unlike callbacks, promises are great composable primitives.

  ```js
  Promise.all([
    getJSON('/posts'),
    getJSON('/comments')
  ]).then(function(values){
    values[0] // => postsJSON
    values[1] // => commentsJSON

    return values;
  });
  ```

  @class Promise
  @param {Function} resolver
  Useful for tooling.
  @constructor
*/

var Promise$1 = function () {
  function Promise(resolver) {
    this[PROMISE_ID] = nextId();
    this._result = this._state = undefined;
    this._subscribers = [];

    if (noop !== resolver) {
      typeof resolver !== 'function' && needsResolver();
      this instanceof Promise ? initializePromise(this, resolver) : needsNew();
    }
  }

  /**
  The primary way of interacting with a promise is through its `then` method,
  which registers callbacks to receive either a promise's eventual value or the
  reason why the promise cannot be fulfilled.
   ```js
  findUser().then(function(user){
    // user is available
  }, function(reason){
    // user is unavailable, and you are given the reason why
  });
  ```
   Chaining
  --------
   The return value of `then` is itself a promise.  This second, 'downstream'
  promise is resolved with the return value of the first promise's fulfillment
  or rejection handler, or rejected if the handler throws an exception.
   ```js
  findUser().then(function (user) {
    return user.name;
  }, function (reason) {
    return 'default name';
  }).then(function (userName) {
    // If `findUser` fulfilled, `userName` will be the user's name, otherwise it
    // will be `'default name'`
  });
   findUser().then(function (user) {
    throw new Error('Found user, but still unhappy');
  }, function (reason) {
    throw new Error('`findUser` rejected and we're unhappy');
  }).then(function (value) {
    // never reached
  }, function (reason) {
    // if `findUser` fulfilled, `reason` will be 'Found user, but still unhappy'.
    // If `findUser` rejected, `reason` will be '`findUser` rejected and we're unhappy'.
  });
  ```
  If the downstream promise does not specify a rejection handler, rejection reasons will be propagated further downstream.
   ```js
  findUser().then(function (user) {
    throw new PedagogicalException('Upstream error');
  }).then(function (value) {
    // never reached
  }).then(function (value) {
    // never reached
  }, function (reason) {
    // The `PedgagocialException` is propagated all the way down to here
  });
  ```
   Assimilation
  ------------
   Sometimes the value you want to propagate to a downstream promise can only be
  retrieved asynchronously. This can be achieved by returning a promise in the
  fulfillment or rejection handler. The downstream promise will then be pending
  until the returned promise is settled. This is called *assimilation*.
   ```js
  findUser().then(function (user) {
    return findCommentsByAuthor(user);
  }).then(function (comments) {
    // The user's comments are now available
  });
  ```
   If the assimliated promise rejects, then the downstream promise will also reject.
   ```js
  findUser().then(function (user) {
    return findCommentsByAuthor(user);
  }).then(function (comments) {
    // If `findCommentsByAuthor` fulfills, we'll have the value here
  }, function (reason) {
    // If `findCommentsByAuthor` rejects, we'll have the reason here
  });
  ```
   Simple Example
  --------------
   Synchronous Example
   ```javascript
  let result;
   try {
    result = findResult();
    // success
  } catch(reason) {
    // failure
  }
  ```
   Errback Example
   ```js
  findResult(function(result, err){
    if (err) {
      // failure
    } else {
      // success
    }
  });
  ```
   Promise Example;
   ```javascript
  findResult().then(function(result){
    // success
  }, function(reason){
    // failure
  });
  ```
   Advanced Example
  --------------
   Synchronous Example
   ```javascript
  let author, books;
   try {
    author = findAuthor();
    books  = findBooksByAuthor(author);
    // success
  } catch(reason) {
    // failure
  }
  ```
   Errback Example
   ```js
   function foundBooks(books) {
   }
   function failure(reason) {
   }
   findAuthor(function(author, err){
    if (err) {
      failure(err);
      // failure
    } else {
      try {
        findBoooksByAuthor(author, function(books, err) {
          if (err) {
            failure(err);
          } else {
            try {
              foundBooks(books);
            } catch(reason) {
              failure(reason);
            }
          }
        });
      } catch(error) {
        failure(err);
      }
      // success
    }
  });
  ```
   Promise Example;
   ```javascript
  findAuthor().
    then(findBooksByAuthor).
    then(function(books){
      // found books
  }).catch(function(reason){
    // something went wrong
  });
  ```
   @method then
  @param {Function} onFulfilled
  @param {Function} onRejected
  Useful for tooling.
  @return {Promise}
  */

  /**
  `catch` is simply sugar for `then(undefined, onRejection)` which makes it the same
  as the catch block of a try/catch statement.
  ```js
  function findAuthor(){
  throw new Error('couldn't find that author');
  }
  // synchronous
  try {
  findAuthor();
  } catch(reason) {
  // something went wrong
  }
  // async with promises
  findAuthor().catch(function(reason){
  // something went wrong
  });
  ```
  @method catch
  @param {Function} onRejection
  Useful for tooling.
  @return {Promise}
  */


  Promise.prototype.catch = function _catch(onRejection) {
    return this.then(null, onRejection);
  };

  /**
    `finally` will be invoked regardless of the promise's fate just as native
    try/catch/finally behaves
  
    Synchronous example:
  
    ```js
    findAuthor() {
      if (Math.random() > 0.5) {
        throw new Error();
      }
      return new Author();
    }
  
    try {
      return findAuthor(); // succeed or fail
    } catch(error) {
      return findOtherAuther();
    } finally {
      // always runs
      // doesn't affect the return value
    }
    ```
  
    Asynchronous example:
  
    ```js
    findAuthor().catch(function(reason){
      return findOtherAuther();
    }).finally(function(){
      // author was either found, or not
    });
    ```
  
    @method finally
    @param {Function} callback
    @return {Promise}
  */


  Promise.prototype.finally = function _finally(callback) {
    var promise = this;
    var constructor = promise.constructor;

    if (isFunction(callback)) {
      return promise.then(function (value) {
        return constructor.resolve(callback()).then(function () {
          return value;
        });
      }, function (reason) {
        return constructor.resolve(callback()).then(function () {
          throw reason;
        });
      });
    }

    return promise.then(callback, callback);
  };

  return Promise;
}();

Promise$1.prototype.then = then;
Promise$1.all = all;
Promise$1.race = race;
Promise$1.resolve = resolve$1;
Promise$1.reject = reject$1;
Promise$1._setScheduler = setScheduler;
Promise$1._setAsap = setAsap;
Promise$1._asap = asap;

/*global self*/
function polyfill() {
  var local = void 0;

  if (typeof __webpack_require__.g !== 'undefined') {
    local = __webpack_require__.g;
  } else if (typeof self !== 'undefined') {
    local = self;
  } else {
    try {
      local = Function('return this')();
    } catch (e) {
      throw new Error('polyfill failed because global object is unavailable in this environment');
    }
  }

  var P = local.Promise;

  if (P) {
    var promiseToString = null;
    try {
      promiseToString = Object.prototype.toString.call(P.resolve());
    } catch (e) {
      // silently ignored
    }

    if (promiseToString === '[object Promise]' && !P.cast) {
      return;
    }
  }

  local.Promise = Promise$1;
}

// Strange compat..
Promise$1.polyfill = polyfill;
Promise$1.Promise = Promise$1;

return Promise$1;

})));



//# sourceMappingURL=es6-promise.map


/***/ }),

/***/ "./node_modules/nodelist-foreach-polyfill/index.js":
/*!*********************************************************!*\
  !*** ./node_modules/nodelist-foreach-polyfill/index.js ***!
  \*********************************************************/
/***/ (function() {

if (window.NodeList && !NodeList.prototype.forEach) {
    NodeList.prototype.forEach = function (callback, thisArg) {
        thisArg = thisArg || window;
        for (var i = 0; i < this.length; i++) {
            callback.call(thisArg, this[i], i, this);
        }
    };
}


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	!function() {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = function(module) {
/******/ 			var getter = module && module.__esModule ?
/******/ 				function() { return module['default']; } :
/******/ 				function() { return module; };
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	!function() {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
!function() {
"use strict";
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var nodelist_foreach_polyfill__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! nodelist-foreach-polyfill */ "./node_modules/nodelist-foreach-polyfill/index.js");
/* harmony import */ var nodelist_foreach_polyfill__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(nodelist_foreach_polyfill__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _modules_tabs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/tabs */ "./js/modules/tabs.js");
/* harmony import */ var _modules_modal__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/modal */ "./js/modules/modal.js");
/* harmony import */ var _modules_timer__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/timer */ "./js/modules/timer.js");
/* harmony import */ var _modules_cards__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/cards */ "./js/modules/cards.js");
/* harmony import */ var _modules_calc__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/calc */ "./js/modules/calc.js");
/* harmony import */ var _modules_forms__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modules/forms */ "./js/modules/forms.js");
/* harmony import */ var _modules_slider__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./modules/slider */ "./js/modules/slider.js");
// todo используем полифил
__webpack_require__(/*! es6-promise/auto */ "./node_modules/es6-promise/auto.js");

 // ! импортируем файлы и функцию используя ES6









window.addEventListener('DOMContentLoaded', () => {
  // модалка появляется спустя время на сайте   // * перед функ пишем () => как бы обарачиваем функцию, чтобы она вызывалась только по клику
  const modalTimerId = setTimeout(() => (0,_modules_modal__WEBPACK_IMPORTED_MODULE_2__["default"])('.modal', modalTimerId), 50000); // ! в аргументы передаем селекторы, которые передаются потом в аргументы функций в других файлах js

  (0,_modules_tabs__WEBPACK_IMPORTED_MODULE_1__["default"])('.tabheader__item', '.tabcontent', '.tabheader__items', 'tabheader__item_active');
  (0,_modules_modal__WEBPACK_IMPORTED_MODULE_2__["default"])('[data-modal]', '.modal', modalTimerId);
  (0,_modules_timer__WEBPACK_IMPORTED_MODULE_3__["default"])('.timer', '2021-12-31');
  (0,_modules_cards__WEBPACK_IMPORTED_MODULE_4__["default"])();
  (0,_modules_calc__WEBPACK_IMPORTED_MODULE_5__["default"])();
  (0,_modules_forms__WEBPACK_IMPORTED_MODULE_6__["default"])('form', modalTimerId); // * modalTimerId передаю чтобы внутри модуля forms использовать

  (0,_modules_slider__WEBPACK_IMPORTED_MODULE_7__["default"])({
    // слайдер делаем по типу готовых решений slick  др
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
}();
/******/ })()
;
//# sourceMappingURL=bundle.js.map