// @flow

import { type Track } from './flow-typed';

export const convertSecToMinAndSec = (sec: number) => {
	let tmp = Math.floor(sec) % 60;
	tmp = (Math.floor(tmp / 10) === 0) ? `0${tmp}` : `${tmp}`;
	return `${Math.floor(sec / 60)}:${tmp}`;
};

export const convertSecToNormalTime = (
	currentTime: number,
	duration: number,
	invers: boolean,
) => (
	`${convertSecToMinAndSec(invers ? duration - currentTime : currentTime)} / ${convertSecToMinAndSec(duration)}`
);

export const filterSearcher = (arr: Array<Track>, search: string) => {
	if (search.length < 3) return arr;
	return arr.filter(({ trackName }) => trackName.indexOf(search) !== -1);
};
