// ! вынесли в отдельную папку так как работает с сервером

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

// функция для получения данных с сервера
async function getResource(url) { // url кот передается в fetch, data нет т.к. ниче не отправляем
	// обрабатываем данные которые пришли
	// await как бы (наподобие) делает синхронным, говорит надо дождаться
	let res = await fetch(url);

	// fetch если столкнет с ошибкой http 404 и др. он не выдаст ошибку-catch-reject
	// ошибкой для fetch будет отсутствие инета и др. поэтому надо такое поведение обработать
	if (!res.ok) { // если в запросе что-то не так
		throw new Error(`Cloud not fetch ${url}, status: ${res.status}`); // выбрасываем ошибку()
	}

	// возвращаем как json формат
	return await res.json(); // res это промис
}

export {postData};
export {getResource};