import React, {PropTypes} from 'react';

class RegistrationTable extends React.Component {
	constructor(props, context) {
		super(props, context);
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
					<th>Leader</th>
					<th>Follower</th>
				</tr>
				</thead>
				<tbody>
				{this.props.competitors.map((item, index) => {
					return (
						<tr key={index}>
							<td>{index + 1}</td>
							<td>{item.leader}</td>
							<td>{item.follower}</td>
							<td className="table-column-right">
								<a className="tool" onClick={this.getRemoveHandler(index)}>
									<i className="fa fa-times"/>
								</a>
							</td>
						</tr>
					);
				})}
				</tbody>
			</table>
		);
	}
}
RegistrationTable.propTypes = {
	competitors: PropTypes.array.isRequired,
	remove: PropTypes.func.isRequired
};

export default RegistrationTable;