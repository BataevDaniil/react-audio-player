import styled from 'styled-components';

import {
	sideMainTriangle,
	sideTransparentTriangle,
	widthLineTriangle,
} from './helper';

const NextTrack = styled.div`
	width: 0;
	height: 0;
	border-top: ${sideTransparentTriangle}px solid transparent;
	border-left: ${sideMainTriangle}px solid ${props => props.color};
	border-bottom: ${sideTransparentTriangle}px solid transparent;
	position: relative;
	margin-right: ${widthLineTriangle}px;
	&::before {
		content: '';
		width: ${widthLineTriangle}px;
		height: ${props => sideTransparentTriangle(props) * 2}px;
		position: absolute;
		right: -${widthLineTriangle}px;
		top: -${sideTransparentTriangle}px;
		background: ${props => props.color};
	}
	&:hover {
		cursor: pointer;
		border-left-color: ${props => props.colorHover};
		&::before {
			background: ${props => props.colorHover};
		}
	}
`;

export default NextTrack;
