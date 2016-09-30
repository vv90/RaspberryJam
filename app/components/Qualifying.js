import React from 'react';
import QualifyingRound from './QualifyingRound';

class Qualifying extends React.Component {
	constructor(props, context) {
		super(props, context);
		this.state = {
			competitors: ["10", "21", "52", "8", "24", "42", "13", "22", "3", "18", "54", "35", "40", "37"],
			judges: ["A", "B", "C", "D", "E"]
		};

	}

	render() {
		return (
			<QualifyingRound competitors={this.state.competitors}
			                 judges={this.state.judges}
			                 maxGroupSize={5}
			                 numberToPass={Math.ceil(this.state.competitors.length/2)} />
		);
	}
}

export default Qualifying;