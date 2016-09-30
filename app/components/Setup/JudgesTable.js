/**
 * Created by Vladimir on 9/16/2016.
 */

import React, {PropTypes} from 'react';

function JudgesTableItem (props) {
	return (
		<tr>
			<td>{props.item.id}</td>
			<td><input type="text"
			           value={props.item.name}
			           onChange={props.onChange} /></td>
		</tr>
	);
}
JudgesTableItem.propTypes = {
	item: PropTypes.object.isRequired,
	onChange: PropTypes.func.isRequired
};

class JudgesTable extends React.Component {
	constructor(props, context) {
		super(props, context);
	}

	getJudgeNameChangeHandler(index) {
		return event => this.props.onNameChange(index, event.target.value);
	}

	render() {
		return (
			<table className="table">
				<thead>
					<tr>
						<th>#</th>
						<th>Name</th>
					</tr>
				</thead>
				<tbody>
					{this.props.judges.map((item, index) =>
						(<JudgesTableItem key={index}
						                 item={item}
						                 onChange={this.getJudgeNameChangeHandler(index)}/>)
					)}
				</tbody>
			</table>
		);
	}
}
JudgesTable.propTypes = {
	judges: PropTypes.array.isRequired,
	onNameChange: PropTypes.func.isRequired
};

export default JudgesTable;