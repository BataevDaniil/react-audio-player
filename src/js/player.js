import store from './store';

import { giveTimeTrack } from './AC';

const player = new Audio();
player.ontimeupdate = () =>
	store.dispatch(giveTimeTrack(player.currentTime, player.duration));

// dev only
window.player = player;

export default player;
