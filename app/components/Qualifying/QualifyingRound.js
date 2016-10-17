import React, {PropTypes} from 'react';
import Box from '../Common/Box';
import QualifyingTable from './QualifyingTable';

class QualifyingRound extends React.Component {
	constructor(props, context) {
		super(props, context);
	}

	render() {
		return (
			<div>
				{this.props.groups.map((group, index) => (
					<Box key={index} title={`Group ${index + 1}`} >
						<QualifyingTable competitors={group}
						                 judges={this.props.judges}
						                 selection={this.props.selection}
						                 numberToPass={this.props.numberToPass}
						                 onSelection={this.props.updateSelection}/>
					</Box>
				))}
			</div>
		);
	}
}
QualifyingRound.propTypes = {
	// competitors: PropTypes.array.isRequired,
	judges: PropTypes.array.isRequired,
	groups: PropTypes.array.isRequired,
	selection: PropTypes.object.isRequired,
	maxGroupSize: PropTypes.number.isRequired,
	numberToPass: PropTypes.number.isRequired,
	updateSelection: PropTypes.func.isRequired
};

export default QualifyingRound;