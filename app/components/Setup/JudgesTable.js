/**
 * Created by Vladimir on 9/16/2016.
 */

import React, {PropTypes} from 'react';

class JudgesTable extends React.Component {
	constructor(props, context) {
		super(props, context);
	}

	getJudgeNameChangeHandler(index) {
		return event => this.props.onNameChange(index, event.target.value);
	}

	getRemoveHandler(index) {
		return () => this.props.remove(index);
	}

	render() {
		return (
			<table className="table">
				<thead>
					<tr>
						<th>#</th>
						<th>Name</th>
						<th></th>
					</tr>
				</thead>
				<tbody>
					{this.props.judges.map((item, index) =>
						(<tr key={index}>
							<td>{item.id}</td>
							<td>
								<input type="text"
							           value={item.name}
							           onChange={this.getJudgeNameChangeHandler(index)} />
							</td>
							<td className="table-column-right">
								<a className="tool" onClick={this.getRemoveHandler(index)}>
									<i className="fa fa-times"/>
								</a>
							</td>
						</tr>)
					)}
				</tbody>
			</table>
		);
	}
}
JudgesTable.propTypes = {
	judges: PropTypes.array.isRequired,
	remove: PropTypes.func.isRequired,
	onNameChange: PropTypes.func.isRequired
};

export default JudgesTable;