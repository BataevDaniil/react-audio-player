import controlPlayerReducer from '../controlPlayer';

import player from '../../player';

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
} from '../../constantsActions'

jest.mock('../../player', () => ({
	play: jest.fn(),
	pause: jest.fn(),
	loop: false,
	volume: 1,
	cerrentTime: 0,
}));

describe('Reducer controlPlayer', () => {
	describe('Action PAUSE TRACK', () => {
		test('Player pause and state isPlayer become false.', () => {
			player.pause = jest.fn();
			const initialState = {
				isPlaying: true,
				currentTrack: 'track',
			}
			const action = {
				type: PAUSE + TRACK,
			}
			const newState = {
				isPlaying: false,
				currentTrack: 'track',
			}

			expect(controlPlayerReducer(initialState, action)).toEqual(newState)
			expect(player.pause.mock.calls.length).toBe(1)
		});

		test('Not currentTrack therefore nothing not change', () => {
			player.pause = jest.fn();
			const initialState = {
				isPlaying: true,
				currentTrack: '',
			};
			const action = {
				type: PAUSE + TRACK,
			};
			const newState = initialState;

			expect(controlPlayerReducer(initialState, action)).toEqual(newState)
			expect(player.pause.mock.calls.length).toBe(0)
		});
	});

	describe('Action PLAY TRACK', () => {
		test('Player begin play and state isPlayer become true.', () => {
			player.play = jest.fn();
			const initialState = {
				isPlaying: false,
				currentTrack: 'track',
			}
			const action = {
				type: PLAY + TRACK,
			}
			const newState = {
				isPlaying: true,
				currentTrack: 'track',
			}

			expect(controlPlayerReducer(initialState, action)).toEqual(newState)
			expect(player.play.mock.calls.length).toBe(1)
		});

		test('Not currentTrack therefore nothing not change', () => {
			player.play = jest.fn();
			const initialState = {
				isPlaying: false,
				currentTrack: '',
			}
			const action = {
				type: PLAY + TRACK,
			}
			const newState = initialState;

			expect(controlPlayerReducer(initialState, action)).toEqual(newState)
			expect(player.play.mock.calls.length).toBe(0)
		});
	})

	describe('Action NEXT TRACK', () => {
		test('Player play next track in a playList', () => {
			player.play = jest.fn();
			const playList = [
				{id: '1', format:['mp3']},
				{id: '2', format:['mp3']},
			]
			const initialState = {
				isPlaying: false,
				currentTrack: '1',
				searchPlayList: '',
				playList,
			}
			const action = {
				type: NEXT + TRACK,
			}
			const newState = {
				isPlaying: true,
				currentTrack: '2',
				searchPlayList: '',
				playList,
			}

			expect(controlPlayerReducer(initialState, action)).toEqual(newState)
			expect(player.play.mock.calls.length).toBe(1)
		});

		test('Player play next track in a playList. \
If current track last in play list then first play track in playList', () => {
			player.play = jest.fn();
			const playList = [
				{id: '1', format:['mp3']},
				{id: '2', format:['mp3']},
			]
			const initialState = {
				isPlaying: false,
				currentTrack: '2',
				searchPlayList: '',
				playList,
			}
			const action = {
				type: NEXT + TRACK,
			}
			const newState = {
				isPlaying: true,
				currentTrack: '1',
				searchPlayList: '',
				playList,
			}

			expect(controlPlayerReducer(initialState, action)).toEqual(newState)
			expect(player.play.mock.calls.length).toBe(1)
		});
	})

	describe('Action PREV TRACK', () => {
		test('Player play prev track in a playList', () => {
			player.play = jest.fn();
			const playList = [
				{id: '1', format:['mp3']},
				{id: '2', format:['mp3']},
			]
			const initialState = {
				isPlaying: false,
				currentTrack: '2',
				searchPlayList: '',
				playList,
			}
			const action = {
				type: PREV + TRACK,
			}
			const newState = {
				isPlaying: true,
				currentTrack: '1',
				searchPlayList: '',
				playList,
			}

			expect(controlPlayerReducer(initialState, action)).toEqual(newState)
			expect(player.play.mock.calls.length).toBe(1)
		});

		test('Player play prev track in a playList. \
If current track first in play list then last play track in playList', () => {
			player.play = jest.fn();
			const playList = [
				{id: '1', format:['mp3']},
				{id: '2', format:['mp3']},
			]
			const initialState = {
				isPlaying: false,
				currentTrack: '1',
				searchPlayList: '',
				playList,
			}
			const action = {
				type: NEXT + TRACK,
			}
			const newState = {
				isPlaying: true,
				currentTrack: '2',
				searchPlayList: '',
				playList,
			}

			expect(controlPlayerReducer(initialState, action)).toEqual(newState)
			expect(player.play.mock.calls.length).toBe(1)
		});
	})

	describe('Action REPEAT TRACK', () => {
		test('Player repeat current track', () => {
			player.loop = false;
			const initialState = {
				repeat: false,
			}
			const action = {
				type: REPEAT + TRACK,
			}
			const newState = {
				repeat: true,
			}

			expect(controlPlayerReducer(initialState, action)).toEqual(newState)
			expect(player.loop).toBe(true)
		});
	})

	describe('Action SET TRACK', () => {
		test('Set track on id', () => {
			const playList = [
				{id: '1', format:['mp3']},
				{id: '2', format:['mp3']},
			]
			const initialState = {
				currentTrack: '1',
				playList,
			}
			const action = {
				type: SET + TRACK,
				payload: { id: '2' },
			}
			const newState = {
				currentTrack: '2',
				playList,
			}
			expect(controlPlayerReducer(initialState, action)).toEqual(newState)
		});
	})

	describe('Action SET TIME TRACK', () => {
		test('Set tim track in sec', () => {
			player.currentTime = 0;
			const initialState = {
				timeTrack: 0,
			}
			const action = {
				type: SET + TIME + TRACK,
				payload: { time: 1 },
			}
			const newState = {
				timeTrack: 1,
			}
			expect(controlPlayerReducer(initialState, action)).toEqual(newState)
			expect(player.currentTime).toBe(1)
		});
	})

	describe('Action SET VOLUME TRACK', () => {
		test('Set volume track width value 0-1', () => {
			player.volume = 1;
			const initialState = {
				volume: 1,
			}
			const action = {
				type: SET + VOLUME + TRACK,
				payload: { volume: 0 },
			}
			const newState = {
				volume: 0,
			}
			expect(controlPlayerReducer(initialState, action)).toEqual(newState)
			expect(player.volume).toBe(0)
		});
	})
	describe('Action GIVE TIME TRACK', () => {
		test('Player give current time if it did change and duration current track', () => {
			const initialState = {
				currentTime: 0,
				duration: 0,
			}
			const action = {
				type: GIVE + TIME + TRACK,
				payload: {
					currentTime: 1,
					duration: 2,
				},
			}
			const newState = {
				currentTime: 1,
				duration: 2,
			}
			expect(controlPlayerReducer(initialState, action)).toEqual(newState)
		});
	})

	describe('Action SET SEARCH_PLAY_LIST', () => {
		test('String for search in playList', () => {
			const initialState = {
				searchPlayList: '',
			}
			const action = {
				type: SET + SEARCH_PLAY_LIST,
				payload: { searchPlayList: 'a', },
			}
			const newState = {
				searchPlayList: 'a',
			}
			expect(controlPlayerReducer(initialState, action)).toEqual(newState)
		});
	})

	describe('Action LOAD_PLAY_LIST SUCCES', () => {
		test('Load play list with ajax request succes', () => {
			const playList = [];
			const initialState = {
				playList,
				loaded: false,
				loading: false,
			}
			const action = {
				type: LOAD_PLAY_LIST + SUCCES,
				payload: { playList },
			}
			const newState = {
				playList,
				loaded: true,
				loading: false,
			}
			expect(controlPlayerReducer(initialState, action)).toEqual(newState)
		});
	})

	describe('Action LOAD_PLAY_LIST FAIL', () => {
		test('Load play list with ajax request fail', () => {
			const initialState = {
				loadFail: false,
				loading: true,
			}
			const action = {
				type: LOAD_PLAY_LIST + FAIL,
				payload: { error: 'error'},
			}
			const newState = {
				loadFail: true,
				loading: false,
			}
			expect(controlPlayerReducer(initialState, action)).toEqual(newState)
		});
	})

	describe('Action LOAD_PLAY_LIST START', () => {
		test('Load play list with ajax request start', () => {
			const initialState = {
				loaded: false,
				loadFail: false,
				loading: false,
			}
			const action = {
				type: LOAD_PLAY_LIST + START,
			}
			const newState = {
				loaded: false,
				loadFail: false,
				loading: true,
			}
			expect(controlPlayerReducer(initialState, action)).toEqual(newState)
		});
	})
});
