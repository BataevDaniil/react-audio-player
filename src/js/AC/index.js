// @flow

import {
	PAUSE,
	PLAY,
	NEXT,
	PREV,
	TRACK,
	REPEAT,
	TIME,
	VOLUME,
	SET,
	GIVE,
	START,
	SUCCES,
	FAIL,
	LOAD_PLAY_LIST,
	SEARCH_PLAY_LIST,
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

export function nextPlayer() {
	return {
		type: NEXT + TRACK,
	};
}

export function prevPlayer() {
	return {
		type: PREV + TRACK,
	};
}

export function repeatPlayer() {
	return {
		type: REPEAT + TRACK,
	};
}

export function setTrack(id: string) {
	return {
		type: SET + TRACK,
		payload: { id },
	};
}

export function setTimeTrack(time: number) {
	return {
		type: SET + TIME + TRACK,
		payload: { time },
	};
}

export function setVolume(volume: number) {
	return {
		type: SET + VOLUME + TRACK,
		payload: { volume },
	};
}

export function giveTimeTrack(currentTime: number, duration: number) {
	return {
		type: GIVE + TIME + TRACK,
		payload: { currentTime, duration },
	};
}

export function setSearchPlayList(searchPlayList: string) {
	return {
		type: SET + SEARCH_PLAY_LIST,
		payload: { searchPlayList },
	};
}

export function loadPlayList(url: string) {
	return (dispatch) => {
		dispatch({
			type: LOAD_PLAY_LIST + START,
		});

		fetch(url, {
			method: 'GET',
			headers: { 'Content-Type': 'JSON' },
		})
			.then(response => response.json())
			.then(playList => dispatch({
				type: LOAD_PLAY_LIST + SUCCES,
				payload: { playList },
			}))
			.catch(error => dispatch({
				type: LOAD_PLAY_LIST + FAIL,
				payload: { error },
			}));
	};
}
