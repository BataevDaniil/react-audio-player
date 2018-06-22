import styled from 'styled-components';

const k = 0.8;

const StopTrack = styled.div`
	width: ${props => props.size * k}px;
	height: ${props => props.size}px;
	border-left: ${props => props.size * k / 3}px solid ${props => props.color};
	border-right: ${props => props.size * k / 3}px solid ${props => props.color};
	margin: 0 20px
`;

export default StopTrack;
