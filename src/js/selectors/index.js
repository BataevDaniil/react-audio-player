// @flow

import { createSelector } from 'reselect';
import { filterSearcher } from '../helper';

import { type ControlPanelReducer } from '../flow-typed';

const filterSearcherGetter = (state: {controlPlayer: ControlPanelReducer}) =>
	state.controlPlayer.searchPlayList;
const playListGetter = (state: {controlPlayer: ControlPanelReducer}) =>
	state.controlPlayer.playList;

export const filtratedPlayListSelector = createSelector(
	playListGetter,
	filterSearcherGetter,
	filterSearcher,
);
