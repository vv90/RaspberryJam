/**
 * Created by Vladimir on 9/16/2016.
 */

import React from 'react';
import PageHeader from '../Common/PageHeader';
import PageContent from '../Common/PageContent';
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
	}

	openDialog () {
		const dialog = this.state.dialog;
		dialog.show = true;
		this.setState({ dialog: dialog });
	}

	closeDialog () {
		const dialog = this.state.dialog;
		dialog.show = false;
		this.setState({ dialog: dialog});
	}

	saveNewCouple () {
		const dialog = this.state.dialog;

		this.setState({
			dialog: dialog,
			competitors: this.state.competitors.concat(
				[{leader: this.state.dialog.leader, follower: this.state.dialog.follower}])
		});

		dialog.show = false;
		dialog.leader = "";
		dialog.follower = "";
	}

	updateDialogFields (property, value) {
		const dialog = this.state.dialog;
		dialog[property] = value;
		this.setState({ dialog });
	}

	render (){
		return (<div>
			<PageHeader title="Registration"
			            subtitle={`${this.state.competitors.length} couples registered`}/>
			<Dialog show={this.state.dialog.show}
			        ok={this.saveNewCouple}
			        cancel={this.closeDialog}
			        leader={this.state.dialog.leader}
			        follower={this.state.dialog.follower}
			        onFormChange={this.updateDialogFields}/>
			<PageContent>
				<Box title="Contenders" tools={[{execute: this.openDialog, class: "fa fa-plus"}]}>
					<RegistrationTable competitors={this.state.competitors}/>
				</Box>
			</PageContent>
		</div>);
	}
}

export default Registration;