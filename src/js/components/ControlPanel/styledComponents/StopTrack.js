import styled from 'styled-components';
import { sideMainTriangle } from './helper';

const k = 0.8;

const StopTrack = styled.div`
	width: ${props => sideMainTriangle({ heightTriangle: props.size })}px;
	height: ${props => props.size}px;
	border-left: ${props => props.size * k / 3}px solid ${props => props.color};
	border-right: ${props => props.size * k / 3}px solid ${props => props.color};
	margin: 0 10px;
`;

export default StopTrack;
