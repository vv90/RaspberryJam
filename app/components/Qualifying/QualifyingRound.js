import React, {PropTypes} from 'react';
import Box from '../Common/Box';
import QualifyingTable from './QualifyingTable';
import QualifyingSelection from './qualifyingSelection';

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
			selection: new QualifyingSelection(props.judges, props.competitors)
		};

		this.updateSelection = this.updateSelection.bind(this);
	}

	updateSelection(judgeId, competitor, isSelected) {
		if (isSelected &&
			!this.state.selection[judgeId][competitor] &&
			this.state.selection.countSelected(judgeId) >= this.props.numberToPass) {

			console.log(`Maximum competitors already selected by judge ${judgeId}`);

		} else {

			const selection = new QualifyingSelection(this.props.judges, this.props.competitors)
				.copySelection(this.state.selection);

			selection[judgeId][competitor] = isSelected;
			this.setState({selection: selection});
		}
	}

	render() {
		return (
			<div>
				{this.state.groups.map((group, index) => (
					<Box key={index} title={`Group ${index + 1}`} >
						<QualifyingTable competitors={group}
						                 judges={this.props.judges}
						                 selection={this.state.selection}
						                 numberToPass={this.props.numberToPass}
						                 onSelection={this.updateSelection}/>
					</Box>
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