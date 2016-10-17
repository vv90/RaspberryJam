/**
 * Created by Vladimir on 10/13/2016.
 */
export class QualifyingSelection {
	constructor(judges, competitors) {
		// map judges and competitors from arrays to object properties for easier access
		// QualifyingSelection[judgeId][competitorId].isSelected
		judges.forEach((judge) => {
			this[judge.id] = competitors.reduce((result, competitor) => {
				result[competitor.id] = false;
				return result;
			}, {});
		});

		this.numberToPass = Math.ceil(competitors.length/2);
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