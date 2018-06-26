import React from 'react';

import { configure, shallow, render, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

import { PlayList } from '../index';
import ItemPlayList from '../ItemPlayList';

import PlayListWrapper from '../styledComponents/PlayListWrapper';
import MainPlayListWrapper from '../styledComponents/MainPlayListWrapper';
import SearcherInput from '../styledComponents/SearcherInput';
import Loading from '../styledComponents/Loading';
import LoadFail from '../styledComponents/LoadFail';
import EmptyPlayList from '../styledComponents/EmptyPlayList';

describe('Component PlayList', () => {
	test('If state loading then view Loading component', () => {
		const container = shallow(<PlayList
			loading={true}
		/>);
		expect(container.find(Loading).length).toBe(1);
		expect(container.find(LoadFail).length).toBe(0);
		expect(container.find(ItemPlayList).length).toBe(0)
		expect(container.find(EmptyPlayList).length).toBe(0);
	});

	test('If state loadFail then view LoadFail component', () => {
		const playList = [
			{ id:'1' },
			{ id:'2' },
		]
		const container = shallow(<PlayList
			loadFail={true}
			playList={playList}
		/>);
		expect(container.find(Loading).length).toBe(0);
		expect(container.find(LoadFail).length).toBe(1);
		expect(container.find(ItemPlayList).length).toBe(0)
		expect(container.find(EmptyPlayList).length).toBe(0);
	});

	test('If state loaded then view all tracks in playList', () => {
		const playList = [
			{ id:'1' },
			{ id:'2' },
		]
		const container = shallow(<PlayList
			loaded={true}
			playList={playList}
		/>);
		expect(container.find(Loading).length).toBe(0);
		expect(container.find(LoadFail).length).toBe(0);
		expect(container.find(ItemPlayList).length).toBe(playList.length);
		expect(container.find(EmptyPlayList).length).toBe(0);
	});

	test('If state loaded and playList no track then view EmptyPlayList component', () => {
		const playList = [
		]
		const container = shallow(<PlayList
			loaded={true}
			playList={playList}
		/>);
		expect(container.find(Loading).length).toBe(0);
		expect(container.find(LoadFail).length).toBe(0);
		expect(container.find(ItemPlayList).length).toBe(0);
		expect(container.find(EmptyPlayList).length).toBe(1);
	});

	test('Component SearcherInput change therefore call setSearchPlayList', () => {
		const setSearchPlayList = jest.fn();
		const container = shallow(<PlayList
			setSearchPlayList={setSearchPlayList}
		/>);
		const value = '12345';
		container.find(SearcherInput).simulate('change', {
			target: { value },
		})
		expect(setSearchPlayList.mock.calls[0][0]).toBe(value);
	});

	test('Click a track from playList differ of currentTrack then a track do play', () => {
		const playList = [
			{ id: '1' },
			{ id:'2' },
		];
		const setTrack = jest.fn();
		const playPlayer = jest.fn();
		const container = shallow(<PlayList
			loaded={true}
			setTrack={setTrack}
			playPlayer={playPlayer}
			currentTrack={playList[0].id}
			playList={playList}
		/>);
		container.find(ItemPlayList).at(1).simulate('click')
		expect(setTrack.mock.calls[0][0]).toBe(playList[1].id);
		expect(playPlayer.mock.calls.length).toBe(1);
	});

	test('Click a track from playList same currentTrack when track on pause then track do play', () => {
		const playList = [
			{ id: '1' },
		];
		const playPlayer = jest.fn();
		const pausePlayer = jest.fn();
		const container = shallow(<PlayList
			loaded={true}
			isPlaying={false}
			playPlayer={playPlayer}
			pausePlayer={pausePlayer}
			currentTrack={playList[0].id}
			playList={playList}
		/>);
		container.find(ItemPlayList).simulate('click')
		expect(playPlayer.mock.calls.length).toBe(1);
		expect(pausePlayer.mock.calls.length).toBe(0);
	});

	test('Click a track from playList same currentTrack when track play then track do pause', () => {
		const playList = [
			{ id: '1' },
		];
		const playPlayer = jest.fn();
		const pausePlayer = jest.fn();
		const container = shallow(<PlayList
			loaded={true}
			isPlaying={true}
			playPlayer={playPlayer}
			pausePlayer={pausePlayer}
			currentTrack={playList[0].id}
			playList={playList}
		/>);
		container.find(ItemPlayList).simulate('click')
		expect(playPlayer.mock.calls.length).toBe(0);
		expect(pausePlayer.mock.calls.length).toBe(1);
	});
})
