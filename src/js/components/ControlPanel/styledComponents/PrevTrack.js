import styled from 'styled-components';

import {
	sideMainTriangle,
	sideTransparentTriangle,
	widthLineTriangle,
} from './helper';

const PrevTrack = styled.div`
	width: 0;
	height: 0;
	border-top: ${sideTransparentTriangle}px solid transparent;
	border-right: ${sideMainTriangle}px solid ${props => props.color}
	border-bottom: ${sideTransparentTriangle}px solid transparent;
	position: relative;
	margin-left: ${widthLineTriangle}px;
	&::before {
		content: '';
		width: ${widthLineTriangle}px;
		height: ${props => sideTransparentTriangle(props) * 2}px;
		position: absolute;
		left: -${widthLineTriangle}px;
		top: -${sideTransparentTriangle}px;
		background: ${props => props.color};
	}
	&:hover {
		cursor: pointer;
		border-right-color: ${props => props.colorHover};
		&::before {
			background: ${props => props.colorHover};
		}
	}
`;

export default PrevTrack;
