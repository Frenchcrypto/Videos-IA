import React from 'react';
import {interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {COLORS, FONT, SKOOL_URL} from '../utils/colors';
import {fadeIn, fadeOut, slideUp} from '../utils/animations';

export const Scene6CTA: React.FC = () => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();

	const sceneOpacity = fadeIn(frame, 0, 25);
	const sceneFadeOut = fadeOut(frame, 410, 40);
	const finalOpacity = sceneOpacity * sceneFadeOut;

	// Logo spring entrance
	const logoSpring = spring({fps, frame: frame - 20, config: {damping: 120}});
	const logoOpacity = fadeIn(frame, 20, 30);

	// Lignes de texte
	const line1Opacity = fadeIn(frame, 80, 25);
	const line1Y = slideUp(frame, 80, 25, 25);

	const line2Opacity = fadeIn(frame, 130, 25);
	const line2Y = slideUp(frame, 130, 25, 25);

	// Bouton CTA
	const btnScale = spring({fps, frame: frame - 200, config: {damping: 100}});
	const btnOpacity = fadeIn(frame, 200, 30);

	// Glow pulsation sur le bouton
	const glowPulse =
		interpolate(
			Math.sin((frame / 45) * Math.PI * 2),
			[-1, 1],
			[0.6, 1.0],
			{extrapolateLeft: 'clamp', extrapolateRight: 'clamp'},
		);

	// URL en bas
	const urlOpacity = fadeIn(frame, 270, 25);

	// Éléments décoratifs
	const decorOpacity = fadeIn(frame, 50, 30);

	// Stars / sparkles
	const sparkle1 =
		0.5 + 0.5 * Math.sin((frame / 30) * Math.PI * 2);
	const sparkle2 =
		0.5 + 0.5 * Math.sin((frame / 25) * Math.PI * 2 + 1.5);

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
				opacity: finalOpacity,
				padding: '80px 64px',
				boxSizing: 'border-box',
				position: 'relative',
				overflow: 'hidden',
			}}
		>
			{/* Fond premium avec glow central */}
			<div
				style={{
					position: 'absolute',
					top: 0,
					left: 0,
					right: 0,
					bottom: 0,
					background: `
						radial-gradient(ellipse 70% 50% at 50% 40%, #0F1A0F 0%, #070A07 55%),
						radial-gradient(ellipse 40% 30% at 50% 40%, ${COLORS.gold}08 0%, transparent 70%)
					`,
				}}
			/>

			{/* Glow doré en arrière-plan */}
			<div
				style={{
					position: 'absolute',
					top: '30%',
					left: '50%',
					transform: 'translate(-50%, -50%)',
					width: 600,
					height: 600,
					borderRadius: '50%',
					background: `radial-gradient(circle, ${COLORS.gold}12 0%, transparent 70%)`,
					opacity: decorOpacity * glowPulse,
				}}
			/>

			{/* Sparkles décoratifs */}
			<div
				style={{
					position: 'absolute',
					top: '15%',
					left: '12%',
					fontFamily: FONT,
					fontSize: 32,
					color: COLORS.gold,
					opacity: decorOpacity * sparkle1,
				}}
			>
				✦
			</div>
			<div
				style={{
					position: 'absolute',
					top: '20%',
					right: '10%',
					fontFamily: FONT,
					fontSize: 24,
					color: COLORS.sageGreen,
					opacity: decorOpacity * sparkle2,
				}}
			>
				✦
			</div>
			<div
				style={{
					position: 'absolute',
					bottom: '25%',
					left: '8%',
					fontFamily: FONT,
					fontSize: 20,
					color: COLORS.gold,
					opacity: decorOpacity * sparkle2,
				}}
			>
				✦
			</div>
			<div
				style={{
					position: 'absolute',
					bottom: '20%',
					right: '12%',
					fontFamily: FONT,
					fontSize: 28,
					color: COLORS.sageGreen,
					opacity: decorOpacity * sparkle1,
				}}
			>
				✦
			</div>

			{/* Logo / Nom de marque */}
			<div
				style={{
					position: 'relative',
					zIndex: 2,
					opacity: logoOpacity,
					transform: `scale(${logoSpring})`,
					marginBottom: 20,
					textAlign: 'center',
				}}
			>
				{/* Badge premium */}
				<div
					style={{
						display: 'inline-block',
						backgroundColor: `${COLORS.gold}18`,
						border: `1px solid ${COLORS.gold}50`,
						borderRadius: 100,
						padding: '8px 28px',
						marginBottom: 20,
						fontFamily: FONT,
						fontSize: 18,
						color: COLORS.goldLight,
						letterSpacing: '4px',
						textTransform: 'uppercase',
						fontWeight: 600,
					}}
				>
					★ PREMIUM ★
				</div>

				{/* Nom principal */}
				<div
					style={{
						fontFamily: FONT,
						fontSize: 64,
						fontWeight: 900,
						color: COLORS.white,
						lineHeight: 1.1,
						letterSpacing: '-1.5px',
						marginBottom: 4,
					}}
				>
					Le Club Comptable
				</div>
				<div
					style={{
						fontFamily: FONT,
						fontSize: 64,
						fontWeight: 900,
						background: `linear-gradient(135deg, ${COLORS.gold}, ${COLORS.goldLight}, ${COLORS.gold})`,
						WebkitBackgroundClip: 'text',
						WebkitTextFillColor: 'transparent',
						lineHeight: 1.1,
						letterSpacing: '-1.5px',
					}}
				>
					Premium
				</div>
			</div>

			{/* Ligne dorée décorative */}
			<div
				style={{
					position: 'relative',
					zIndex: 2,
					width: 80,
					height: 2,
					background: `linear-gradient(90deg, transparent, ${COLORS.gold}, transparent)`,
					marginBottom: 48,
					opacity: decorOpacity,
				}}
			/>

			{/* Texte CTA principal */}
			<div
				style={{
					position: 'relative',
					zIndex: 2,
					textAlign: 'center',
					marginBottom: 48,
				}}
			>
				<div
					style={{
						fontFamily: FONT,
						fontSize: 54,
						fontWeight: 900,
						color: COLORS.white,
						lineHeight: 1.2,
						letterSpacing: '-0.5px',
						opacity: line1Opacity,
						transform: `translateY(${line1Y}px)`,
						marginBottom: 8,
					}}
				>
					Arrête d'être étudiant.
				</div>
				<div
					style={{
						fontFamily: FONT,
						fontSize: 38,
						fontWeight: 600,
						color: COLORS.sageGreenLight,
						lineHeight: 1.3,
						opacity: line2Opacity,
						transform: `translateY(${line2Y}px)`,
					}}
				>
					Commence à penser comme un professionnel.
				</div>
			</div>

			{/* Bouton CTA */}
			<div
				style={{
					position: 'relative',
					zIndex: 2,
					opacity: btnOpacity,
					transform: `scale(${btnScale})`,
					marginBottom: 40,
				}}
			>
				<div
					style={{
						backgroundColor: COLORS.sageGreen,
						borderRadius: 100,
						padding: '28px 56px',
						fontFamily: FONT,
						fontSize: 30,
						fontWeight: 800,
						color: COLORS.white,
						textAlign: 'center',
						letterSpacing: '-0.3px',
						boxShadow: `0 0 ${40 * glowPulse}px ${COLORS.sageGreen}60, 0 0 ${80 * glowPulse}px ${COLORS.sageGreen}30`,
						position: 'relative',
						overflow: 'hidden',
					}}
				>
					{/* Shimmer */}
					<div
						style={{
							position: 'absolute',
							top: 0,
							left: `${interpolate(frame % 90, [0, 90], [-100, 200], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})}%`,
							width: '40%',
							height: '100%',
							background:
								'linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent)',
							transform: 'skewX(-15deg)',
						}}
					/>
					Rejoins le Club Comptable Premium
				</div>
			</div>

			{/* URL */}
			<div
				style={{
					position: 'relative',
					zIndex: 2,
					opacity: urlOpacity,
					fontFamily: FONT,
					fontSize: 24,
					color: COLORS.grayText,
					letterSpacing: '0.5px',
					textAlign: 'center',
				}}
			>
				🔗{' '}
				<span
					style={{
						color: COLORS.gold,
						fontWeight: 700,
					}}
				>
					{SKOOL_URL}
				</span>
			</div>
		</div>
	);
};
