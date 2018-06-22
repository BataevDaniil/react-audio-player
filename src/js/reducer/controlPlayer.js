// @flow

import {
	PAUSE,
	PLAY,
	TIME,
	TRACK,
	SET,
	GIVE,
} from '../constantsActions';

import player from '../player';

const DEFAULT_CONTROL_PLAYER = {
	isPlaying: false,
	pathTrack: '',
	currentTime: 0,
	duration: 0,
	currentNumberTrack: -1,
	name: '',
};

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
			const { src, name, currentNumberTrack } = payload;
			player.src = src;
			return {
				...controlPlayer, pathTrack: src, name, currentNumberTrack,
			};
		}
		case SET + TIME + TRACK: {
			player.currentTime = payload.time;
			return { ...controlPlayer, timeTrack: payload.time };
		}

		case GIVE + TIME + TRACK: {
			const { currentTime, duration } = payload;
			return { ...controlPlayer, currentTime, duration };
		}
		default:
			return controlPlayer;
	}
};
