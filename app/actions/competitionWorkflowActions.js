/**
 * Created by Vladimir on 10/6/2016.
 */
import * as types from './actionTypes';

export function submitSetupStep(judges) {
	return { type: types.SETUP_STEP_SUBMIT, judges: judges };
}

export function submitRegistrationStep(competitors) {
	return { type: types.REGISTRATION_STEP_SUBMIT, competitors: competitors };
}