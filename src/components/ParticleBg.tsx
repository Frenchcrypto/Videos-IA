import React from 'react';
import {random} from 'remotion';
import {COLORS} from '../utils/colors';

const N = 32;

export const ParticleBg: React.FC<{frame: number}> = ({frame}) => (
	<div
		style={{
			position: 'absolute',
			inset: 0,
			overflow: 'hidden',
			pointerEvents: 'none',
		}}
	>
		{Array.from({length: N}).map((_, i) => {
			const x = random(`px-${i}`) * 100;
			const baseY = random(`py-${i}`) * 120 - 10;
			const size = 1.5 + random(`ps-${i}`) * 3.5;
			const speed = 0.1 + random(`psp-${i}`) * 0.22;
			const maxOp = 0.08 + random(`po-${i}`) * 0.28;
			const isGold = random(`pc-${i}`) > 0.5;

			const y = ((baseY - frame * speed) % 120 + 120) % 120 - 10;
			const edgeFade =
				y < 8 ? y / 8 : y > 95 ? (110 - y) / 15 : 1;

			return (
				<div
					key={i}
					style={{
						position: 'absolute',
						left: `${x}%`,
						top: `${y}%`,
						width: size,
						height: size,
						borderRadius: '50%',
						backgroundColor: isGold ? COLORS.gold : COLORS.sageGreen,
						opacity: maxOp * Math.max(0, edgeFade),
					}}
				/>
			);
		})}
	</div>
);
