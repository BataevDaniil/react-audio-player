import React from 'react';
import { connect } from 'react-redux';

import ControlPanel from '../ControlPanel';
import PlayList from '../PlayList';

import { loadPlayList } from '../../AC';

import { type AudioPlayerProps } from '../../flow-typed';

class AudioPlayer extends React.Component<AudioPlayerProps> {
	componentDidMount() {
		this.props.loadPlayList('playList.json');
	}

	render() {
		return (
			<div>
				<ControlPanel />
				<PlayList />
			</div>
		);
	}
}

export default connect(null, { loadPlayList })(AudioPlayer);
