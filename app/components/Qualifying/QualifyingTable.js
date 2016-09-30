import React, {PropTypes} from 'react';

class QualifyingTable extends React.Component {
	constructor(props, context) {
		super(props, context);

		this.getCheckedHandler = this.getCheckedHandler.bind(this);
	}
	getCheckedHandler(judge, competitor) {
		return event => this.props.onSelection(judge, competitor, event.target.checked);
	}

	render() {
		return (
			<table className="table table-compact">
				<thead>
					<tr>
						<th className="table-column-right"></th>
						{this.props.judges.map((judge, index) => (
							<th key={index} className="table-column-centered">
								<label key={index}>{judge}</label>
							</th>
						))}
					</tr>
				</thead>
				<tbody>
					{this.props.competitors.map((competitor, index) => (
						<tr key={index}>
							<th className="table-column-right">
								<label>{competitor}</label>
							</th>
							{this.props.judges.map((judge, index) => (
								<td key={index} className="table-column-centered">
									<label className="checkbox">
										<input type="checkbox"
										       key={index}
										       value={{judge, competitor}}
										       checked={this.props.selected[judge][competitor]}
										       onChange={this.getCheckedHandler(judge, competitor)}/>
										<span></span>
									</label>
								</td>
							))}
						</tr>
					))}
				</tbody>
			</table>
		);
	}
}
QualifyingTable.propTypes = {
	competitors: PropTypes.array.isRequired,
	judges: PropTypes.array.isRequired,
	selected: PropTypes.object.isRequired,
	onSelection: PropTypes.func.isRequired
};


export default QualifyingTable;