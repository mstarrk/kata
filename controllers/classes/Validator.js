// Utilities methods for validation

class Validator {
	static CheckUrlImg(url) {
		return (url.match(/^http[^?]*.(jpg|jpeg|gif|png|tiff|bmp)(\?(.*))?$/gmi) != null);
	}

	static ExtractNumber(data) {
		const value = parseInt(data.replace(/\D/g, ''), 10);
		return !Number.isNaN(value) ? value : null;
	}

	static isObjectEmpty(value) {
		return (
			Object.prototype.toString.call(value) === '[object Object]'
			&& JSON.stringify(value) === '{}'
		);
	}
}


module.exports = Validator;
