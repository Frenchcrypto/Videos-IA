import React from 'react';
import {interpolate, useCurrentFrame} from 'remotion';
import {COLORS, FONT} from '../utils/colors';
import {fadeIn, getTypedText, isCursorVisible} from '../utils/animations';

const LINE1 = 'Tu fais un DCG, DSCG';
const LINE2 = 'ou tu débutes en cabinet ?';
const CHARS_PER_FRAME = 2.5;

export const Scene1Hook: React.FC = () => {
	const frame = useCurrentFrame();

	const opacity = fadeIn(frame, 0, 15);

	// Zoom cinématographique: léger zoom in
	const scale = interpolate(frame, [0, 150], [1.06, 1.0], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});

	// Typing effect line 1 puis line 2
	const charsTotal = Math.floor(frame * CHARS_PER_FRAME);
	const line1 = LINE1.slice(0, Math.min(charsTotal, LINE1.length));
	const line2Chars = Math.max(0, charsTotal - LINE1.length);
	const line2 = LINE2.slice(0, Math.min(line2Chars, LINE2.length));

	const showLine2 = line1.length >= LINE1.length;
	const cursorOnLine2 = showLine2 && line2.length < LINE2.length;
	const cursorOnLine1 = !showLine2 && line1.length < LINE1.length;
	const cursorVisible = isCursorVisible(frame);

	// Sous-titre apparaît tard
	const subtitleOpacity = fadeIn(frame, 100, 30);

	return (
		<div
			style={{
				width: '100%',
				height: '100%',
				backgroundColor: COLORS.bg,
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				justifyContent: 'center',
				opacity,
				transform: `scale(${scale})`,
				padding: '80px 64px',
				boxSizing: 'border-box',
				position: 'relative',
				overflow: 'hidden',
			}}
		>
			{/* Gradient de fond */}
			<div
				style={{
					position: 'absolute',
					top: 0,
					left: 0,
					right: 0,
					bottom: 0,
					background:
						'radial-gradient(ellipse 80% 60% at 50% 50%, #1A2A1A 0%, #070A07 65%)',
				}}
			/>

			{/* Ligne dorée décorative en haut */}
			<div
				style={{
					position: 'absolute',
					top: 60,
					left: '50%',
					transform: 'translateX(-50%)',
					width: 60,
					height: 3,
					backgroundColor: COLORS.gold,
					borderRadius: 2,
					opacity: subtitleOpacity,
				}}
			/>

			{/* Texte principal */}
			<div
				style={{
					position: 'relative',
					zIndex: 1,
					textAlign: 'center',
				}}
			>
				{/* Ligne 1 */}
				<div
					style={{
						fontFamily: FONT,
						fontSize: 72,
						fontWeight: 800,
						color: COLORS.white,
						lineHeight: 1.15,
						letterSpacing: '-1.5px',
						marginBottom: 8,
						minHeight: 84,
					}}
				>
					{line1}
					{cursorOnLine1 && cursorVisible && (
						<span style={{color: COLORS.sageGreen, fontWeight: 300}}>|</span>
					)}
				</div>

				{/* Ligne 2 */}
				{showLine2 && (
					<div
						style={{
							fontFamily: FONT,
							fontSize: 72,
							fontWeight: 800,
							color: COLORS.sageGreenLight,
							lineHeight: 1.15,
							letterSpacing: '-1.5px',
							minHeight: 84,
						}}
					>
						{line2}
						{cursorOnLine2 && cursorVisible && (
							<span style={{color: COLORS.sageGreen, fontWeight: 300}}>|</span>
						)}
					</div>
				)}
			</div>

			{/* Sous-texte subtil */}
			<div
				style={{
					position: 'absolute',
					bottom: 100,
					left: 0,
					right: 0,
					textAlign: 'center',
					fontFamily: FONT,
					fontSize: 28,
					color: COLORS.grayText,
					letterSpacing: '3px',
					textTransform: 'uppercase',
					opacity: subtitleOpacity,
				}}
			>
				Formation professionnelle
			</div>

			{/* Ligne dorée décorative en bas */}
			<div
				style={{
					position: 'absolute',
					bottom: 60,
					left: '50%',
					transform: 'translateX(-50%)',
					width: 60,
					height: 3,
					backgroundColor: COLORS.gold,
					borderRadius: 2,
					opacity: subtitleOpacity,
				}}
			/>
		</div>
	);
};
