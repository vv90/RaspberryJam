/**
 * Created by Vladimir on 9/16/2016.
 */

import React, {PropTypes} from 'react';
import { browserHistory } from 'react-router';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import * as competitionWorkflowActions from '../../actions/competitionWorkflowActions';
import {Page, PageHeader, PageContent, PageFooter} from '../Common/Page';
import Box from '../Common/Box';
import RegistrationTable from './RegistrationTable';
import Dialog from '../Common/Dialog';

class Registration extends React.Component {
	constructor(props, context) {
		super(props, context);

		this.state = {
			dialog: {
				show: false,
				leader: "",
				follower: ""
			},
			competitors: props.competitorsInit
		};

		this.populateMockData = this.populateMockData.bind(this);
		this.openDialog = this.openDialog.bind(this);
		this.closeDialog = this.closeDialog.bind(this);
		this.updateDialogFields = this.updateDialogFields.bind(this);
		this.saveNewCouple = this.saveNewCouple.bind(this);
		this.removeCouple = this.removeCouple.bind(this);
		this.next = this.next.bind(this);
	}

	populateMockData() {
		const competitors = [
			{ id: 1, leader: "Andrew Smith", follower: "Jacqueline Long"},
			{ id: 2, leader: "Randy Webb", follower: "Marie Miller"},
			{ id: 3, leader: "Jeremy Barnes", follower: "Lori Alexander"},
			{ id: 4, leader: "Ryan Burns", follower: "Kelly Reid"},
			{ id: 5, leader: "Douglas Allen", follower: "Anna Myers"},
			{ id: 6, leader: "Brian Kelley", follower: "Carol Hill"},
			{ id: 7, leader: "Donald Day", follower: "Lisa Hart"},
			{ id: 8, leader: "Terry Brooks", follower: "Ruby Black"},
			{ id: 9, leader: "Raymond James", follower: "Dorothy Peters"},
			{ id: 10 ,leader: "Larry Thompson", follower: "Gloria Morris"},
			{ id: 11 ,leader: "Martin Carr", follower: "Donna Mcdonald"},
			{ id: 12 ,leader: "Carlos Hill", follower: "Jessica Fields"},
			{ id: 13 ,leader: "Charles Montgomery", follower: "Joyce Myers"},
			{ id: 14 ,leader: "Andrew Brooks", follower: "Evelyn Cook"},
			{ id: 15 ,leader: "Roger Ford", follower: "Betty Hudson"},
			{ id: 16 ,leader: "Ralph Smith", follower: "Pamela Hanson"},
			{ id: 17 ,leader: "Aaron Campbell", follower: "Rachel Ellis"},
			{ id: 18 ,leader: "Dennis Ramirez", follower: "Helen Young"},
			{ id: 19 ,leader: "Gerald Ellis", follower: "Kathy Howard"},
			{ id: 20 ,leader: "Steve Miller", follower: "Carolyn Murray"},
			{ id: 21 ,leader: "James Taylor", follower: "Michelle Wells"},
			{ id: 22 ,leader: "Justin Owens", follower: "Donna Grant"},
			{ id: 23 ,leader: "Eugene Webb", follower: "Jennifer Bryant"},
			{ id: 24 ,leader: "Ernest Holmes", follower: "Kelly Ferguson"},
			{ id: 25 ,leader: "Johnny Sanders", follower: "Michelle Dunn"},
			{ id: 26 ,leader: "Brian Snyder", follower: "Paula Woods"},
		];

		this.setState({competitors: competitors});
	}
	openDialog () {
		const dialog = Object.assign({}, this.state.dialog);
		dialog.show = true;
		this.setState({ dialog });
	}

	closeDialog () {
		const dialog = Object.assign({}, this.state.dialog);
		dialog.show = false;
		this.setState({ dialog });
	}

	saveNewCouple () {
		const dialog = Object.assign({}, this.state.dialog);

		this.setState({
			dialog: dialog,
			competitors: [
				...this.state.competitors,
				{leader: this.state.dialog.leader, follower: this.state.dialog.follower}
			]
		});

		dialog.show = false;
		dialog.leader = "";
		dialog.follower = "";
	}

	updateDialogFields (property, value) {
		const dialog = Object.assign({}, this.state.dialog);
		dialog[property] = value;
		this.setState({ dialog });
	}

	removeCouple (index) {
		const competitors = [...this.state.competitors];
		competitors.splice(index, 1);

		this.setState({ competitors });
	}

	next() {
		this.props.workflowActions.submitRegistrationStep(this.state.competitors);
		browserHistory.push("/qualifying");
	}

	back() {
		browserHistory.push("/setup");
	}

	render (){
		return (
			<Page>
				<Dialog show={this.state.dialog.show}
				        ok={this.saveNewCouple}
				        cancel={this.closeDialog}
				        leader={this.state.dialog.leader}
				        follower={this.state.dialog.follower}
				        onFormChange={this.updateDialogFields}/>

				<PageHeader title="Registration"
				            subtitle={`${this.state.competitors.length} couples registered`}/>
				<PageContent>
					<Box title="Contenders" tools={[
						{execute: this.populateMockData, class: "fa fa-asterisk", title: "Generate mock data"},
						{execute: this.openDialog, class: "fa fa-plus", title: "Add New"}
					]}>
						<RegistrationTable competitors={this.state.competitors} remove={this.removeCouple}/>
					</Box>
				</PageContent>
				<PageFooter>
					<button type="button" className="button" onClick={this.back}>Back</button>
					<button type="button" className="button button-primary" onClick={this.next}>Next</button>
				</PageFooter>
			</Page>
		);
	}
}

Registration.propTypes = {
	competitorsInit: PropTypes.array.isRequired,
	workflowActions: PropTypes.object.isRequired
};

function mapStateToProps(state, ownProps) {
	return {
		competitorsInit: state.competitionWorkflow.competitors
	};
}

function mapDispatchToProps(dispatch) {
	return {
		workflowActions: bindActionCreators(competitionWorkflowActions, dispatch)
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(Registration);