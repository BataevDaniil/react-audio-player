import React from 'react';

import ItemPlayListWrapper from './styledComponents/ItemPlayLIstWrapper';

const ItemPlayList = ({
	number, name, fullTime, onClick,
}) => (
	<ItemPlayListWrapper onClick={onClick}>
		<span>{number}. {name}</span>
		<span>{fullTime}</span>
	</ItemPlayListWrapper>
);

export default ItemPlayList;
