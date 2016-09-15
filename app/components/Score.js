/**
 * Created by Vladimir on 9/11/2016.
 */
import React, {PropTypes} from 'react';

class ScoreCard extends React.Component {
	constructor(props, context) {
		super(props, context);

		this.selectCard = this.selectCard.bind(this);
	}

	selectCard() {
		this.props.selectCard(this.props.contender, this.props.judge);
	}

	render() {
		return (
			<div className={`score-card${this.props.isSelected ? ' score-card-active' : ''}`}
			     onClick={this.selectCard}>
				<h2>{this.props.value ? this.props.value : this.props.judge}</h2>
			</div>
		);
	}
}

ScoreCard.propTypes = {
	selectCard: PropTypes.func.isRequired,
	value: PropTypes.string,
	judge: PropTypes.string.isRequired,
	contender: PropTypes.string.isRequired,
	isSelected: PropTypes.bool
};

class Score extends React.Component {
	constructor(props, context) {
		super(props, context);
		this.state = {
			selectedCard: null,
			grid: this.createGrid(props.contenders, props.judges)
		};

		this.scoreCardSelected = this.scoreCardSelected.bind(this);
		this.testCardSelected = this.testCardSelected.bind(this);
		this.createScoreCards = this.createScoreCards.bind(this);
		this.handleKeyDown = this.handleKeyDown.bind(this);
	}

	componentDidMount() {
		window.addEventListener('keydown', this.handleKeyDown);
	}

	componentWillReceiveProps(nextProps) {
		this.setState({
			selectedCard: null,
			grid: this.createGrid(nextProps.contenders, nextProps.judges)
		});
	}

	componentWillUnmount() {
		window.removeEventListener('keydown', this.handleKeyDown);
	}

	getNextCard() {
		if (!this.state.selectedCard)
			return;

		const contenderIndex = this.props.contenders.indexOf(this.state.selectedCard.contender);
		const judgeIndex = this.props.judges.indexOf(this.state.selectedCard.judge);

		if (judgeIndex < this.props.judges.length - 1) {
			return {
				contender: this.state.selectedCard.contender,
				judge: this.props.judges[judgeIndex + 1]
			};
		} else if (contenderIndex < this.props.contenders.length + 1) {
			return {
				contender: this.props.contenders[contenderIndex + 1],
				judge: this.props.judges[0]
			};
		} else {
			return null;
		}

	}

	getSelectedCardValue() {
		return this.state.grid[this.state.selectedCard.contender][this.state.selectedCard.judge];
	}

	handleKeyDown(event) {
		// do nothing if no card selected
		if (!this.state.selectedCard)
			return;

		let value;

		// clear value if delete or backspace were pressed
		if (event.key === 'Delete' || event.key === 'Backspace') {
			value = this.state.selectedCard.judge;
		}
		else {
			// only accept number keys
			value = parseInt(event.key);

			// check if the value is in correct range
			if (value > this.props.contenders.length)
				return;

			// check if the value is already selected for another contender
			if (this.getSelectedCardValue() != value &&
				Object.keys(this.state.grid)
					.map((key) => this.state.grid[key][this.state.selectedCard.judge])
					.find((val) => val == value)) {

				return;
			}

			// number checks are ok but we still expect a string
			value = value.toString();
		}

		// if no valid value was registered
		if (!value)
			return;

		const newGrid = this.createGrid(this.props.contenders, this.props.judges, this.state.grid);
		newGrid[this.state.selectedCard.contender][this.state.selectedCard.judge] = value;

		this.setState({grid: newGrid, selectedCard: this.getNextCard()});
	}

	createGrid(contenders, judges, oldGrid) {
		return contenders.reduce((row, contender) => {
			row[contender] = judges.reduce((col, judge) => {
				col[judge] = (oldGrid && oldGrid[contender]) ? oldGrid[contender][judge] : null;
				return col;
			}, {});

			return row;
		}, {});
	}

	testCardSelected(contender, judge) {
		return (this.state.selectedCard &&
		this.state.selectedCard.contender === contender &&
		this.state.selectedCard.judge === judge);
	}

	scoreCardSelected(contender, judge) {

		this.setState({selectedCard: {contender, judge}});
	}

	createScoreCards(contender) {
		const self = this;
		return self.props.judges.map((judge, index, arr) => {
				return (<div className="score-item" key={index}>
					<ScoreCard maxValue={arr.length}
					           value={self.state.grid[contender][judge]}
					           judge={judge}
					           contender={contender}
					           selectCard={self.scoreCardSelected}
					           isSelected={self.testCardSelected(contender, judge)}/>
				</div>);
			}
		);
	}

	render() {
		return (
			<div className="score">
				<div className="score-row">
					<h2 className="score-item score-label"/>
					{this.props.judges.map((item, index) => (
						<h2 className="score-item score-label" key={index}>{item}</h2>
					))}
				</div>

				{this.props.contenders.map((contender, index) => (
					<div className="score-row" key={index}>
						<h2 className="score-item score-label">{contender}</h2>
						{this.createScoreCards(contender)}
					</div>
				))}
			</div>
		);
	}
}
Score.propTypes = {
	contenders: PropTypes.array.isRequired,
	judges: PropTypes.array.isRequired
};

export default Score;