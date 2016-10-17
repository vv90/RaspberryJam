/**
 * Created by Vladimir on 10/15/2016.
 */
import * as types from './notificationActionTypes';

// export function showNotification(notificationText) {
// 	return { type: types.SHOW_NOTIFICATION, notificationText: notificationText};
// }
//
// export function removeNotification(notification) {
// 	return { type: types.REMOVE_NOTIFICATION, notification: notification };
// }

let notificationId = 0;
export function showNotification (notificationText, notificationType = 'info', timeout = 4000) {
	return function (dispatch) {
		const id = notificationId++;
		dispatch({
			type: types.SHOW_NOTIFICATION,
			notificationText: notificationText,
			notificationType: notificationType,
			id: id
		});

		setTimeout(() => {
			dispatch({ type: types.REMOVE_NOTIFICATION, id: id });
		}, timeout);
	};
}