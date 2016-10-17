/**
 * Created by Vladimir on 10/15/2016.
 */
import * as types from '../actions/notificationActionTypes';

export default function notificationReducer (state = [], action) {
	switch (action.type) {
		case types.SHOW_NOTIFICATION: {
			return [...state, {
				text: action.notificationText,
				type: action.notificationType,
				id: action.id
			}];
		}
		case types.REMOVE_NOTIFICATION: {
			const index = state.findIndex(notification => notification.id == action.id);
			state.splice(index, 1);

			return [...state];
		}
		default:
			return state;
	}
}