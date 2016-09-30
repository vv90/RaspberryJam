import React from 'react';
import PageHeader from '../Common/PageHeader';
import PageContent from '../Common/PageContent';
import QualifyingRound from './QualifyingRound';

class Qualifying extends React.Component {
	constructor(props, context) {
		super(props, context);
		const competitors =
			["10", "21", "52", "8", "24", "42", "13", "22", "3", "18", "54", "35", "40", "37"];
		const judges = ["A", "B", "C", "D", "E"];
		this.state = {
			numberToPass: Math.ceil(competitors.length/2),
			competitors: competitors,
			judges: judges
		};

	}

	render() {
		return (
			<div>
				<PageHeader title="Qualifying"
				            subtitle={`Select ${this.state.numberToPass}/${this.state.competitors.length} to pass to the next round`}/>
				<PageContent>
					<QualifyingRound competitors={this.state.competitors}
				                 judges={this.state.judges}
				                 maxGroupSize={5}
				                 numberToPass={Math.ceil(this.state.competitors.length/2)} />
				</PageContent>
			</div>
		);
	}
}

export default Qualifying;