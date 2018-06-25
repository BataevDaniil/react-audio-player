// @flow

import React from 'react';

import { convertSecToMinAndSec } from '../../../helper';

import ItemPlayListWrapper from './styledComponents/ItemPlayLIstWrapper';
import DurationTimeTrack from './styledComponents/DurationTimeTrack';

import { type ItemPlayListProps } from '../../../flow-typed';

const ItemPlayList = ({
	active, trackName, artistName, duration, onClick,
}: ItemPlayListProps) => (
	<ItemPlayListWrapper
		onClick={onClick}
		active={active}
		colorActive='#DB817F'
		colorActiveHover='#ff5f5c'
		colorHover='#CADCED'
	>
		<span>{artistName} - {trackName}</span>
		<DurationTimeTrack children={convertSecToMinAndSec(duration)} />
	</ItemPlayListWrapper>
);

export default ItemPlayList;
