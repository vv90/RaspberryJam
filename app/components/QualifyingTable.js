import React, {PropTypes} from 'react';

class QualifyingTable extends React.Component {
	constructor(props, context) {
		super(props, context);
	}

	render() {
		return (
			<div className="box">
				<div className="box-content">
					<table className="table">
						<thead>
							<tr>
								<th>Group 1</th>
								{this.props.judges.map((judge, index) => (
									<th><label key={index}>{judge}</label></th>
								))}
							</tr>
						</thead>
						<tbody>
							{this.props.competitors.map((competitor, index) => (
								<tr key={index}>
									<td><label>{competitor}</label></td>
									{this.props.judges.map((judge, index) => (
										<td><label className="checkbox"><input type="checkbox" key={index} /><span></span></label></td>
									))}
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>
		);
	}
}
QualifyingTable.propTypes = {
	competitors: PropTypes.array.isRequired,
	judges: PropTypes.array.isRequired
};


export default QualifyingTable;