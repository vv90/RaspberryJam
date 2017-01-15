/**
 * Created by Vladimir on 1/14/2017.
 */


var xlsx = require('xlsx');

function formatError(message, expected, actual) {
	var error = message + ". ";
	if (expected) {
		error += "Expected: " + JSON.stringify(expected) + " ";
	}
	if (actual) {
		error += "Actual: " + JSON.stringify(actual);
	}
	return error;
}

function TableParser (path) {
	this.path = path;
}

TableParser.prototype.sheetsMetadata = [
	{
		name: "техническое"
	},
	{
		name: "организаторам"
	},
	{
		name: "клубы"
	},
	{
		name: "история классов"
	},
	{
		name: "список танцоров",
		columns: {
			A2: "Код",
			B2: "Фамилия Имя",
			D2: "Прежняя фамилия",
			E2: "Клуб",
			F2: "Текущ. класс",
			G2: "Класс ДнД",
			H2: "Пол",
			I2: "Источник",
			J2: "дубль ФИ",
			K2: "Дубл кода",
			L2: "Новые переводы"
		}
	},
	{
		name: "rating"
	},
	{
		name: "rating ДнД"
	},
	{
		name: "новые переводы"
	},
	{
		name: "как читать результат"
	},
	{
		name: "баллы ECBA-DnD"
	},
	{
		name: "баллы D"
	},
	{
		name: "баллы Star"
	}
];

TableParser.prototype.init = function () {
	var self = this;
	this.workbook = xlsx.readFile(this.path);

	var errors = [];

	this.workbook.SheetNames.forEach(function (sheetName, index) {
		var sheetMetadata = self.sheetsMetadata[index];

		if (sheetName !== sheetMetadata.name) {
			errors.push(formatError("Incorrect sheet name at position " + index,
				sheetMetadata.name,
				sheetName));

		} else if (sheetMetadata.columns) {
			var sheet = self.workbook.Sheets[sheetName];
			Object.keys(sheetMetadata.columns).forEach(function (column) {
				var cell = sheet[column];

				if(!cell) {
					errors.push(formatError("Missing cell", { column: column, value: sheetMetadata.columns[column] }));
				} else if (sheetMetadata.columns[column] !== cell.v.replace(/\w+/, ' ')) {
					errors.push(formatError("Incorrect cell", sheetMetadata.columns[column], cell.v.replace(/\w+/, ' ')));
				}
			});
		}
	});

	this.errors = errors;
};

TableParser.prototype.readDancers = function() {


	return { sheetNames: this.workbook.SheetNames };
};

TableParser.prototype.isMetadataCorrect = function() {
	return !(this.errors.length);
};

exports.TableParser = TableParser;