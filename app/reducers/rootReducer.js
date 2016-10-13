/**
 * Created by Vladimir on 10/6/2016.
 */
import {combineReducers} from 'redux';
import competitionWorkflowReducer from './competitionWorkflowReducer';

const rootReducer = combineReducers({
	competitionWorkflow: competitionWorkflowReducer
});

export default rootReducer;