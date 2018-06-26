import React from 'react';

import { configure, shallow, render, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

import { ControlPanel } from '../index';

import PlayTrack from '../styledComponents/PlayTrack';
import StopTrack from '../styledComponents/StopTrack';
import NameTrack from '../styledComponents/NameTrack';

describe('Component ControlPanel', () => {
	test('View component PlayTrack if track not play', () => {
		const container = shallow(<ControlPanel
			isPlaying={false}
		/>);
		expect(container.find(PlayTrack).length).toBe(1);
		expect(container.find(StopTrack).length).toBe(0);
	});

	test('View component StopTrack if track play', () => {
		const container = shallow(<ControlPanel
			isPlaying={true}
		/>);
		expect(container.find(PlayTrack).length).toBe(0);
		expect(container.find(StopTrack).length).toBe(1);
	});

	test('View component Nametrack if track exists', () => {
		const track = {
			artistName: 'artistName',
			trackName: 'trackName',
		}
		const container = shallow(<ControlPanel
			track={track}
		/>);
		expect(container.find(NameTrack).children().text())
			.toBe(`${track.artistName} - ${track.trackName}`);
	});

	test('View component Nametrack empty if track not exists', () => {
		const container = shallow(<ControlPanel
			track={null}
		/>);
		expect(container.find(NameTrack).children().length).toBe(0);
	});
});
