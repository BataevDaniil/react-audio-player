import React from 'react';

import ControlPanel from '../ControlPanel';

class AudioPlayer extends React.Component {
	render() {
		return (
			<div>
				<ControlPanel />
				<audio src='audio/Parallel_Park_-_01_-_Baboon_Boogie.mp3' controls />
			</div>
		);
	}
}

export default AudioPlayer;
