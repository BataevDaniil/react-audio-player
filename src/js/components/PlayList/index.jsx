import React from 'react';
import { connect } from 'react-redux';

import PlayListWrapper from './styledComponents/PlayListWrapper';
import MainPlayListWrapper from './styledComponents/MainPlayListWrapper';
import SearcherInput from './styledComponents/SearcherInput';
import Loading from './styledComponents/Loading';
import LoadFail from './styledComponents/LoadFail';
import EmptyPlayList from './styledComponents/EmptyPlayList';

import ItemPlayList from './ItemPlayList';

import { filtratedPlayListSelector } from '../../selectors';

import {
	playPlayer,
	pausePlayer,
	setTrack,
	setSearchPlayList,
} from '../../AC';

import { PlayListProps } from '../../flow-typed';

class PlayList extends React.Component<PlayListProps> {
	render() {
		const {
			playList,
			currentTrack,
			loading,
			loaded,
			loadFail,
			setSearchPlayList,
		} = this.props;
		return (
			<MainPlayListWrapper>
				<SearcherInput
					placeholder='Search'
					onChange={e => setSearchPlayList(e.target.value)}
				/>
				<PlayListWrapper>
					{loading && <Loading children='Loading...' />}
					{loadFail && <LoadFail children='Sorry. Playlist is fail load.' />}
					{
						loaded && (playList.length === 0 ?
							<EmptyPlayList children='Not tracks.' />
							: playList
								.map(track => (
									<ItemPlayList
										active={currentTrack === track.id}
										key={track.id}
										trackName={track.trackName}
										artistName={track.artistName}
										duration={track.duration}
										onClick={this.handlerClickTrack(track.id)}
									/>
								)))
					}
				</PlayListWrapper>
			</MainPlayListWrapper>
		);
	}

	handlerClickTrack = id => () => {
		const {
			setTrack, pausePlayer, playPlayer, isPlaying, currentTrack,
		} = this.props;

		if (currentTrack !== id) {
			setTrack(id);
			playPlayer();
			return;
		}

		if (isPlaying)
			pausePlayer();
		else
			playPlayer();
	}
}

export default connect(state => {
	const {
		isPlaying,
		currentTrack,
		loading,
		loaded,
		loadFail,

	} = state.controlPlayer;
	return {
		playList: filtratedPlayListSelector(state),
		isPlaying,
		currentTrack,
		loading,
		loaded,
		loadFail,
	};
}, {
	playPlayer,
	pausePlayer,
	setTrack,
	setSearchPlayList,
})(PlayList);
