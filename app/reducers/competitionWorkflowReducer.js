/**
 * Created by Vladimir on 10/11/2016.
 */
import * as types from '../actions/competitionWorkflowActionTypes';
import * as utils from '../bl/utilsPure';

const defaultState = {
	judges: [],
	competitors: []
};

export default function competitionWorkflowReducer (state = defaultState, action) {
	switch (action.type) {
		case types.SETUP_STEP_SUBMIT:
			return Object.assign({}, state,
				{ judges: action.judges, maxGroupSize: action.maxGroupSize}
			);
		case types.REGISTRATION_STEP_SUBMIT:
			return Object.assign({}, state, {
				competitors: action.competitors,
				groups: utils.createGroups(action.competitors, state.maxGroupSize)
			});
		default:
			return state;
	}
}