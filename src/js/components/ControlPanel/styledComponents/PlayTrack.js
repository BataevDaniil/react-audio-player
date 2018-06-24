import styled from 'styled-components';

import {
	sideMainTriangle,
	sideTransparentTriangle,
} from './helper';

const PlayTrack = styled.div`
	width: 0;
	height: 0;
	border-top: ${sideTransparentTriangle}px solid transparent;
	border-left: ${sideMainTriangle}px solid ${props => props.color};
	border-bottom: ${sideTransparentTriangle}px solid transparent;
	margin: 0 10px;
	&:hover {
		cursor: pointer;
		border-left-color: ${props => props.colorHover};
		&::before {
			background: ${props => props.colorHover};
		}
	}
`;

export default PlayTrack;
