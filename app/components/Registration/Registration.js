/**
 * Created by Vladimir on 9/16/2016.
 */

import React from 'react';
import { browserHistory } from 'react-router';
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
			competitors: [
				{ leader: "Andrew Smith", follower: "Jacqueline Long"},
				{ leader: "Randy Webb", follower: "Marie Miller"},
				{ leader: "Jeremy Barnes", follower: "Lori Alexander"},
				{ leader: "Ryan Burns", follower: "Kelly Reid"},
				{ leader: "Douglas Allen", follower: "Anna Myers"},
				{ leader: "Brian Kelley", follower: "Carol Hill"},
				{ leader: "Donald Day", follower: "Lisa Hart"},
				{ leader: "Terry Brooks", follower: "Ruby Black"},
				{ leader: "Raymond James", follower: "Dorothy Peters"},
				{ leader: "Larry Thompson", follower: "Gloria Morris"},
				{ leader: "Martin Carr", follower: "Donna Mcdonald"},
				{ leader: "Carlos Hill", follower: "Jessica Fields"},
				{ leader: "Charles Montgomery", follower: "Joyce Myers"},
				{ leader: "Andrew Brooks", follower: "Evelyn Cook"},
				{ leader: "Roger Ford", follower: "Betty Hudson"},
				{ leader: "Johnny Sanders", follower: "Michelle Dunn"},
				{ leader: "Ralph Smith", follower: "Pamela Hanson"},
				{ leader: "Aaron Campbell", follower: "Rachel Ellis"},
				{ leader: "Dennis Ramirez", follower: "Helen Young"},
				{ leader: "Gerald Ellis", follower: "Kathy Howard"},
				{ leader: "Steve Miller", follower: "Carolyn Murray"},
				{ leader: "James Taylor", follower: "Michelle Wells"},
				{ leader: "Justin Owens", follower: "Donna Grant"},
				{ leader: "Eugene Webb", follower: "Jennifer Bryant"},
				{ leader: "Ernest Holmes", follower: "Kelly Ferguson"},
				{ leader: "Brian Snyder", follower: "Paula Woods"},
			]
		};

		this.openDialog = this.openDialog.bind(this);
		this.closeDialog = this.closeDialog.bind(this);
		this.updateDialogFields = this.updateDialogFields.bind(this);
		this.saveNewCouple = this.saveNewCouple.bind(this);
		this.removeCouple = this.removeCouple.bind(this);
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
					<Box title="Contenders" tools={[{execute: this.openDialog, class: "fa fa-plus"}]}>
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

export default Registration;