const errorMsg = new Error('Error:');

class Entity {
	static async GetRandom(data) {
		if (!data) return errorMsg;

		try {
			const r = Math.floor(Math.random() * data.length);
			return data[r] || 'No hay nada. :(';
		}
		catch (err) {
			console.error(err);
			return `${errorMsg} ${err}`;
		}
	}

	static async GetById(id, data) {
		if (!data) return 'Datos vacios.';

		const result = data.find((el) => el.id === id);
		return result;
	}

	static async Set(Model, dataValues) {
		try {
			const element = await Model.create(dataValues);
			return `💾✅ - ID: ${element.id}`;
		}
		catch (err) {
			console.log(`El error de la consulta:\n${err}`);
			return `⛔❌ -${errorMsg}`;
		}
	}
}

module.exports = Entity;
