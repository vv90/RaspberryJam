import React from 'react';
import QualifyingTable from './QualifyingTable';

class QualifyingRound extends React.Component {
	constructor(props, context) {
		super(props, context);
		this.state = {
			competitors: ["10", "21", "52", "8", "24", "42"],
			judges: ["A", "B", "C", "D", "E"]
		};
	}

	render() {
		return (
			<div>
				<h1>Qualifying</h1>
				<QualifyingTable competitors={this.state.competitors}
				                 judges={this.state.judges}/>
			</div>
		);
	}
}

export default QualifyingRound;