import styled from 'styled-components';

const kTriangle = 2;
const kBorder = 5;

const RepeatTrack = styled.div`
	width: ${props => props.size}px;
	height: ${props => props.size}px;
	border-radius: 50%;
	border: ${props => props.size / kBorder}px solid ${props => ((props.active) ? props.colorActive : props.color)};
	margin-left: 10px;
	position: relative;
	&::after {
		content: '';
		width: 0;
		height: 0;
		position: absolute;
		left: ${props => -(props.size / kTriangle / 2 + props.size / kBorder / 2)}px;
		top: ${props => props.size / 2 - props.size / kTriangle / 2 - props.size / kBorder}px;
		border-top: ${props => props.size / kTriangle / 1.5}px solid transparent;
		border-right: ${props => props.size / kTriangle}px solid ${props => ((props.active) ? props.colorActive : props.color)};
		border-bottom: ${props => props.size / kTriangle / 1.5}px solid transparent;
		transform: rotateZ(-90deg);
	}
	&:hover {
		cursor: pointer;
		&::after {
			border-right-color: ${props => ((props.active) ? props.colorActiveHover : props.colorHover)};
		}
		border-color: ${props => ((props.active) ? props.colorActiveHover : props.colorHover)};
	}
`;

export default RepeatTrack;
