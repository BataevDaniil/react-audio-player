import styled from 'styled-components';

const ItemPlayWrapper = styled.li`
	width: 100%;
	padding: 10px 10px;
	background: ${({ active, colorActive }) => (active ? colorActive : '')};
	&:hover {
		cursor: pointer;
		background: ${({ active, colorActiveHover, colorHover }) => (active ? colorActiveHover: colorHover)};
	}
`;

export default ItemPlayWrapper;
