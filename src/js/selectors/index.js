import { createSelector } from 'reselect';
import { filterSearcher } from '../helper';

const filterSearcherGetter = state => state.controlPlayer.searchPlayList;
const playListGetter = state => state.controlPlayer.playList;

export const filtratedPlayListSelector = createSelector(playListGetter, filterSearcherGetter, filterSearcher);
