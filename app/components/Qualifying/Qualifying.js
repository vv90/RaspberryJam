import React, {PropTypes} from 'react';
import { browserHistory } from 'react-router';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import * as competitionWorkflowActions from '../../actions/competitionWorkflowActions';
import * as notificationActions from '../../actions/notificationActions';
import {Page, PageHeader, PageContent, PageFooter} from '../Common/Page';
import Box from '../Common/Box';
import QualifyingTable from './QualifyingTable';
import {QualifyingSelection} from '../../bl/qualifying';

class Qualifying extends React.Component {
	constructor(props, context) {
		super(props, context);

		this.state = {
			selection: new QualifyingSelection(props.judges, props.competitors)
		};

		this.updateSelection = this.updateSelection.bind(this);
		this.isSelectionComplete = this.isSelectionComplete.bind(this);
		this.next = this.next.bind(this);
	}

	updateSelection(judgeId, competitorId, isSelected) {
		if (isSelected &&
			!this.state.selection[judgeId][competitorId] &&
			this.state.selection.countSelected(judgeId) >= this.state.selection.numberToPass) {

			this.props.notificationActions.showNotification(
				`Maximum competitors already selected by judge ${judgeId}`, 'warning'
			);

		} else {

			const selection = new QualifyingSelection(this.props.judges, this.props.competitors)
				.copySelection(this.state.selection);

			selection[judgeId][competitorId] = isSelected;
			this.setState({selection: selection});
		}
	}

	isSelectionComplete () {
		return !this.props.judges.find(judge => {
			return this.state.selection.countSelected(judge.id) !== this.state.selection.numberToPass;
		});
	}

	next() {
		if (!this.isSelectionComplete()) {
			this.props.notificationActions.showNotification(
				'Not all judges have finished their selections', 'warning');
		}
		// this.props.notificationActions.showNotification("This is a notification", 4000, "warning");
		// browserHistory.push("/skating");
	}

	back() {
		browserHistory.push("/registration");
	}

	render() {
		return (
			<Page>
				<PageHeader title="Qualifying"
				            subtitle={`Select ${this.state.selection.numberToPass}/${this.props.competitors.length} to pass to the next round`}/>
				<PageContent>
					{this.props.groups.map((group, index) => (
						<Box key={index} title={`Group ${index + 1}`} >
							<QualifyingTable competitors={group}
							                 judges={this.props.judges}
							                 selection={this.state.selection}
							                 onSelection={this.updateSelection}/>
						</Box>
					))}
				</PageContent>
				<PageFooter>
					<button type="button" className="button" onClick={this.back}>Back</button>
					<button type="button" className="button button-primary" onClick={this.next}>Next</button>
				</PageFooter>
			</Page>
		);
	}
}

Qualifying.propTypes = {
	competitors: PropTypes.array.isRequired,
	judges: PropTypes.array.isRequired,
	groups: PropTypes.array.isRequired,
	workflowActions: PropTypes.object.isRequired,
	notificationActions: PropTypes.object.isRequired
};

function mapStateToProps(state, ownProps) {
	return {
		competitors: state.competitionWorkflow.competitors,
		judges: state.competitionWorkflow.judges,
		groups: state.competitionWorkflow.groups
	};
}

function mapDispatchToProps(dispatch) {
	return {
		workflowActions: bindActionCreators(competitionWorkflowActions, dispatch),
		notificationActions: bindActionCreators(notificationActions, dispatch)
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(Qualifying);