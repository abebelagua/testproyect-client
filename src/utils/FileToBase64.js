export const fileToBase64 = file => {
	return new Promise(resolve => {
		let reader = new FileReader();

		reader.onload = event => {
			resolve(event.target.result);
		};

		reader.readAsDataURL(file);
	});
};
