import React, {PropTypes} from 'react';

class RegistrationTable extends React.Component {
	constructor(props, context) {
		super(props, context);
	}

	render() {
		return (
			<div className="box">
				<div className="box-title">
					<h3>Contenders</h3>
					<div className="box-tools">
						<a onClick={this.props.add}><i className="fa fa-plus" /></a>
					</div>
				</div>
				<div className="box-content">
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
									<td>{index}</td>
									<td>{item.leader}</td>
									<td>{item.follower}</td>
								</tr>
							);
						})}
						</tbody>
					</table>
				</div>
			</div>);
	}
}
RegistrationTable.propTypes = {
	competitors: PropTypes.array.isRequired,
	add: PropTypes.func
};

export default RegistrationTable;