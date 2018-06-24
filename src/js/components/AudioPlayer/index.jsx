import React from 'react';
import { connect } from 'react-redux';

import ControlPanel from '../ControlPanel';
import PlayList from '../PlayList';

import { loadPlayList } from '../../AC';

class AudioPlayer extends React.Component {
	componentDidMount() {
		this.props.loadPlayList('/playList.json');
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
