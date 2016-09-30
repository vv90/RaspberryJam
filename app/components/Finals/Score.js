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
		this.props.selectCard(this.props.competitor, this.props.judge);
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
	competitor: PropTypes.string.isRequired,
	isSelected: PropTypes.bool
};

class Score extends React.Component {
	constructor(props, context) {
		super(props, context);
		this.state = {
			selectedCard: null,
			grid: this.createGrid(props.competitors, props.judges)
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
			grid: this.createGrid(nextProps.competitors, nextProps.judges)
		});
	}

	componentWillUnmount() {
		window.removeEventListener('keydown', this.handleKeyDown);
	}

	getNextCard() {
		if (!this.state.selectedCard)
			return;

		const competitorIndex = this.props.competitors.indexOf(this.state.selectedCard.competitor);
		const judgeIndex = this.props.judges.indexOf(this.state.selectedCard.judge);

		if (judgeIndex < this.props.judges.length - 1) {
			return {
				competitor: this.state.selectedCard.competitor,
				judge: this.props.judges[judgeIndex + 1]
			};
		} else if (competitorIndex < this.props.competitors.length + 1) {
			return {
				competitor: this.props.competitors[competitorIndex + 1],
				judge: this.props.judges[0]
			};
		} else {
			return null;
		}

	}

	getSelectedCardValue() {
		return this.state.grid[this.state.selectedCard.competitor][this.state.selectedCard.judge];
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
			if (value > this.props.competitors.length)
				return;

			// check if the value is already selected for another competitor
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

		const newGrid = this.createGrid(this.props.competitors, this.props.judges, this.state.grid);
		newGrid[this.state.selectedCard.competitor][this.state.selectedCard.judge] = value;

		this.setState({grid: newGrid, selectedCard: this.getNextCard()});
	}

	createGrid(competitors, judges, oldGrid) {
		return competitors.reduce((row, competitor) => {
			row[competitor] = judges.reduce((col, judge) => {
				col[judge] = (oldGrid && oldGrid[competitor]) ? oldGrid[competitor][judge] : null;
				return col;
			}, {});

			return row;
		}, {});
	}

	testCardSelected(competitor, judge) {
		return (this.state.selectedCard &&
		this.state.selectedCard.competitor === competitor &&
		this.state.selectedCard.judge === judge);
	}

	scoreCardSelected(competitor, judge) {

		this.setState({selectedCard: {competitor, judge}});
	}

	createScoreCards(competitor) {
		const self = this;
		return self.props.judges.map((judge, index, arr) => {
				return (<div className="score-item" key={index}>
					<ScoreCard maxValue={arr.length}
					           value={self.state.grid[competitor][judge]}
					           judge={judge}
					           competitor={competitor}
					           selectCard={self.scoreCardSelected}
					           isSelected={self.testCardSelected(competitor, judge)}/>
				</div>);
			}
		);
	}

	render() {
		return (
			<div className="score">
				<div className="score-row">
					<h2 className="score-item score-label"/>
					{this.props.judges.map((judge, index) => (
						<h2 className="score-item score-label" key={index}>{judge}</h2>
					))}
				</div>

				{this.props.competitors.map((competitor, index) => (
					<div className="score-row" key={index}>
						<h2 className="score-item score-label">{competitor}</h2>
						{this.createScoreCards(competitor)}
					</div>
				))}
			</div>
		);
	}
}
Score.propTypes = {
	competitors: PropTypes.array.isRequired,
	judges: PropTypes.array.isRequired
};

export default Score;