// @flow

import {
	PAUSE,
	PLAY,
	TRACK,
	TIME,
	SET,
	GIVE,
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

export function setTrack(src: string, name: string, currentNumberTrack: number) {
	return {
		type: SET + TRACK,
		payload: { src, name, currentNumberTrack },
	};
}

export function setTimeTrack(time: number) {
	return {
		type: SET + TIME + TRACK,
		payload: { time },
	};
}

export function giveTimeTrack(currentTime: number, duration: number) {
	return {
		type: GIVE + TIME + TRACK,
		payload: { currentTime, duration },
	};
}

export function setCurrentTrack(number: number) {
	return {
		type: SET + TIME + TRACK,
		payload: { number },
	};
}
