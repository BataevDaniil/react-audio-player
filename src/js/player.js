// @flow

import store from './store';

import { giveTimeTrack, nextPlayer } from './AC';

const player = new Audio();
player.ontimeupdate = () =>
	store.dispatch(giveTimeTrack(player.currentTime, player.duration));

player.onended = () =>
	!store.getState().controlPlayer.repeat && store.dispatch(nextPlayer());

// dev only
window.player = player;

export default player;
