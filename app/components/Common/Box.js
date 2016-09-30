import React, {PropTypes} from 'react';

function Box (props) {
	return (
		<div className="box">
			<div className="box-title">
				<h3>{props.title}</h3>
				{(props.tools && props.tools.length) ? (
					<div className="box-tools">
						{props.tools.map((tool, index) => (
							<a key={index} onClick={tool.execute}><i className={tool.class}/></a>
						))}
					</div>
				) : null}
			</div>
			<div className="box-content">
				{props.children}
			</div>
		</div>
	);
}
Box.propTypes = {
	title: PropTypes.string,
	tools: PropTypes.array,
};

export default Box;