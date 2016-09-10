/**
 * Created by Vladimir on 9/10/2016.
 */
import React, {PropTypes} from 'react';
import {Link, IndexLink} from 'react-router';

const Header = () => {
	return (
		<nav className="app-nav">
			<IndexLink to="/" className="nav-item" activeClassName="nav-item-active">Home</IndexLink>
			<Link to="/skating" className="nav-item" activeClassName="nav-item-active">Skating</Link>
		</nav>
	);
};

class App extends React.Component {
	render() {
		return (
			<div className="app-container">
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