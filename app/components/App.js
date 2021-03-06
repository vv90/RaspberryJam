/**
 * Created by Vladimir on 9/10/2016.
 */
import React, {PropTypes} from 'react';
import {Link, IndexLink} from 'react-router';

import NotificationContainer from './Common/Notifications';

const Header = () => {
	return (
		<nav className="app-nav">
			<IndexLink to="/" className="nav-item" activeClassName="nav-item-active">Home</IndexLink>
			<Link to="/setup" className="nav-item" activeClassName="nav-item-active">Setup</Link>
			<Link to="/registration" className="nav-item" activeClassName="nav-item-active">Registration</Link>
			<Link to="/qualifying" className="nav-item" activeClassName="nav-item-active">Qualifying</Link>
			<Link to="/skating" className="nav-item" activeClassName="nav-item-active">Skating</Link>
		</nav>
	);
};

class App extends React.Component {
	render() {
		return (
			<div className="app-container">
				<NotificationContainer/>
				<Header />
				<div className="view-container">
					{this.props.children}
				</div>
			</div>
		);
	}
}
App.propTypes = {
	children: PropTypes.object.isRequired
};

export default App;