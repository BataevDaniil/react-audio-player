// @flow

import {
	PAUSE,
	PLAY,
	NEXT,
	PREV,
	REPEAT,
	TIME,
	VOLUME,
	TRACK,
	SET,
	GIVE,
	LOAD_PLAY_LIST,
	SUCCES,
	FAIL,
	START,
	SEARCH_PLAY_LIST,
} from '../constantsActions';

import player from '../player';

import { filterSearcher } from '../helper';

import { type ControlPanelReducer } from '../flow-typed';

const DEFAULT_CONTROL_PLAYER: ControlPanelReducer = {
	isPlaying: false,
	currentTime: 0,
	volume: 1,
	repeat: false,
	duration: 0,
	currentTrack: '',
	playList: [],
	loading: false,
	loaded: false,
	loadFail: false,
	searchPlayList: '',
};

export default (controlPlayer: ControlPanelReducer = DEFAULT_CONTROL_PLAYER, action) => {
	const { type, payload } = action;

	const setTrack = (id, playList) => {
		// TODO: what do with a format?
		let format = playList.find(track => track.id === id);
		format = format && format.format[0] || 'mp3';
		player.src = `audio/${id}.${format}`;
		return { currentTrack: id };
	};

	const playTrack = () => {
		if (!controlPlayer.currentTrack) return controlPlayer;
		player.play();
		return { isPlaying: true };
	};

	switch (type) {
		case PAUSE + TRACK: {
			if (!controlPlayer.currentTrack) return controlPlayer;
			player.pause();
			return { ...controlPlayer, isPlaying: false };
		}

		case PLAY + TRACK: {
			if (!controlPlayer.currentTrack) return controlPlayer;
			player.play();
			return { ...controlPlayer, isPlaying: true };
		}

		case NEXT + TRACK: {
			const { playList, currentTrack, searchPlayList } = controlPlayer;
			if (!currentTrack) return controlPlayer;
			let index;
			const filterPlayList = filterSearcher(playList, searchPlayList);
			if (filterPlayList.length === 0) return { ...controlPlayer };
			const track = filterPlayList.find((track, i) =>
				((track.id === currentTrack) ? ((index = i), true) : false));
			if (!track)
				index = 0;
			else
				index = (index + 1) % filterPlayList.length;
			return {
				...controlPlayer,
				...setTrack(filterPlayList[index].id, filterPlayList),
				...playTrack(),
			};
		}

		case PREV + TRACK: {
			const { playList, currentTrack, searchPlayList } = controlPlayer;
			if (!currentTrack) return controlPlayer;
			let index;
			const filterPlayList = filterSearcher(playList, searchPlayList);
			if (filterPlayList.length === 0) return { ...controlPlayer };
			const track = filterPlayList.find((track, i) =>
				((track.id === currentTrack) ? ((index = i), true) : false));
			if (!track)
				index = 0;
			else
				index = (index - 1 < 0) ? filterPlayList.length - 1 : index - 1;
			return {
				...controlPlayer,
				...setTrack(filterPlayList[index].id, filterPlayList),
				...playTrack(),
			};
		}

		case REPEAT + TRACK: {
			const { repeat } = controlPlayer;
			player.loop = !repeat;
			return { ...controlPlayer, repeat: !repeat };
		}

		case SET + TRACK: {
			const { playList } = controlPlayer;
			const { id } = payload;
			return { ...controlPlayer, ...setTrack(id, playList) };
		}

		case SET + TIME + TRACK: {
			player.currentTime = payload.time;
			return { ...controlPlayer, timeTrack: payload.time };
		}

		case SET + VOLUME + TRACK: {
			const { volume } = payload;
			player.volume = volume;
			return { ...controlPlayer, volume };
		}

		case GIVE + TIME + TRACK: {
			const { currentTime, duration } = payload;
			return { ...controlPlayer, currentTime, duration };
		}

		case SET + SEARCH_PLAY_LIST: {
			return { ...controlPlayer, searchPlayList: payload.searchPlayList };
		}

		case LOAD_PLAY_LIST + SUCCES: {
			const { playList } = payload;
			return {
				...controlPlayer,
				playList,
				loaded: true,
				loading: false,
			};
		}

		case LOAD_PLAY_LIST + FAIL: {
			console.log('Load play list fail', payload.error);
			return { ...controlPlayer, loadFail: true, loading: false };
		}

		case LOAD_PLAY_LIST + START: {
			console.log('Load play list start');
			return {
				...controlPlayer,
				loading: true,
				loadFail: false,
				loaded: false,
			};
		}
		default:
			(action: empty);
			return controlPlayer;
	}
};
