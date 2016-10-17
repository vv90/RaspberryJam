/**
 * Created by Vladimir on 10/17/2016.
 */
import expect from 'expect';
import * as utilsPure from './utilsPure';

describe('createQualifyingRounds', () => {
	it ('last round should be full', () => {
		const competitors = [
			{ id: 1, leader: "Andrew Smith", follower: "Jacqueline Long"},
			{ id: 2, leader: "Randy Webb", follower: "Marie Miller"},
			{ id: 3, leader: "Jeremy Barnes", follower: "Lori Alexander"},
			{ id: 4, leader: "Ryan Burns", follower: "Kelly Reid"},
			{ id: 5, leader: "Douglas Allen", follower: "Anna Myers"},
			{ id: 6, leader: "Brian Kelley", follower: "Carol Hill"},
			{ id: 7, leader: "Donald Day", follower: "Lisa Hart"}
		];
		const rounds = utilsPure.createQualifyingRounds(competitors, 5);

		expect(rounds[1].competitorsCount).toBe(5);
	});
});