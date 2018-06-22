import React from 'react';
import { connect } from 'react-redux';

import ControlPanelWrapper from './styledComponents/ControlPanelWrapper';
import PrevTrack from './styledComponents/PrevTrack';
import NextTrack from './styledComponents/NextTrack';
import PlayTrack from './styledComponents/PlayTrack';
import StopTrack from './styledComponents/StopTrack';
import TimeTrack from './styledComponents/TimeTrack';
import NameTrack from './styledComponents/NameTrack';

import {
	pausePlayer,
	playPlayer,
	setTrack,
} from '../../AC';

import { convertSecToNormalTime } from '../../helper';

class ControlPanel extends React.Component {
	state = {
		timeInvers: false,
	}
	render() {
		console.log(this.props);
		const {
			isPlaying,
			currentTime,
			duration,
			pausePlayer,
			playPlayer,
			name,
			currentNumberTrack,
			playList,
		} = this.props;
		const { timeInvers } = this.state;
		return (
			<ControlPanelWrapper>
				<PrevTrack
					color='red'
					heightTriangle={20}
					onClick={this.handlerTrackClick(currentNumberTrack - 1)}
				/>
				{!isPlaying && <PlayTrack color='red' heightTriangle={20} onClick={playPlayer} />}
				{isPlaying && <StopTrack color='red' size={20} onClick={pausePlayer} />}
				<NextTrack
					color='red'
					heightTriangle={20}
					onClick={this.handlerTrackClick(currentNumberTrack + 1)}
				/>
				<TimeTrack
					children={convertSecToNormalTime(currentTime, duration || 0, timeInvers)}
					onClick={() => this.setState({ timeInvers: !timeInvers })}
				/>
				{currentNumberTrack !== -1 && <NameTrack children={`${currentNumberTrack}. ${name}`} />}

			</ControlPanelWrapper>
		);
	}
	handlerTrackClick = index => () => {
		const {
			playPlayer,
			playList,
			setTrack,
		} = this.props;

		const tmp = (index - 1 >= playList.length) ? 0 : (index - 1 < 0) ? playList.length - 1 : index - 1;
		setTrack(playList[tmp].name, playList[tmp].name, tmp + 1);
		playPlayer();
	}
}

export default connect(({
	controlPlayer: {
		isPlaying, currentTime, duration, name, currentNumberTrack,
	},
	playList,
}) => ({
	isPlaying,
	currentTime,
	duration,
	name,
	currentNumberTrack,
	playList,
}), {
	pausePlayer,
	playPlayer,
	setTrack,
})(ControlPanel);
