import React, {PropTypes} from 'react';

class QualifyingTable extends React.Component {
	constructor(props, context) {
		super(props, context);

		this.getCheckedHandler = this.getCheckedHandler.bind(this);
	}
	getCheckedHandler(judgeId, competitor) {
		return event => this.props.onSelection(judgeId, competitor, event.target.checked);
	}

	isJudgeFinished(judge) {
		return this.props.selection.countSelected(judge.id) === this.props.selection.numberToPass;
	}

	render() {
		return (
			<table className="table table-compact">
				<thead>
					<tr>
						<th className="table-column-right"></th>
						{this.props.judges.map((judge, index) => (
							<th key={index} className={this.isJudgeFinished(judge)
								? "table-column-centered text-good"
								: "table-column-centered"}>
								<h4>{`(${judge.id}) ${judge.name}`}</h4>
								<span className="subtext">{`(${this.props.selection.countSelected(judge.id)}/${this.props.selection.numberToPass})`}</span>
							</th>
						))}
					</tr>
				</thead>
				<tbody>
					{this.props.competitors.map((competitor, index) => (
						<tr key={index}>
							<th className="table-column-right">
								<label>{competitor.id}</label>
							</th>
							{this.props.judges.map((judge, index) => (
								<td key={index} className="table-column-centered">
									<label className="checkbox">
										<input type="checkbox"
										       key={index}
										       checked={this.props.selection[judge.id][competitor.id]}
										       onChange={this.getCheckedHandler(judge.id, competitor.id)}/>
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
	onSelection: PropTypes.func.isRequired
};


export default QualifyingTable;