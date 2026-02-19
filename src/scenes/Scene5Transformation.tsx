import React from 'react';
import {interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {COLORS, FONT} from '../utils/colors';
import {fadeIn, slideUp} from '../utils/animations';

const STEPS = [
	{label: 'Stagiaire', position: 0},
	{label: 'Assistant', position: 33.3},
	{label: 'Collaborateur', position: 66.6},
	{label: 'Réviseur', position: 100},
];

const PROGRESS_START = 320;
const PROGRESS_DURATION = 220;

const ProgressBar: React.FC<{frame: number; fps: number}> = ({frame, fps}) => {
	const progress = interpolate(
		frame,
		[PROGRESS_START, PROGRESS_START + PROGRESS_DURATION],
		[0, 100],
		{extrapolateLeft: 'clamp', extrapolateRight: 'clamp'},
	);

	return (
		<div style={{width: '100%', position: 'relative', paddingBottom: 60}}>
			{/* Track background */}
			<div
				style={{
					width: '100%',
					height: 8,
					backgroundColor: COLORS.bgCardLight,
					borderRadius: 4,
					position: 'relative',
					overflow: 'visible',
				}}
			>
				{/* Progress fill */}
				<div
					style={{
						position: 'absolute',
						top: 0,
						left: 0,
						height: '100%',
						width: `${progress}%`,
						background: `linear-gradient(90deg, ${COLORS.sageGreen}, ${COLORS.gold})`,
						borderRadius: 4,
						transition: 'none',
					}}
				/>

				{/* Nodes */}
				{STEPS.map((step, i) => {
					const isActive = progress >= step.position;
					const nodeScale = spring({
						fps,
						frame: Math.max(0, frame - PROGRESS_START - (step.position / 100) * PROGRESS_DURATION),
						config: {damping: 150},
					});

					return (
						<div
							key={step.label}
							style={{
								position: 'absolute',
								left: `${step.position}%`,
								top: '50%',
								transform: 'translate(-50%, -50%)',
								zIndex: 2,
							}}
						>
							{/* Node circle */}
							<div
								style={{
									width: 28,
									height: 28,
									borderRadius: '50%',
									backgroundColor: isActive
										? i === STEPS.length - 1
											? COLORS.gold
											: COLORS.sageGreen
										: COLORS.bgCardLight,
									border: `3px solid ${
										isActive
											? i === STEPS.length - 1
												? COLORS.gold
												: COLORS.sageGreen
											: COLORS.grayDark
									}`,
									transform: `scale(${isActive ? nodeScale : 1})`,
									display: 'flex',
									alignItems: 'center',
									justifyContent: 'center',
									boxShadow: isActive
										? `0 0 16px ${i === STEPS.length - 1 ? COLORS.gold : COLORS.sageGreen}80`
										: 'none',
								}}
							>
								{isActive && (
									<span
										style={{
											color: COLORS.white,
											fontSize: 12,
											fontWeight: 900,
										}}
									>
										✓
									</span>
								)}
							</div>

							{/* Label */}
							<div
								style={{
									position: 'absolute',
									top: 36,
									left: '50%',
									transform: 'translateX(-50%)',
									fontFamily: FONT,
									fontSize: i === STEPS.length - 1 ? 22 : 18,
									fontWeight: isActive ? 800 : 500,
									color: isActive
										? i === STEPS.length - 1
											? COLORS.gold
											: COLORS.sageGreenLight
										: COLORS.grayDark,
									whiteSpace: 'nowrap',
									textAlign: 'center',
								}}
							>
								{step.label}
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
};

export const Scene5Transformation: React.FC = () => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();

	const sceneOpacity = fadeIn(frame, 0, 20);

	// Title
	const titleOpacity = fadeIn(frame, 10, 25);
	const titleY = slideUp(frame, 10, 25, 20);

	// AVANT card
	const avantOpacity = fadeIn(frame, 40, 30);
	const avantX = interpolate(frame, [40, 70], [-60, 0], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});

	// Arrow
	const arrowOpacity = fadeIn(frame, 100, 20);
	const arrowScale = interpolate(frame, [100, 130], [0.5, 1], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});

	// APRÈS card
	const apresOpacity = fadeIn(frame, 140, 30);
	const apresX = interpolate(frame, [140, 180], [60, 0], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});

	// Progress section
	const progressTitleOpacity = fadeIn(frame, 280, 25);
	const progressSectionOpacity = fadeIn(frame, 300, 25);

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
				padding: '80px 56px',
				boxSizing: 'border-box',
				position: 'relative',
				overflow: 'hidden',
			}}
		>
			{/* Fond */}
			<div
				style={{
					position: 'absolute',
					top: 0,
					left: 0,
					right: 0,
					bottom: 0,
					background:
						'radial-gradient(ellipse 100% 60% at 50% 100%, #0F1A0F 0%, #070A07 60%)',
				}}
			/>

			{/* Titre */}
			<div
				style={{
					position: 'relative',
					zIndex: 2,
					fontFamily: FONT,
					fontSize: 26,
					fontWeight: 700,
					color: COLORS.gold,
					letterSpacing: '3px',
					textTransform: 'uppercase',
					marginBottom: 40,
					opacity: titleOpacity,
					transform: `translateY(${titleY}px)`,
					textAlign: 'center',
				}}
			>
				Ta transformation
			</div>

			{/* Avant / Après */}
			<div
				style={{
					position: 'relative',
					zIndex: 2,
					display: 'flex',
					gap: 0,
					alignItems: 'center',
					width: '100%',
					marginBottom: 60,
				}}
			>
				{/* AVANT */}
				<div
					style={{
						flex: 1,
						opacity: avantOpacity,
						transform: `translateX(${avantX}px)`,
						backgroundColor: 'rgba(180, 40, 40, 0.08)',
						border: '1px solid rgba(180, 40, 40, 0.3)',
						borderRadius: 20,
						padding: '40px 32px',
						textAlign: 'center',
					}}
				>
					<div
						style={{
							fontFamily: FONT,
							fontSize: 18,
							fontWeight: 700,
							color: '#E57373',
							letterSpacing: '3px',
							textTransform: 'uppercase',
							marginBottom: 16,
						}}
					>
						AVANT
					</div>
					<div
						style={{
							fontFamily: FONT,
							fontSize: 38,
							fontWeight: 800,
							color: COLORS.white,
							lineHeight: 1.2,
						}}
					>
						Perdu
					</div>
					<div
						style={{
							fontFamily: FONT,
							fontSize: 38,
							fontWeight: 800,
							color: '#E57373',
							lineHeight: 1.2,
							marginBottom: 16,
						}}
					>
						en cabinet
					</div>
					<div
						style={{
							fontFamily: FONT,
							fontSize: 22,
							color: COLORS.grayText,
							lineHeight: 1.4,
						}}
					>
						Incertain · Stressé · Sans méthode
					</div>
				</div>

				{/* Flèche */}
				<div
					style={{
						opacity: arrowOpacity,
						transform: `scale(${arrowScale})`,
						padding: '0 20px',
						flexShrink: 0,
					}}
				>
					<div
						style={{
							fontFamily: FONT,
							fontSize: 52,
							color: COLORS.gold,
							fontWeight: 300,
						}}
					>
						→
					</div>
				</div>

				{/* APRÈS */}
				<div
					style={{
						flex: 1,
						opacity: apresOpacity,
						transform: `translateX(${apresX}px)`,
						backgroundColor: 'rgba(125, 155, 118, 0.1)',
						border: `1px solid ${COLORS.sageGreen}50`,
						borderRadius: 20,
						padding: '40px 32px',
						textAlign: 'center',
						position: 'relative',
						overflow: 'hidden',
					}}
				>
					{/* Glow effet */}
					<div
						style={{
							position: 'absolute',
							top: 0,
							left: 0,
							right: 0,
							height: 3,
							background: `linear-gradient(90deg, ${COLORS.sageGreen}, ${COLORS.gold})`,
						}}
					/>
					<div
						style={{
							fontFamily: FONT,
							fontSize: 18,
							fontWeight: 700,
							color: COLORS.sageGreenLight,
							letterSpacing: '3px',
							textTransform: 'uppercase',
							marginBottom: 16,
						}}
					>
						APRÈS
					</div>
					<div
						style={{
							fontFamily: FONT,
							fontSize: 32,
							fontWeight: 900,
							color: COLORS.white,
							lineHeight: 1.3,
							marginBottom: 16,
						}}
					>
						Autonome.{'\n'}Structuré.{'\n'}
						<span style={{color: COLORS.sageGreenLight}}>Professionnel.</span>
					</div>
					<div
						style={{
							fontFamily: FONT,
							fontSize: 22,
							color: COLORS.grayText,
							lineHeight: 1.4,
						}}
					>
						Confiant · Méthodique · Reconnu
					</div>
				</div>
			</div>

			{/* Section progression */}
			<div
				style={{
					position: 'relative',
					zIndex: 2,
					width: '100%',
				}}
			>
				<div
					style={{
						fontFamily: FONT,
						fontSize: 24,
						fontWeight: 700,
						color: COLORS.gold,
						letterSpacing: '2px',
						textTransform: 'uppercase',
						marginBottom: 40,
						textAlign: 'center',
						opacity: progressTitleOpacity,
					}}
				>
					Ton parcours de progression
				</div>

				<div style={{opacity: progressSectionOpacity}}>
					<ProgressBar frame={frame} fps={fps} />
				</div>
			</div>
		</div>
	);
};
