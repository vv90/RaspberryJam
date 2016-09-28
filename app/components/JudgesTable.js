/**
 * Created by Vladimir on 9/16/2016.
 */

import React, {PropTypes} from 'react';

class JudgesTableItem extends React.Component {
	constructor(props, context) {
		super(props, context);

		this.onChange = this.onChange.bind(this);
	}

	onChange(event) {
		this.props.onChange(this.props.index, event.target.value);
	}

	render() {
		return (
			<tr key={this.props.index}>
				<td>{this.props.index}</td>
				<td><input type="text"
				           value={this.props.item.name}
				           onChange={this.onChange} /></td>
			</tr>
		);
	}
}
JudgesTableItem.propTypes = {
	index: PropTypes.number.isRequired,
	item: PropTypes.object.isRequired,
	onChange: PropTypes.func.isRequired
};

class JudgesTable extends React.Component {
	constructor(props, context) {
		super(props, context);
	}

	render() {
		return (
			<div className="box">
				<div className="box-title">
					<h3>Judges</h3>
					<div className="box-tools">
						<a onClick={this.props.add}><i className="fa fa-plus" /></a>
					</div>
				</div>
				<div className="box-content">
					<table className="table">
						<thead>
							<tr>
								<th>#</th>
								<th>Name</th>
							</tr>
						</thead>
						<tbody>
							{this.props.judges.map((item, index) => {
								return ( <JudgesTableItem key={index}
								                          index={index}
								                          item={item}
								                          onChange={this.props.onNameChange}/> );
							})}
						</tbody>
					</table>
				</div>
			</div>);
	}
}
JudgesTable.propTypes = {
	judges: PropTypes.array.isRequired,
	add: PropTypes.func.isRequired,
	onNameChange: PropTypes.func.isRequired
};

export default JudgesTable;