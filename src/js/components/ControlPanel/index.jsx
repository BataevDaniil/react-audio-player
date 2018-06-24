import React from 'react';
import { connect } from 'react-redux';

import ControlPanelWrapper from './styledComponents/ControlPanelWrapper';
import PrevTrack from './styledComponents/PrevTrack';
import NextTrack from './styledComponents/NextTrack';
import PlayTrack from './styledComponents/PlayTrack';
import StopTrack from './styledComponents/StopTrack';
import TimeTrack from './styledComponents/TimeTrack';
import NameTrack from './styledComponents/NameTrack';
import RepeatTrack from './styledComponents/RepeatTrack';

import {
	pausePlayer,
	playPlayer,
	prevPlayer,
	nextPlayer,
	repeatPlayer,
} from '../../AC';

import { convertSecToNormalTime } from '../../helper';

class ControlPanel extends React.Component {
	colorButton = '#DB817F';
	colorButtonHover = '#ff5f5c';

	state = {
		timeInvers: false,
	}
	render() {
		const {
			isPlaying,
			currentTime,
			track,
			isRepeating,
			pausePlayer,
			playPlayer,
			prevPlayer,
			nextPlayer,
			repeatPlayer,
		} = this.props;
		const { timeInvers } = this.state;
		return (
			<ControlPanelWrapper>
				<PrevTrack
					color={this.colorButton}
					colorHover={this.colorButtonHover}
					heightTriangle={20}
					onClick={prevPlayer}
				/>
				{!isPlaying && <PlayTrack
					color={this.colorButton}
					colorHover={this.colorButtonHover}
					heightTriangle={20}
					onClick={playPlayer}
				/>}
				{isPlaying && <StopTrack
					color={this.colorButton}
					colorHover={this.colorButtonHover}
					size={20}
					onClick={pausePlayer}
				/>}
				<NextTrack
					color={this.colorButton}
					colorHover={this.colorButtonHover}
					heightTriangle={20}
					onClick={nextPlayer}
				/>
				<RepeatTrack
					color='#CADCED'
					colorHover='#add8ff'
					active={isRepeating}
					colorActive={this.colorButton}
					colorActiveHover={this.colorButtonHover}
					size={20}
					onClick={repeatPlayer}
				/>
				<TimeTrack
					children={convertSecToNormalTime(currentTime, track && track.duration || 0, timeInvers)}
					onClick={() => this.setState({ timeInvers: !timeInvers })}
				/>
				{<NameTrack children={track && `${track.artistName} - ${track.trackName}` || ''} />}

			</ControlPanelWrapper>
		);
	}
}

export default connect(({
	controlPlayer: {
		isPlaying, currentTime, playList, currentTrack, repeat
	},
}) => ({
	isPlaying,
	currentTime,
	track: playList.find(item => item.id === currentTrack),
	isRepeating: repeat,
}), {
	pausePlayer,
	playPlayer,
	prevPlayer,
	nextPlayer,
	repeatPlayer,
})(ControlPanel);
