// @flow

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

import Road from './Road';

import {
	pausePlayer,
	playPlayer,
	prevPlayer,
	nextPlayer,
	repeatPlayer,
	setTimeTrack,
	setVolume,
} from '../../AC';

import { convertSecToNormalTime } from '../../helper';

import { type ControlPanelProps, type ControlPanelState } from '../../flow-typed';

export class ControlPanel extends React.Component<ControlPanelProps, ControlPanelState> {
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
			volume,
			pausePlayer,
			playPlayer,
			prevPlayer,
			nextPlayer,
			repeatPlayer,
			setTimeTrack,
			setVolume,
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
				<Road
					min={0}
					max={track && track.duration || 0}
					classNameRoad='road-playing'
					classNameLine='road-playing--line'
					value={currentTime}
					onChange={setTimeTrack}
				/>
				<Road
					min={0}
					max={1}
					classNameRoad='road-volume'
					classNameLine='road-volume--line'
					value={volume}
					onChange={setVolume}
				/>

			</ControlPanelWrapper>
		);
	}
}

export default connect(({
	controlPlayer: {
		isPlaying, currentTime, playList, currentTrack, repeat, volume,
	},
}) => ({
	isPlaying,
	currentTime,
	track: playList.find(item => item.id === currentTrack),
	isRepeating: repeat,
	volume,
}), {
	pausePlayer,
	playPlayer,
	prevPlayer,
	nextPlayer,
	repeatPlayer,
	setTimeTrack,
	setVolume,
})(ControlPanel);
