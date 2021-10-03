// Utilities methods for validation

class Validator {
  static CheckUrlImg(url) {
    return (
      url.match(/^http[^?]*.(jpg|jpeg|gif|png|tiff|bmp)(\?(.*))?$/gim) != null
    );
  }

  static ExtractNumber(data) {
    const value = parseInt(data.replace(/\D/g, ""), 10);
    return !Number.isNaN(value) ? value : null;
  }

  static isObjectEmpty(value) {
    return (
      Object.prototype.toString.call(value) === "[object Object]" &&
      JSON.stringify(value) === "{}"
    );
  }

  static validateKey(key) {
    if (!key || !process.env.KEY) throw new Error("Failed to validate key.");

    return key === process.env.KEY ? true : false;
  }
}

module.exports = Validator;
