import React from 'react';
import {interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {COLORS, FONT} from '../utils/colors';
import {fadeIn, slideUp} from '../utils/animations';
import {ParticleBg} from '../components/ParticleBg';

const KEYWORDS: Array<{
	label: string;
	x: number;
	y: number;
	startFrame: number;
	size: number;
	color: string;
	rotate: number;
}> = [
	{label: 'TVA', x: 12, y: 60, startFrame: 80, size: 52, color: COLORS.sageGreen, rotate: -6},
	{label: 'BFR', x: 62, y: 53, startFrame: 105, size: 44, color: COLORS.gold, rotate: 4},
	{label: 'FEC', x: 76, y: 68, startFrame: 128, size: 48, color: COLORS.sageGreenLight, rotate: -3},
	{label: 'Liasse', x: 8, y: 76, startFrame: 148, size: 38, color: COLORS.goldLight, rotate: 5},
	{label: 'Cycle Trésorerie', x: 28, y: 84, startFrame: 168, size: 30, color: COLORS.grayText, rotate: -2},
	{label: 'Immobilisations', x: 52, y: 79, startFrame: 188, size: 30, color: COLORS.sageGreen, rotate: 3},
	{label: 'Révision', x: 18, y: 69, startFrame: 208, size: 36, color: COLORS.gold, rotate: -5},
	{label: 'Capitaux propres', x: 58, y: 87, startFrame: 225, size: 26, color: COLORS.grayText, rotate: 2},
];

export const Scene2Problem: React.FC = () => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();

	const sceneOpacity = fadeIn(frame, 0, 20);

	const text1Opacity = fadeIn(frame, 5, 25);
	const text1Y = slideUp(frame, 5, 25, 30);
	const text2Opacity = fadeIn(frame, 45, 25);
	const text2Y = slideUp(frame, 45, 25, 30);

	const badgeSp = spring({
		fps,
		frame: Math.max(0, frame - 5),
		config: {damping: 120, stiffness: 400, mass: 0.5},
	});
	const badgeOpacity = fadeIn(frame, 0, 20);

	const subOpacity = interpolate(frame, [200, 240], [0, 1], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});

	const sepWidth = interpolate(frame, [50, 80], [0, 80], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});

	// Glow rouge qui pulse
	const redGlow = 0.06 + 0.02 * Math.sin((frame / 45) * Math.PI * 2);

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
			{/* Fond */}
			<div
				style={{
					position: 'absolute',
					inset: 0,
					background: 'radial-gradient(ellipse 100% 80% at 50% 20%, #0D0D0D 0%, #070A07 100%)',
				}}
			/>

			{/* Glow rouge pulsant */}
			<div
				style={{
					position: 'absolute',
					top: '10%',
					left: '50%',
					transform: 'translate(-50%, 0)',
					width: 700,
					height: 500,
					borderRadius: '50%',
					background: `radial-gradient(circle, rgba(180,40,40,${redGlow}) 0%, transparent 70%)`,
					pointerEvents: 'none',
				}}
			/>

			<ParticleBg frame={frame} />

			{/* Badge problème avec spring entrance */}
			<div
				style={{
					position: 'relative',
					zIndex: 2,
					marginBottom: 44,
					opacity: badgeOpacity,
					transform: `scale(${0.4 + 0.6 * badgeSp})`,
					backgroundColor: 'rgba(180, 40, 40, 0.15)',
					border: '1px solid rgba(180, 40, 40, 0.45)',
					borderRadius: 100,
					padding: '10px 28px',
					fontFamily: FONT,
					fontSize: 22,
					fontWeight: 600,
					color: '#E57373',
					letterSpacing: '2px',
					textTransform: 'uppercase' as const,
				}}
			>
				⚠ Le problème
			</div>

			{/* Texte principal */}
			<div
				style={{position: 'relative', zIndex: 2, textAlign: 'center', marginBottom: 32}}
			>
				<div
					style={{
						fontFamily: FONT,
						fontSize: 60,
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
						fontSize: 60,
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

			{/* Séparateur qui s'étend */}
			<div
				style={{
					position: 'relative',
					zIndex: 2,
					width: sepWidth,
					height: 2,
					backgroundColor: COLORS.gold,
					borderRadius: 1,
					marginBottom: 48,
				}}
			/>

			{/* Mots-clés — spring scale depuis 0 + flottaison + rotation */}
			{KEYWORDS.map((kw, i) => {
				const localFrame = Math.max(0, frame - kw.startFrame);
				const sp = spring({
					fps,
					frame: localFrame,
					config: {damping: 130, stiffness: 500, mass: 0.35},
				});
				const opacity = interpolate(localFrame, [0, 10], [0, 1], {
					extrapolateRight: 'clamp',
				});
				const floatY = Math.sin((frame / 55) * Math.PI * 2 + i * 1.3) * 5;

				return (
					<div
						key={kw.label}
						style={{
							position: 'absolute',
							left: `${kw.x}%`,
							top: `${kw.y}%`,
							opacity: opacity * 0.88,
							transform: `scale(${sp}) translateY(${floatY}px) rotate(${kw.rotate}deg)`,
							fontFamily: FONT,
							fontSize: kw.size,
							fontWeight: 700,
							color: kw.color,
							letterSpacing: '-0.5px',
							whiteSpace: 'nowrap' as const,
						}}
					>
						{kw.label}
					</div>
				);
			})}

			{/* Sous-texte */}
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
					opacity: subOpacity,
				}}
			>
				La formation académique ne suffit pas.
			</div>
		</div>
	);
};
