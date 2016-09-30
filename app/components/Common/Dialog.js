import React, {PropTypes} from 'react';

class Dialog extends React.Component {
	constructor(props, context) {
		super(props, context);
	}

	getChangeHandler (property) {
		return event => this.props.onFormChange(property, event.target.value);
	}

	render() {
		return this.props.show ? (
			<div className="dialog-overlay">
				<div className="dialog" >
					<div className="dialog-header">
						<h2>Register couple</h2>
					</div>
					<div className="dialog-body">
						<div className="form">
							<div className="form-row">
								<label className="form-label">Leader</label>
								<input className="form-input" type="text"
								       onChange={this.getChangeHandler("leader")}
								       value={this.props.leader}/>
							</div>
							<div className="form-row">
								<label className="form-label">Follower</label>
								<input className="form-input" type="text"
								       onChange={this.getChangeHandler("follower")}
								       value={this.props.follower}/>
							</div>
						</div>
					</div>
					<div className="dialog-footer">
						<button type="button" className="button"
						        onClick={this.props.cancel}>Cancel</button>
						<button type="button" className="button button-primary"
						        onClick={this.props.ok}>OK</button>
					</div>
				</div>
			</div>
		) : null;
	}
}
Dialog.propTypes = {
	show: PropTypes.bool.isRequired,
	leader: PropTypes.string,
	follower: PropTypes.string,
	ok: PropTypes.func,
	cancel: PropTypes.func,
	onFormChange: PropTypes.func,
};

export default Dialog;