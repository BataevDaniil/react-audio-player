// @flow

export type Track = {
	id: string,
	trackName: string,
	artistName: string,
	duration: number,
	format: Array<string>,
}

export type ControlPanelReducer = {
	+isPlaying: boolean,
	+currentTime: number,
	+volume: number,
	+repeat: boolean,
	+duration: number,
	+currentTrack: string,
	+playList: Array<Track>,
	+loading: boolean,
	+loaded: boolean,
	+loadFail: boolean,
	+searchPlayList: string,
}

export type PlayListProps = {
	+isPlaying: boolean,
	+currentTrack: string,
	+playList: Array<Track>,
	+loading: boolean,
	+loaded: boolean,
	+loadFail: boolean,

	// action
	+playPlayer: () => void,
	+pausePlayer: () => void,
	+setTrack: () => void,
	+setSearchPlayList: () => void,
};

export type ItemPlayListProps = {
	+active: boolean,
	+trackName: string,
	+artistName: string,
	+duration: number,
	+onClick: () => void,
}

export type ControlPanelProps = {
	+isPlaying: boolean,
	+currentTime: number,
	+track: Track,
	+isRepeating: boolean,
	+volume: number,

	// action
	pausePlayer: () => void,
	playPlayer: () => void,
	prevPlayer: () => void,
	nextPlayer: () => void,
	repeatPlayer: () => void,
	setTimeTrack: () => void,
	setVolume: () => void,
}

export type ControlPanelState = {
	timeInvers: boolean,
}

export type RoadProps = {
	+classNameRoad: string,
	+classNameLine: string,
	+value: number,
	+min: number,
	+max: number,
	+onChange: (value: number) => void,
}

export type RoadState = {
	press: boolean,
	processLength: number,
}

export type AudioPlayerProps = {
	loadPlayList: () => void,
}
