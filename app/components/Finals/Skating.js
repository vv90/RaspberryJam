/**
 * Created by Vladimir on 9/10/2016.
 */

import React from 'react';
import PageHeader from '../Common/PageHeader';
import PageContent from '../Common/PageContent';
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

	render () {
		return (<div>
			<PageHeader title="Finals"/>
			<PageContent>
				<Box>
					<Score competitors={this.state.competitors} judges={this.state.judges}/>
				</Box>
			</PageContent>
		</div>);
	}
}

export default Skating;