/**
 * Created by Vladimir on 10/16/2016.
 */

export function shuffle(array) {
	let currentIndex = array.length, temporaryValue, randomIndex;

	// While there remain elements to shuffle...
	while (0 !== currentIndex) {

		// Pick a remaining element...
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex -= 1;

		// And swap it with the current element.
		temporaryValue = array[currentIndex];
		array[currentIndex] = array[randomIndex];
		array[randomIndex] = temporaryValue;
	}

	return array;
}

export function createGroups (competitors, maxGroupSize) {
	const competitorsCount = competitors.length;
	const groupSize = Math.floor(competitorsCount / Math.ceil(competitorsCount / maxGroupSize));
	const shuffledCompetitors = shuffle([...competitors]);

	const groups = [];
	let i = 0;
	while ( i < competitorsCount) {
		groups.push(shuffledCompetitors.slice(i, i + groupSize));
		i += groupSize;
	}

	return groups;
}

export function createQualifyingRounds (competitors, maxGroupSize) {
	let competitorsInRound = competitors.length;
	const rounds = [];
	while (competitorsInRound > maxGroupSize) {
		rounds.push({competitorsCount: competitorsInRound});

		competitorsInRound = Math.ceil(competitorsInRound / 2);
	}

	rounds.push({competitorsCount: maxGroupSize});

	return rounds;
}