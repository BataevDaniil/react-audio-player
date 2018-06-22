// @flow

import { TRACK } from '../constantsActions';

// only def
const DEFAULT_PLAY_LIST = [
	{ name: '/audio/Parallel_Park_-_01_-_Baboon_Boogie.mp3', time: '1:1' },
	{ name: '/audio/Dave_Keifer_-_05_-_A_Garden_for_L.mp3', time: '1:1' },
	{ name: '/audio/Luck__Doc_-_03_-_For_The_Gods.mp3', time: '1:1' },
	{ name: '/audio/Machine_16bit_MAIN_FINAL_08_29_17.mp3', time: '1:1' },
	{ name: '/audio/Split_Phase_-_38_-_Galaxies.mp3', time: '1:1' },
];

export default (playList = DEFAULT_PLAY_LIST, action) => {
	const { type, payload } = action;

	switch (type) {
		default:
			return playList;
	}
};
