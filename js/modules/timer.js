// ? пишем функцию и внутрь перемещаем участок кода из файла script.js
function timer() {
	// ! Timer

	// переменная определяющая дедлайн
	const deadline = '2022-01-31';

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
}

// ! экспортируем используя CommonJS
module.exports = timer;