import React, {PropTypes} from 'react';
import {connect} from 'react-redux';

function Notification (props) {
	let className = 'notification ';
	switch (props.type) {
		case 'success':
			className += "notification-success";
			break;
		case 'info':
			className += "notification-info";
			break;
		case 'warning':
			className += "notification-warning";
			break;
		case 'error':
			className += "notification-error";
			break;
	}

	return props.show ? (
		<div className={className}>
			{props.children}
		</div>
	) : null;
}
Notification.propTypes = {
	show: PropTypes.bool.isRequired,
	type: PropTypes.string
};

class NotificationContainer extends React.Component {
	constructor(props, context) {
		super(props, context);
	}

	render () {
		return (
			<div className="notification-container">
				{this.props.notifications.map((notification, index) => {
					return (<Notification key={index} show={true} type={notification.type}>
						{notification.text}
					</Notification>);
				})}
			</div>
		);
	}
}
NotificationContainer.propTypes = {
	notifications: PropTypes.array.isRequired
};

function mapStateToProps(state) {
	return {
		notifications: state.notifications
	};
}

export default connect(mapStateToProps)(NotificationContainer);