/**
 * Created by Vladimir on 10/1/2016.
 */

class QualifyingSelection {
	constructor(judges, competitors) {
		// map judges and competitors from arrays to object properties for easier access
		judges.forEach((judge) => {
			this[judge.id] = competitors.reduce((result, competitor) => {
				result[competitor] = false;
				return result;
			}, {});
		});
	}

	countSelected(judgeId) {
		return Object.keys(this[judgeId])
			.filter(competitor => this[judgeId][competitor] === true)
			.length;
	}

	copySelection(selection) {
		if (!selection)
			return this;

		Object.keys(this).forEach((judge) => {
			Object.keys(this[judge]).forEach((competitor) => {
				this[judge][competitor] = selection[judge] ? selection[judge][competitor]: undefined;
			});
		});

		return this;
	}
}

export default QualifyingSelection;