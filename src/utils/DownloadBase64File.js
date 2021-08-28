function downloadBase64File(base64data, name = "file.txt") {
	if (window.navigator && window.navigator.msSaveOrOpenBlob)
		return window.navigator.msSaveOrOpenBlob(blob);

	const byteCharacters = atob(base64data);
	const len = byteCharacters.length;
	const byteNumbers = new Array(len);
	for (let i = 0; i < len; i++) {
		byteNumbers[i] = byteCharacters.charCodeAt(i);
	}
	const byteArray = new Uint8Array(byteNumbers);

	const blob = new Blob([byteArray], {
		type: "application/pdf"
	});

	const data = window.URL.createObjectURL(blob);

	const link = document.createElement("a");
	link.href = data;
	link.download = name;

	link.dispatchEvent(
		new MouseEvent("click", {
			bubbles: true,
			cancelable: true,
			view: window
		})
	);

	setTimeout(() => {
		// For Firefox it is necessary to delay revoking the ObjectURL
		window.URL.revokeObjectURL(data);
		link.remove();
	}, 100);
}

export default downloadBase64File;
