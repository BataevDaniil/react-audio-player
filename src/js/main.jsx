// @flow

import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import AudioPlayer from './components/AudioPlayer';

// import store from './store';

const domElem = document.querySelector('#audio-player');
console.log(AudioPlayer)
if (domElem)
	render(<AudioPlayer/>, domElem);
else
	console.log('html element not exists')
		// <Provider store={store}>
		// 	<AudioPlayer/>
		// </Provider>), domElem);
