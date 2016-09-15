/**
 * Created by Vladimir on 9/10/2016.
 */

import React from 'react';
import Score from './Score';

class Skating extends React.Component {
	constructor(props, context) {
		super(props, context);
		this.state = {
			contenders: ["10", "21", "52", "8", "24", "42"],
			judges: ["A", "B", "C", "D", "E"]
		};
	}

	render () {
		return (<div>
			<h1>Finals</h1>
			<Score contenders={this.state.contenders} judges={this.state.judges}/>
		</div>);
	}
}

export default Skating;