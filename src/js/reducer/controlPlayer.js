// @flow

import {
	PAUSE,
	PLAY,
	TRACK,
	SET,
} from '../constantsActions';

import player from '../player';

const DEFAULT_CONTROL_PLAYER = {
	isPlaying: false,
	pathTrack: '/audio/Parallel_Park_-_01_-_Baboon_Boogie.mp3',
};

// only dev
player.src = '/audio/Parallel_Park_-_01_-_Baboon_Boogie.mp3';

export default (controlPlayer = DEFAULT_CONTROL_PLAYER, action) => {
	const { type, payload } = action;

	switch (type) {
		case PAUSE + TRACK: {
			player.pause();
			return { ...controlPlayer, isPlaying: false };
		}
		case PLAY + TRACK: {
			player.play();
			return { ...controlPlayer, isPlaying: true };
		}
		case SET + TRACK: {
			player.src = payload.src;
			return { ...controlPlayer, pathTrack: payload.src };
		}
		default:
			return player;
	}
};
