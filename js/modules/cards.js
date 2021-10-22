import {getResource} from '../services/services';

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

	// создание элементов динамически:
	// классами
	getResource('http://localhost:3000/menu') // url берем из терминала
		.then(data => { // данные приходящие с сервера, приходят как массив
			data.forEach(({
				img,
				altimg,
				title,
				descr,
				price
			}) => { // используем дестуктуризацию - получаем значения ключей
				new MenuCard(img, altimg, title, descr, price, '.menu .container').render(); // вызваем конструктор MenuCard(в конце 'куда вставляем в верстку').метод render()
			});
		});
}

// ! экспортируем используя ES6
export default cards;