/**
 * Created by Vladimir on 9/10/2016.
 */

import React from 'react';
import { browserHistory } from 'react-router';
import {Page, PageHeader, PageContent, PageFooter} from '../Common/Page';
import Box from '../Common/Box';
import Score from './Score';

class Skating extends React.Component {
	constructor(props, context) {
		super(props, context);
		this.state = {
			competitors: ["10", "21", "52", "8", "24", "42"],
			judges: ["A", "B", "C", "D", "E"]
		};
	}

	back() {
		browserHistory.push("/qualifying");
	}

	render () {
		return (
			<Page>
				<PageHeader title="Finals"/>
				<PageContent>
					<Box>
						<Score competitors={this.state.competitors} judges={this.state.judges}/>
					</Box>
				</PageContent>
				<PageFooter>
					<button type="button" className="button" onClick={this.back}>Back</button>
					<button type="button" className="button button-primary">Finish</button>
				</PageFooter>
			</Page>
		);
	}
}

export default Skating;