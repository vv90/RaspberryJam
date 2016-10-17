/**
 * Created by Vladimir on 10/6/2016.
 */
import * as types from './competitionWorkflowActionTypes';

export function submitSetupStep(judges, maxGroupSize) {
	return { type: types.SETUP_STEP_SUBMIT, judges: judges, maxGroupSize: maxGroupSize };
}

export function submitRegistrationStep(competitors) {
	return { type: types.REGISTRATION_STEP_SUBMIT, competitors: competitors };
}