import React, {PropTypes} from 'react';

class QualifyingTable extends React.Component {
	constructor(props, context) {
		super(props, context);

		this.getCheckedHandler = this.getCheckedHandler.bind(this);
	}
	getCheckedHandler(judgeId, competitor) {
		return event => this.props.onSelection(judgeId, competitor, event.target.checked);
	}

	render() {
		return (
			<table className="table table-compact">
				<thead>
					<tr>
						<th className="table-column-right"></th>
						{this.props.judges.map((judge, index) => (
							<th key={index} className="table-column-centered">
								<h4>{`(${judge.id}) ${judge.name}`}</h4>
								<span className="subtext">{`(${this.props.selection.countSelected(judge.id)}/${this.props.numberToPass})`}</span>
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
										       checked={this.props.selection[judge.id][competitor]}
										       onChange={this.getCheckedHandler(judge.id, competitor)}/>
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
	selection: PropTypes.object.isRequired,
	numberToPass: PropTypes.number.isRequired,
	onSelection: PropTypes.func.isRequired
};


export default QualifyingTable;