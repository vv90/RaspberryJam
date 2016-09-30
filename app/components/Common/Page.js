import React, {PropTypes} from 'react';

export function Page (props) {
	return (<div className="page">{props.children}</div>);
}

export function PageContent (props) {
	return (
		<div className="page-content">{props.children}</div>
	);
}

export function PageHeader (props) {
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

export function PageFooter (props) {
	return (
		<div className="page-footer">{props.children}</div>
	);
}