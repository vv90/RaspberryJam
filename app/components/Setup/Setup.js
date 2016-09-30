import React from 'react';
import PageHeader from '../Common/PageHeader';
import PageContent from '../Common/PageContent';
import Box from '../Common/Box';
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

	static getNextLetter(letter) {
		letter = letter.toUpperCase();
		const letters = ['A','B','C','D','E','F',
			'G','H','I','J','K','L','M','N','O',
			'P','Q','R','S','T','U','V','W','X','Y','Z'];
		if (letter === "Z")
			return undefined;
		else if (!letter)
			return letters[0];
		else
			return letters[letters.indexOf(letter) + 1];
	}

	add() {
		const judgeId = Setup.getNextLetter(this.state.judges[this.state.judges.length - 1].id);
		if (judgeId)
			this.setState({ judges: this.state.judges.concat([{id: judgeId, name: ""}]) });
	}

	nameChanged(index, value) {
		const judges = this.state.judges;
		judges[index].name = value;

		this.setState({judges: judges});
	}

	render() {
		return (
			<div>
				<PageHeader title="Setup"/>
				<PageContent>
					<Box title="Judges" tools={[{execute: this.add, class: "fa fa-plus"}]}>
						<JudjesTable judges={this.state.judges}
						             onNameChange={this.nameChanged}/>
					</Box>
				</PageContent>
			</div>);
	}
}

export default Setup;