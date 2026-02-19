import React from 'react';
import {
	AbsoluteFill,
	interpolate,
	spring,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion';

export const MyComp: React.FC = () => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();

	const opacity = interpolate(frame, [0, 30], [0, 1], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});

	const scale = spring({
		fps,
		frame,
		config: {
			damping: 200,
		},
	});

	return (
		<AbsoluteFill
			style={{
				backgroundColor: '#1a1a2e',
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
			}}
		>
			<div
				style={{
					opacity,
					transform: `scale(${scale})`,
					color: 'white',
					fontSize: 80,
					fontFamily: 'sans-serif',
					fontWeight: 'bold',
					textAlign: 'center',
				}}
			>
				Videos-IA
				<div style={{fontSize: 32, marginTop: 20, opacity: 0.7}}>
					Propulsé par Remotion
				</div>
			</div>
		</AbsoluteFill>
	);
};
