import React from 'react';
import JudjesTable from './JudgesTable';

class Setup extends React.Component {
	constructor(props, context) {
		super(props, context);

		this.state = {
			judges: [
				{ id: "A", name: "John Smith" },
				{ id: "B", name: "Sarah Scott" },
				{ id: "C", name: "Sam Johnson" },
				{ id: "D", name: "Mark Tucker" },
				{ id: "E", name: "Linda Cox" }
			]
		};

		this.add = this.add.bind(this);
		this.nameChanged = this.nameChanged.bind(this);
	}

	add() {
		this.setState({ judges: this.state.judges.concat([""]) });
	}

	nameChanged(index, value) {
		const judges = this.state.judges;
		judges[index].name = value;

		this.setState({judges: judges});
	}

	render() {
		return (
			<div>
				<h1>Setup</h1>
				<JudjesTable judges={this.state.judges}
				             add={this.add}
				             onNameChange={this.nameChanged}/>
			</div>);
	}
}

export default Setup;