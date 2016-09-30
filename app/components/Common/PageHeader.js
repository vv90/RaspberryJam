import React, {PropTypes} from 'react';

function PageHeader (props) {
	return (
		<div className="page-header">
			<h1 className="page-header-title">{props.title}</h1>
			<span className="page-header-subtitle">{props.subtitle}</span>
		</div>
	);
}
PageHeader.propTypes = {
	title: PropTypes.string,
	subtitle: PropTypes.string
};

export default PageHeader;