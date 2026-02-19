import React from 'react';
import {interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {COLORS, FONT} from '../utils/colors';
import {ParticleBg} from '../components/ParticleBg';

// Mots séparés pour l'animation mot par mot
const LINE1: Array<{text: string; accent: boolean}> = [
	{text: 'Tu', accent: false},
	{text: 'fais', accent: false},
	{text: 'un', accent: false},
	{text: 'DCG,', accent: false},
	{text: 'DSCG', accent: true},
];
const LINE2: Array<{text: string; accent: boolean}> = [
	{text: 'ou', accent: false},
	{text: 'tu', accent: false},
	{text: 'débutes', accent: true},
	{text: 'en', accent: false},
	{text: 'cabinet ?', accent: false},
];

const STAGGER = 8; // frames entre chaque mot

const WordPop: React.FC<{
	word: string;
	accent: boolean;
	startFrame: number;
	frame: number;
	fps: number;
}> = ({word, accent, startFrame, frame, fps}) => {
	const localFrame = Math.max(0, frame - startFrame);
	const sp = spring({
		fps,
		frame: localFrame,
		config: {damping: 160, stiffness: 600, mass: 0.35},
	});
	const opacity = interpolate(localFrame, [0, 6], [0, 1], {
		extrapolateRight: 'clamp',
	});

	return (
		<span
			style={{
				display: 'inline-block',
				opacity,
				transform: `scale(${0.4 + 0.6 * sp}) translateY(${(1 - sp) * 24}px)`,
				color: accent ? COLORS.sageGreenLight : COLORS.white,
				marginRight: '0.22em',
			}}
		>
			{word}
		</span>
	);
};

export const Scene1Hook: React.FC = () => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();

	// Fade global
	const sceneOpacity = interpolate(frame, [0, 18], [0, 1], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});

	// Gradient de fond qui se décale lentement
	const gradX = interpolate(frame, [0, 150], [50, 56], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});
	const gradY = interpolate(frame, [0, 150], [50, 44], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});

	// Scan line qui descend
	const scanY = interpolate(frame, [5, 145], [-2, 105], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});
	const scanOpacity = interpolate(frame, [0, 15, 130, 150], [0, 0.7, 0.7, 0], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});

	// Ligne décorative qui s'étend
	const lineWidth = interpolate(frame, [90, 125], [0, 100], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});

	// Sous-titre
	const subtitleOpacity = interpolate(frame, [110, 135], [0, 1], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});

	// Badge en haut qui apparaît
	const badgeOpacity = interpolate(frame, [20, 45], [0, 1], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});
	const badgeY = interpolate(frame, [20, 45], [-20, 0], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});

	return (
		<div
			style={{
				width: '100%',
				height: '100%',
				position: 'relative',
				overflow: 'hidden',
				opacity: sceneOpacity,
			}}
		>
			{/* Fond animé */}
			<div
				style={{
					position: 'absolute',
					inset: 0,
					background: `radial-gradient(ellipse 85% 65% at ${gradX}% ${gradY}%, #162416 0%, #070A07 62%)`,
				}}
			/>

			{/* Particules */}
			<ParticleBg frame={frame} />

			{/* Scan line */}
			<div
				style={{
					position: 'absolute',
					left: 0,
					right: 0,
					top: `${scanY}%`,
					height: 1.5,
					background: `linear-gradient(90deg, transparent 0%, ${COLORS.gold}90 30%, ${COLORS.sageGreen}90 70%, transparent 100%)`,
					opacity: scanOpacity,
				}}
			/>

			{/* Contenu principal */}
			<div
				style={{
					position: 'relative',
					zIndex: 2,
					width: '100%',
					height: '100%',
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					justifyContent: 'center',
					padding: '80px 64px',
					boxSizing: 'border-box',
				}}
			>
				{/* Badge en haut */}
				<div
					style={{
						opacity: badgeOpacity,
						transform: `translateY(${badgeY}px)`,
						backgroundColor: 'rgba(201, 168, 76, 0.12)',
						border: `1px solid ${COLORS.gold}60`,
						borderRadius: 100,
						padding: '8px 26px',
						marginBottom: 48,
						fontFamily: FONT,
						fontSize: 20,
						fontWeight: 600,
						color: COLORS.goldLight,
						letterSpacing: '3px',
						textTransform: 'uppercase' as const,
					}}
				>
					★ Pour toi
				</div>

				{/* Ligne 1 — mots */}
				<div
					style={{
						display: 'flex',
						flexWrap: 'wrap' as const,
						justifyContent: 'center',
						fontFamily: FONT,
						fontSize: 82,
						fontWeight: 900,
						lineHeight: 1.12,
						letterSpacing: '-2px',
						marginBottom: 8,
					}}
				>
					{LINE1.map((w, i) => (
						<WordPop
							key={i}
							word={w.text}
							accent={w.accent}
							startFrame={i * STAGGER}
							frame={frame}
							fps={fps}
						/>
					))}
				</div>

				{/* Ligne 2 — mots */}
				<div
					style={{
						display: 'flex',
						flexWrap: 'wrap' as const,
						justifyContent: 'center',
						fontFamily: FONT,
						fontSize: 82,
						fontWeight: 900,
						lineHeight: 1.12,
						letterSpacing: '-2px',
						marginBottom: 48,
					}}
				>
					{LINE2.map((w, i) => (
						<WordPop
							key={i}
							word={w.text}
							accent={w.accent}
							startFrame={(i + LINE1.length) * STAGGER}
							frame={frame}
							fps={fps}
						/>
					))}
				</div>

				{/* Ligne décorative qui s'étend */}
				<div
					style={{
						width: lineWidth,
						height: 3,
						background: `linear-gradient(90deg, ${COLORS.sageGreen}, ${COLORS.gold})`,
						borderRadius: 2,
						marginBottom: 36,
					}}
				/>

				{/* Sous-titre */}
				<div
					style={{
						fontFamily: FONT,
						fontSize: 26,
						color: COLORS.grayText,
						letterSpacing: '4px',
						textTransform: 'uppercase' as const,
						opacity: subtitleOpacity,
					}}
				>
					Formation professionnelle
				</div>
			</div>
		</div>
	);
};
