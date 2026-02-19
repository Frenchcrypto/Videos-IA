import React from 'react';
import {interpolate, useCurrentFrame} from 'remotion';
import {COLORS, FONT} from '../utils/colors';
import {fadeIn, slideUp} from '../utils/animations';

const KEYWORDS: Array<{
	label: string;
	x: number;
	y: number;
	startFrame: number;
	size: number;
	color: string;
}> = [
	{
		label: 'TVA',
		x: 15,
		y: 62,
		startFrame: 100,
		size: 44,
		color: COLORS.sageGreen,
	},
	{
		label: 'BFR',
		x: 65,
		y: 55,
		startFrame: 130,
		size: 36,
		color: COLORS.gold,
	},
	{
		label: 'FEC',
		x: 80,
		y: 70,
		startFrame: 155,
		size: 40,
		color: COLORS.sageGreenLight,
	},
	{
		label: 'Liasse',
		x: 10,
		y: 78,
		startFrame: 175,
		size: 34,
		color: COLORS.goldLight,
	},
	{
		label: 'Cycle Trésorerie',
		x: 30,
		y: 85,
		startFrame: 200,
		size: 28,
		color: COLORS.grayText,
	},
	{
		label: 'Immobilisations',
		x: 55,
		y: 80,
		startFrame: 225,
		size: 28,
		color: COLORS.sageGreen,
	},
	{
		label: 'Révision',
		x: 20,
		y: 70,
		startFrame: 250,
		size: 32,
		color: COLORS.gold,
	},
	{
		label: 'Capitaux propres',
		x: 60,
		y: 88,
		startFrame: 265,
		size: 26,
		color: COLORS.grayText,
	},
];

export const Scene2Problem: React.FC = () => {
	const frame = useCurrentFrame();

	const sceneOpacity = fadeIn(frame, 0, 20);

	// Texte 1
	const text1Opacity = fadeIn(frame, 5, 25);
	const text1Y = slideUp(frame, 5, 25, 30);

	// Texte 2
	const text2Opacity = fadeIn(frame, 45, 25);
	const text2Y = slideUp(frame, 45, 25, 30);

	// Stress badge
	const badgeOpacity = fadeIn(frame, 75, 20);

	return (
		<div
			style={{
				width: '100%',
				height: '100%',
				backgroundColor: COLORS.bg,
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				justifyContent: 'flex-start',
				opacity: sceneOpacity,
				padding: '120px 64px 80px',
				boxSizing: 'border-box',
				position: 'relative',
				overflow: 'hidden',
			}}
		>
			{/* Fond sombre avec vignette */}
			<div
				style={{
					position: 'absolute',
					top: 0,
					left: 0,
					right: 0,
					bottom: 0,
					background:
						'radial-gradient(ellipse 100% 80% at 50% 20%, #0D0D0D 0%, #070A07 100%)',
				}}
			/>

			{/* Badge rouge "Réalité" */}
			<div
				style={{
					position: 'relative',
					zIndex: 2,
					marginBottom: 48,
					opacity: badgeOpacity,
					backgroundColor: 'rgba(180, 40, 40, 0.15)',
					border: '1px solid rgba(180, 40, 40, 0.4)',
					borderRadius: 100,
					padding: '10px 28px',
					fontFamily: FONT,
					fontSize: 22,
					fontWeight: 600,
					color: '#E57373',
					letterSpacing: '2px',
					textTransform: 'uppercase',
				}}
			>
				⚠ Le problème
			</div>

			{/* Texte principal */}
			<div
				style={{
					position: 'relative',
					zIndex: 2,
					textAlign: 'center',
					marginBottom: 32,
				}}
			>
				<div
					style={{
						fontFamily: FONT,
						fontSize: 62,
						fontWeight: 800,
						color: COLORS.white,
						lineHeight: 1.2,
						letterSpacing: '-1px',
						opacity: text1Opacity,
						transform: `translateY(${text1Y}px)`,
						marginBottom: 8,
					}}
				>
					On ne t'apprend pas vraiment
				</div>
				<div
					style={{
						fontFamily: FONT,
						fontSize: 62,
						fontWeight: 800,
						color: COLORS.sageGreenLight,
						lineHeight: 1.2,
						letterSpacing: '-1px',
						opacity: text2Opacity,
						transform: `translateY(${text2Y}px)`,
					}}
				>
					à travailler comme en cabinet.
				</div>
			</div>

			{/* Ligne séparatrice */}
			<div
				style={{
					position: 'relative',
					zIndex: 2,
					width: 80,
					height: 2,
					backgroundColor: COLORS.gold,
					borderRadius: 1,
					marginBottom: 48,
					opacity: text2Opacity,
				}}
			/>

			{/* Mots-clés flottants */}
			{KEYWORDS.map((kw, i) => {
				const kwOpacity = interpolate(
					frame,
					[kw.startFrame, kw.startFrame + 20],
					[0, 1],
					{extrapolateLeft: 'clamp', extrapolateRight: 'clamp'},
				);
				const kwY = interpolate(
					frame,
					[kw.startFrame, kw.startFrame + 20],
					[20, 0],
					{extrapolateLeft: 'clamp', extrapolateRight: 'clamp'},
				);

				// Légère flottaison continue
				const floatOffset =
					Math.sin((frame / 60) * Math.PI * 2 + i * 1.2) * 4;

				return (
					<div
						key={kw.label}
						style={{
							position: 'absolute',
							left: `${kw.x}%`,
							top: `${kw.y}%`,
							opacity: kwOpacity * 0.85,
							transform: `translateY(${kwY + floatOffset}px)`,
							fontFamily: FONT,
							fontSize: kw.size,
							fontWeight: 700,
							color: kw.color,
							letterSpacing: '-0.5px',
							whiteSpace: 'nowrap',
						}}
					>
						{kw.label}
					</div>
				);
			})}

			{/* Sous-texte en bas */}
			<div
				style={{
					position: 'absolute',
					bottom: 80,
					left: 64,
					right: 64,
					textAlign: 'center',
					zIndex: 3,
					fontFamily: FONT,
					fontSize: 30,
					color: COLORS.grayText,
					lineHeight: 1.4,
					opacity: interpolate(frame, [220, 260], [0, 1], {
						extrapolateLeft: 'clamp',
						extrapolateRight: 'clamp',
					}),
				}}
			>
				La formation académique ne suffit pas.
			</div>
		</div>
	);
};
