// @flow

export const convertSecToNormalTime = (
	currentTime: number,
	duration: number,
	invers: boolean,
) => {
	if (invers) {
		let tmp1 = Math.floor(duration - currentTime) % 60;
		tmp1 = (Math.floor(tmp1 / 10) === 0) ? `:0${tmp1}` : `:${tmp1}`;

		let tmp2 = Math.floor(duration) % 60;
		tmp2 = (Math.floor(tmp2 / 10) === 0) ? `:0${tmp2}` : `:${tmp2}`;

		return `${Math.floor((duration - currentTime) / 60) + tmp1} / ${
			 Math.floor(duration / 60)}${tmp2}`;
	}
	let tmp1: any = Math.floor(currentTime) % 60;
	tmp1 = (Math.floor(tmp1 / 10) === 0) ? `:0${tmp1}` : `:${tmp1}`;

	let tmp2: any = Math.floor(duration) % 60;
	tmp2 = (Math.floor(tmp2 / 10) === 0) ? `:0${tmp2}` : `:${tmp2}`;

	return `${Math.floor(currentTime / 60) + tmp1} / ${
			 Math.floor(duration / 60)}${tmp2}`;
};
