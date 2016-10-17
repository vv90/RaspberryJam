import React, {PropTypes} from 'react';
import { browserHistory } from 'react-router';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import * as competitionWorkflowActions from '../../actions/competitionWorkflowActions';
import {Page, PageHeader, PageContent, PageFooter} from '../Common/Page';
import Box from '../Common/Box';
import JudjesTable from './JudgesTable';

class Setup extends React.Component {
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

	static orderJudgeIds (judges) {
		if (!judges || !judges.length)
			return undefined;

		judges[0].id = "A";

		for (let i = 1; i < judges.length; i++) {
			judges[i].id = Setup.getNextLetter(judges[i - 1].id);
		}

		return judges;
	}

	constructor(props, context) {
		super(props, context);

		this.state = {
			judges: props.judgesInit
		};

		this.populateMockData = this.populateMockData.bind(this);
		this.add = this.add.bind(this);
		this.remove = this.remove.bind(this);
		this.nameChanged = this.nameChanged.bind(this);
		this.next = this.next.bind(this);
	}

	populateMockData() {
		const judges = [
			{ id: "A", name: "John Smith" },
			{ id: "B", name: "Sarah Scott" },
			{ id: "C", name: "Sam Johnson" },
			{ id: "D", name: "Mark Tucker" },
			{ id: "E", name: "Linda Cox" }
		];

		this.setState({ judges: judges });
	}

	add() {
		const judgeId = Setup.getNextLetter(this.state.judges[this.state.judges.length - 1].id);
		if (judgeId)
			this.setState({ judges: [...this.state.judges, {id: judgeId, name: ""}] });
	}

	remove (index) {
		const judges = [...this.state.judges];
		judges.splice(index, 1);

		this.setState({judges: Setup.orderJudgeIds(judges)});
	}

	nameChanged(index, value) {
		const judges = [...this.state.judges];
		judges[index].name = value;

		this.setState({judges: judges});
	}

	next () {
		this.props.workflowActions.submitSetupStep(this.state.judges, 5);
		browserHistory.push("/registration");
	}

	render() {
		return (
			<Page>
				<PageHeader title="Setup"/>
				<PageContent>
					<Box title="Judges" tools={[
						{execute: this.populateMockData, class: "fa fa-asterisk", title: "Generate mock data"},
						{execute: this.add, class: "fa fa-plus", title: "Add New"}
					]}>
						<JudjesTable judges={this.state.judges}
						             remove={this.remove}
						             onNameChange={this.nameChanged}/>
					</Box>
				</PageContent>
				<PageFooter>
					<button type="button" className="button button-primary" onClick={this.next}>Next</button>
				</PageFooter>
			</Page>);
	}
}

Setup.propTypes = {
	judgesInit: PropTypes.array.isRequired,
	workflowActions: PropTypes.object.isRequired
};

function mapStateToProps(state, ownProps) {
	return {
		judgesInit: state.competitionWorkflow.judges
	};
}

function mapDispatchToProps(dispatch) {
	return {
		workflowActions: bindActionCreators(competitionWorkflowActions, dispatch)
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(Setup);