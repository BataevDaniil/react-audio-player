import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';

import mockPlayList from '../../../../mock/playList.json';
import {
	loadPlayList
} from '../index';

import {
	START,
	SUCCES,
	LOAD_PLAY_LIST,
} from '../../constantsActions';


describe('Actions', () => {
	test('fetch on /playList.json succes.', () => {
		const middlewares = [thunk];
		const mockStore = configureMockStore(middlewares);
		fetchMock.reset();
		fetchMock.restore();
		const store = mockStore({ playList: [] });
		fetchMock
			.getOnce('/playList.json', {
				body: mockPlayList,
				headers: { 'content-type': 'application/json' }
			});
		return store.dispatch(loadPlayList('/playList.json')).then(() => {
			expect(store.getActions()).toEqual([
				{
					type: LOAD_PLAY_LIST + START,
				},{
					type: LOAD_PLAY_LIST + SUCCES,
					payload: { playList: mockPlayList },
				},
			]);
		})
	});

});
