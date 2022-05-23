function request(url, methods, data) {
	return new Promise(resolve, reject => {
		const xhr = new XMLHttpRequest();
		xhr.responseType = 'text';
		xhr.open(methods, url, true);
		xhr.onload = () => {
			const resJson = JSON.parse(xhr.responseText);
			resolve(resJson);
		}
	}).then(data => {
		console.log(data);
	}).catch(err => {
		console.log(err);
	});
}