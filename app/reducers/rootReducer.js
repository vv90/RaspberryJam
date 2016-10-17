/**
 * Created by Vladimir on 10/6/2016.
 */
import {combineReducers} from 'redux';
import competitionWorkflowReducer from './competitionWorkflowReducer';
import notificationReducer from './notificationReducer';

const rootReducer = combineReducers({
	competitionWorkflow: competitionWorkflowReducer,
	notifications: notificationReducer
});

export default rootReducer;