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
			days = Math.floor(t / (1000 * 60 * 60 *24)),
			// часы если больше 24 должны % остатком от деления переноситься в дни я так понимаю
			hours = Math.floor((t / (1000 * 60 * 60) % 24)),
			minutes = Math.floor((t / 1000 / 60) % 60),
			seconds = Math.floor((t / 1000) % 60);

		//  чтобы использовать переменные выше глобально, возращаем их
		return {
			'total': t,
			'days': days,
			'hours': hours,
			'minutes': minutes,
			'seconds': seconds
		};
	}

	// функ добавляет 0 перед числами меньше 10ти
	function getZero(num) {
		if (num >= 0 && num < 10) {
			return `0${num}`;
		}	else {
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
});
