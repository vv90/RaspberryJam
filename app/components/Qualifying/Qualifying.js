import React from 'react';
import { browserHistory } from 'react-router';
import {Page, PageHeader, PageContent, PageFooter} from '../Common/Page';
import QualifyingRound from './QualifyingRound';

class Qualifying extends React.Component {
	constructor(props, context) {
		super(props, context);
		const competitors =
			["10", "21", "52", "8", "24", "42", "13", "22", "3", "18", "54", "35", "40", "37"];
		const judges = [
			{ id: "A", name: "John Smith" },
			{ id: "B", name: "Sarah Scott" },
			{ id: "C", name: "Sam Johnson" },
			{ id: "D", name: "Mark Tucker" },
			{ id: "E", name: "Linda Cox" }
		];
		this.state = {
			numberToPass: Math.ceil(competitors.length/2),
			competitors: competitors,
			judges: judges
		};

	}

	next() {
		browserHistory.push("/skating");
	}

	back() {
		browserHistory.push("/registration");
	}

	render() {
		return (
			<Page>
				<PageHeader title="Qualifying"
				            subtitle={`Select ${this.state.numberToPass}/${this.state.competitors.length} to pass to the next round`}/>
				<PageContent>
					<QualifyingRound competitors={this.state.competitors}
				                 judges={this.state.judges}
				                 maxGroupSize={5}
				                 numberToPass={Math.ceil(this.state.competitors.length/2)} />
				</PageContent>
				<PageFooter>
					<button type="button" className="button" onClick={this.back}>Back</button>
					<button type="button" className="button button-primary" onClick={this.next}>Next</button>
				</PageFooter>
			</Page>
		);
	}
}

export default Qualifying;