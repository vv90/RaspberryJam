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

TableParser.prototype.sheetsMetadata = {
	dancersList: {
		name: "список танцоров",
		headingRow: 2,
		columns: {
			id: {col: 'A', value: "Код"},
			fullName: {col: 'B', value: "Фамилия Имя"},
			club: {col: 'E', value: "Клуб"},
			class: {col: 'F', value: "Текущ. класс"},
			classJnJ: {col: 'G', value: "Класс ДнД"},
			sex: {col: 'H', value: "Пол"},
			source: {col: 'I', value: "Источник"}
		}
	}
};


TableParser.prototype.init = function () {
	var self = this;
	this.workbook = xlsx.readFile(this.path);

	var errors = [];

	Object.keys(this.sheetsMetadata).forEach(function (sheetKey) {
		var sheetMetadata = self.sheetsMetadata[sheetKey];
		var sheet = self.workbook.Sheets[sheetMetadata.name];

		if (!sheet) {
			errors.push(formatError("Missing sheet", sheetMetadata.name));
		}

		if (sheetMetadata.columns) {
			Object.keys(sheetMetadata.columns).forEach(function (columnKey) {
				var columnMetadata = sheetMetadata.columns[columnKey];
				var cell = sheet[columnMetadata.col + sheetMetadata.headingRow];

				if(!cell) {
					errors.push(formatError("Missing cell", sheetMetadata.columns[columnKey]));
				} else {
					var cellValue = cell.v.replace(/[\r\n\s]+/, ' ');
					if (columnMetadata.value !== cellValue) {
						errors.push(formatError("Incorrect cell", columnMetadata.value, cellValue));
					}
				}
			});
		}
	});

	this.errors = errors;
};

TableParser.prototype.readDancers = function() {

	var sheet = this.workbook.Sheets[this.sheetsMetadata.dancersList.name];
	var sheetMeta = this.sheetsMetadata.dancersList;
	var result = [];

	var row = sheetMeta.headingRow + 1;
	while(sheet[sheetMeta.columns.id.col + row]) {
		var rowObj = {};
		Object.keys(this.sheetsMetadata.dancersList.columns).forEach(function (columnKey) {
			rowObj[columnKey] = sheet[sheetMeta.columns[columnKey].col + row].v;
		});
		result.push(rowObj);
		row += 1;
	}


	return result;
};

TableParser.prototype.isMetadataCorrect = function() {
	return !(this.errors.length);
};

exports.TableParser = TableParser;