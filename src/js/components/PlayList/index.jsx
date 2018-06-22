import React from 'react';
import { connect } from 'react-redux';

import PlayListWrapper from './styledComponents/PlayListWrapper';
import SearcherInput from './styledComponents/SearcherInput';

import ItemPlayList from './ItemPlayList';

import {
	playPlayer,
	setTrack,
} from '../../AC';


class PlayList extends React.Component {
	state ={
		search: '',
	}

	render() {
		const {
			setTrack,
			playPlayer,
			playList,
		} = this.props;
		const { search } = this.state;
		return (
			<div>
				<SearcherInput
					placeholder='Search'
					onChange={e => this.setState({ search: e.target.value })}
					value={search}
				/>
				<PlayListWrapper>
					{
						playList
							.filter(({ name }) => (search.length < 3 ? true : name.indexOf(search) !== -1))
							.map((track, index) => (
								<ItemPlayList
									number={index + 1}
									name={track.name}
									fullTime={track.time}
									onClick={() => { setTrack(track.name, track.name, index + 1); playPlayer(); }}
								/>
							))
					}
				</PlayListWrapper>
			</div>
		);
	}
}

export default connect(({ controlPlayer: { isPlaying }, playList }) => ({
	isPlaying,
	playList,
}), {
	playPlayer,
	setTrack,
})(PlayList);
