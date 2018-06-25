// @flow

import React from 'react';

import { type RoadProps, type RoadState } from '../../../flow-typed';

class Road extends React.Component<RoadProps, RoadState> {
	element: ?HTMLDivElement;

	componentWillReceiveProps(nextProps: RoadProps) {
		if (nextProps.value !== this.props.value)
			this.setState({ processLength: this.fantasyMapRoad(nextProps.value) });
	}

	constructor(props: RoadProps) {
		super(props);
		document.addEventListener('mouseup', this.handlerDocumentMouseUp);
		document.addEventListener('mousemove', this.handlerDocumentMouseMove);
		this.state = {
			processLength: this.fantasyMapRoad(this.props.value),
			press: false,
		};
	}

	render() {
		const { processLength } = this.state;
		const { classNameRoad, classNameLine } = this.props;
		return (
			<div
				className={classNameRoad}
				ref={ref => (this.element = ref)}
				onMouseDown={this.handlerRoadMouseDown}
			>
				<div
					style={{ width: `${processLength}%` }}
					className={classNameLine}
				/>
			</div>
		);
	}

	handlerRoadMouseDown = event => {
		this.setState({ press: true });
		this.setPos(event);
	}

	handlerDocumentMouseUp = () => {
		this.setState({ press: false });
	}

	handlerDocumentMouseMove = event => {
		if (!this.state.press) return;
		this.setPos(event);
	}

	setPos = event => {
		if (!this.element) return;
		let processLength = event.pageX - this.element.offsetLeft;
		if (processLength < 0)
			processLength = 0;
		else if (processLength > this.element.clientWidth)
			processLength = this.element.clientWidth;
		processLength = this.pxMapPrcent(processLength);
		this.props.onChange(this.roadMapFantasy(processLength));
		this.setState({ processLength });
	}

	pxMapPrcent = (value: number) => {
		if (!this.element) return 0;
		return 100 / this.element.clientWidth * value;
	}

	roadMapFantasy = (value: number) => {
		const { min, max } = this.props;
		return (max - min) / 100 * value + min;
	}

	fantasyMapRoad = (value: number) => {
		const { min, max } = this.props;
		return 100 / (max - min) * (value - min);
	}
}

export default Road;
