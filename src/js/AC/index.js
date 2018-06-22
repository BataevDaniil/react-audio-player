// @flow

import {
	PAUSE,
	PLAY,
	TRACK,
} from '../constantsActions';

export function pausePlayer() {
	return {
		type: PAUSE + TRACK,
	};
}

export function playPlayer() {
	return {
		type: PLAY + TRACK,
	};
}

export function setPathTrack(path: string) {
	return {
		type: PLAY + TRACK,
		payload: { path },
	};
}
