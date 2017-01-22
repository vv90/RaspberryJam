/**
 * Created by Vladimir on 1/14/2017.
 */


// var xlsx = require('xlsx');

import xlsx from 'xlsx';

function formatError(message, expected, actual) {
	let error = message + ". ";
	if (expected) {
		error += "Expected: " + JSON.stringify(expected) + " ";
	}
	if (actual) {
		error += "Actual: " + JSON.stringify(actual);
	}
	return error;
}

class TableParser {
	constructor(path) {
		this.path = path;
		this.sheetsMetadata = {
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
	}



	init() {
		this.workbook = xlsx.readFile(this.path);

		const errors = [];

		Object.keys(this.sheetsMetadata).forEach(sheetKey => {
			const sheetMetadata = this.sheetsMetadata[sheetKey];
			const sheet = this.workbook.Sheets[sheetMetadata.name];

			if (!sheet) {
				errors.push(formatError("Missing sheet", sheetMetadata.name));
			}

			if (sheetMetadata.columns) {
				Object.keys(sheetMetadata.columns).forEach(columnKey => {
					const columnMetadata = sheetMetadata.columns[columnKey];
					const cell = sheet[columnMetadata.col + sheetMetadata.headingRow];

					if(!cell) {
						errors.push(formatError("Missing cell", sheetMetadata.columns[columnKey]));
					} else {
						const cellValue = cell.v.replace(/[\r\n\s]+/, ' ');
						if (columnMetadata.value !== cellValue) {
							errors.push(formatError("Incorrect cell", columnMetadata.value, cellValue));
						}
					}
				});
			}
		});

		this.errors = errors;
	}

	readDancers() {
		const sheet = this.workbook.Sheets[this.sheetsMetadata.dancersList.name];
		const sheetMeta = this.sheetsMetadata.dancersList;
		const result = [];

		let row = sheetMeta.headingRow + 1;
		while(sheet[sheetMeta.columns.id.col + row]) {
			const rowObj = {};
			Object.keys(this.sheetsMetadata.dancersList.columns).forEach(columnKey => {
				rowObj[columnKey] = sheet[sheetMeta.columns[columnKey].col + row].v;
			});
			result.push(rowObj);
			row += 1;
		}


		return result;
	}

	isMetadataCorrect() {
		return !(this.errors.length);
	}
}

// function TableParser (path) {
// 	this.path = path;
// }
//



// TableParser.prototype.init = function () {
//
// };
//
// TableParser.prototype.readDancers = function() {
//
//
// };
//
// TableParser.prototype.isMetadataCorrect = function() {
//
// };

export default TableParser;