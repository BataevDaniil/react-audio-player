import React from 'react';
import { connect } from 'react-redux';

import ControlPanelWrapper from './styledComponents/ControlPanelWrapper';
import PrevTrack from './styledComponents/PrevTrack';
import NextTrack from './styledComponents/NextTrack';
import PlayTrack from './styledComponents/PlayTrack';
import StopTrack from './styledComponents/StopTrack';

import {
	pausePlayer,
	playPlayer,
} from '../../AC';

class ControlPanel extends React.Component {
	render() {
		console.log(this.props);
		const {
			isPlaying,
			pausePlayer,
			playPlayer,
		} = this.props;
		return (
			<ControlPanelWrapper>
				<PrevTrack color='red' heightTriangle={50} />
				<PlayTrack color='red' heightTriangle={50} onClick={playPlayer} />
				<StopTrack color='red' size={50} onClick={pausePlayer} />
				<NextTrack color='red' heightTriangle={50} />
			</ControlPanelWrapper>
		);
	}
}

export default connect(({ controlPlayer: { isPlaying } }) => ({
	isPlaying,
}), {
	pausePlayer,
	playPlayer,
})(ControlPanel);
