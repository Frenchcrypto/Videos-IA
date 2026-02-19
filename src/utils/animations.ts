import {interpolate} from 'remotion';

export const fadeIn = (
	frame: number,
	startFrame: number,
	duration = 20,
): number =>
	interpolate(frame, [startFrame, startFrame + duration], [0, 1], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});

export const fadeOut = (
	frame: number,
	startFrame: number,
	duration = 20,
): number =>
	interpolate(frame, [startFrame, startFrame + duration], [1, 0], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});

export const slideUp = (
	frame: number,
	startFrame: number,
	duration = 25,
	distance = 40,
): number =>
	interpolate(frame, [startFrame, startFrame + duration], [distance, 0], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});

export const slideLeft = (
	frame: number,
	startFrame: number,
	duration = 25,
	distance = 60,
): number =>
	interpolate(frame, [startFrame, startFrame + duration], [distance, 0], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});

export const getTypedText = (
	frame: number,
	text: string,
	startFrame = 0,
	speed = 2,
): string => {
	const elapsed = Math.max(0, frame - startFrame);
	const chars = Math.floor(elapsed * speed);
	return text.slice(0, Math.min(chars, text.length));
};

export const isCursorVisible = (frame: number): boolean =>
	Math.floor(frame / 15) % 2 === 0;
