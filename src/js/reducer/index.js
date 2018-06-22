// @flow

import { combineReducers } from 'redux';

import controlPlayer from './controlPlayer';
import playList from './playList';

export default combineReducers({
	controlPlayer,
	playList,
});
