import React, {PropTypes} from 'react';
import QualifyingTable from './QualifyingTable';

class QualifyingRound extends React.Component {
	constructor(props, context) {
		super(props, context);

		let groups = [];
		const competitorsNumber = this.props.competitors.length;
		const groupSize = Math.ceil(competitorsNumber / Math.ceil(competitorsNumber / this.props.maxGroupSize));
		let i = 0;
		while ( i < competitorsNumber) {
			groups.push(this.props.competitors.slice(i, i + groupSize));
			i += groupSize;
		}


		this.state = {
			groups: groups,
			selected: this.props.judges.reduce((result, judge) => {
				result[judge] = this.props.competitors.reduce((result, competitor) => {
					result[competitor] = false;
					return result;
				}, {});
				return result;
			}, {})
		};

		this.countSelected = this.countSelected.bind(this);
		this.updateSelection = this.updateSelection.bind(this);
	}

	countSelected(judge) {
		return Object.keys(this.state.selected[judge])
			.filter(competitor => this.state.selected[judge][competitor] === true)
			.length;
	}

	updateSelection(judge, competitor, isSelected) {
		if (isSelected &&
			!this.state.selected[judge][competitor] &&
			this.countSelected(judge) >= this.props.numberToPass) {

			console.log(`Maximum competitors already selected by judge ${judge}`);

		} else {

			const selected = this.state.selected;
			selected[judge][competitor] = isSelected;
			this.setState({selected: selected});
		}
	}

	render() {
		return (
			<div>
				<h1>Qualifying</h1>
				{this.state.groups.map((group, index) => (
					<QualifyingTable key={index}
					                 groupNumber={index + 1}
					                 competitors={group}
					                 judges={this.props.judges}
					                 selected={this.state.selected}
					                 onSelection={this.updateSelection}/>
				))}

			</div>
		);
	}
}
QualifyingRound.propTypes = {
	competitors: PropTypes.array.isRequired,
	judges: PropTypes.array.isRequired,
	maxGroupSize: PropTypes.number.isRequired,
	numberToPass: PropTypes.number.isRequired
};

export default QualifyingRound;