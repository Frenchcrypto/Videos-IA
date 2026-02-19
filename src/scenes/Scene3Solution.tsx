import React from 'react';
import {interpolate, useCurrentFrame} from 'remotion';
import {COLORS, FONT} from '../utils/colors';
import {fadeIn, slideUp} from '../utils/animations';

const COURSES = [
	{
		title: 'Devenir Assistant Comptable',
		description: 'Maîtrise les bases du cabinet, les logiciels, les cycles',
		icon: '📘',
		level: 'Niveau débutant',
		modules: 8,
		delay: 180,
	},
	{
		title: 'Devenir Collaborateur\nRéviseur Comptable',
		description:
			'Révision complète, liasse fiscale, autonomie professionnelle',
		icon: '🏆',
		level: 'Niveau avancé',
		modules: 14,
		delay: 240,
	},
];

const CourseCard: React.FC<{
	course: (typeof COURSES)[0];
	frame: number;
	index: number;
}> = ({course, frame, index}) => {
	const opacity = interpolate(
		frame,
		[course.delay, course.delay + 30],
		[0, 1],
		{extrapolateLeft: 'clamp', extrapolateRight: 'clamp'},
	);
	const translateX = interpolate(
		frame,
		[course.delay, course.delay + 30],
		[index === 0 ? -50 : 50, 0],
		{extrapolateLeft: 'clamp', extrapolateRight: 'clamp'},
	);

	// Hover effect subtil
	const hoverScale = interpolate(
		frame,
		[course.delay + 30, course.delay + 60],
		[0.96, 1.0],
		{extrapolateLeft: 'clamp', extrapolateRight: 'clamp'},
	);

	return (
		<div
			style={{
				opacity,
				transform: `translateX(${translateX}px) scale(${hoverScale})`,
				backgroundColor: COLORS.bgCardLight,
				border: `1px solid ${index === 1 ? COLORS.gold + '60' : COLORS.sageGreen + '40'}`,
				borderRadius: 20,
				padding: '36px 32px',
				marginBottom: 24,
				position: 'relative',
				overflow: 'hidden',
			}}
		>
			{/* Accent top border */}
			<div
				style={{
					position: 'absolute',
					top: 0,
					left: 0,
					right: 0,
					height: 3,
					background:
						index === 1
							? `linear-gradient(90deg, ${COLORS.gold}, ${COLORS.goldLight})`
							: `linear-gradient(90deg, ${COLORS.sageGreen}, ${COLORS.sageGreenLight})`,
				}}
			/>

			{/* Header */}
			<div
				style={{
					display: 'flex',
					alignItems: 'flex-start',
					marginBottom: 12,
				}}
			>
				<div
					style={{
						fontSize: 40,
						marginRight: 16,
						marginTop: 4,
					}}
				>
					{course.icon}
				</div>
				<div>
					<div
						style={{
							fontFamily: FONT,
							fontSize: 30,
							fontWeight: 800,
							color: COLORS.white,
							lineHeight: 1.2,
							whiteSpace: 'pre-line',
							marginBottom: 4,
						}}
					>
						{course.title}
					</div>
					<div
						style={{
							fontFamily: FONT,
							fontSize: 20,
							color:
								index === 1 ? COLORS.goldLight : COLORS.sageGreenLight,
							fontWeight: 600,
						}}
					>
						{course.level}
					</div>
				</div>
			</div>

			{/* Description */}
			<div
				style={{
					fontFamily: FONT,
					fontSize: 22,
					color: COLORS.grayText,
					lineHeight: 1.5,
					marginBottom: 16,
				}}
			>
				{course.description}
			</div>

			{/* Modules count */}
			<div
				style={{
					display: 'flex',
					alignItems: 'center',
					gap: 8,
				}}
			>
				<div
					style={{
						width: 8,
						height: 8,
						borderRadius: '50%',
						backgroundColor:
							index === 1 ? COLORS.gold : COLORS.sageGreen,
					}}
				/>
				<div
					style={{
						fontFamily: FONT,
						fontSize: 18,
						color: COLORS.grayText,
						fontWeight: 600,
					}}
				>
					{course.modules} modules de formation
				</div>
			</div>
		</div>
	);
};

export const Scene3Solution: React.FC = () => {
	const frame = useCurrentFrame();

	const sceneOpacity = fadeIn(frame, 0, 20);

	// Badge
	const badgeOpacity = fadeIn(frame, 10, 20);

	// Texte principal
	const title1Opacity = fadeIn(frame, 30, 25);
	const title1Y = slideUp(frame, 30, 25, 25);

	const title2Opacity = fadeIn(frame, 70, 25);
	const title2Y = slideUp(frame, 70, 25, 25);

	// Skool badge
	const skoolOpacity = fadeIn(frame, 120, 20);

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
			{/* Fond avec accent vert subtil */}
			<div
				style={{
					position: 'absolute',
					top: 0,
					left: 0,
					right: 0,
					bottom: 0,
					background:
						'radial-gradient(ellipse 80% 50% at 50% 0%, #0F1F0F 0%, #070A07 60%)',
				}}
			/>

			{/* Skool badge */}
			<div
				style={{
					position: 'relative',
					zIndex: 2,
					opacity: skoolOpacity,
					backgroundColor: 'rgba(201, 168, 76, 0.1)',
					border: `1px solid ${COLORS.gold}50`,
					borderRadius: 100,
					padding: '8px 24px',
					marginBottom: 24,
					fontFamily: FONT,
					fontSize: 20,
					color: COLORS.goldLight,
					fontWeight: 600,
					letterSpacing: '1px',
				}}
			>
				✦ Disponible sur Skool ✦
			</div>

			{/* Badge solution */}
			<div
				style={{
					position: 'relative',
					zIndex: 2,
					opacity: badgeOpacity,
					backgroundColor: 'rgba(125, 155, 118, 0.15)',
					border: `1px solid ${COLORS.sageGreen}50`,
					borderRadius: 100,
					padding: '10px 28px',
					marginBottom: 32,
					fontFamily: FONT,
					fontSize: 22,
					fontWeight: 700,
					color: COLORS.sageGreenLight,
					letterSpacing: '2px',
					textTransform: 'uppercase',
				}}
			>
				✓ La solution
			</div>

			{/* Titre */}
			<div
				style={{
					position: 'relative',
					zIndex: 2,
					textAlign: 'center',
					marginBottom: 12,
				}}
			>
				<div
					style={{
						fontFamily: FONT,
						fontSize: 56,
						fontWeight: 900,
						color: COLORS.white,
						letterSpacing: '-1px',
						lineHeight: 1.1,
						opacity: title1Opacity,
						transform: `translateY(${title1Y}px)`,
						marginBottom: 4,
					}}
				>
					Le Club Comptable Premium
				</div>
				<div
					style={{
						fontFamily: FONT,
						fontSize: 32,
						fontWeight: 500,
						color: COLORS.grayText,
						lineHeight: 1.4,
						opacity: title2Opacity,
						transform: `translateY(${title2Y}px)`,
					}}
				>
					La méthode concrète pour devenir{' '}
					<span style={{color: COLORS.sageGreenLight, fontWeight: 700}}>
						autonome en cabinet.
					</span>
				</div>
			</div>

			{/* Séparateur */}
			<div
				style={{
					position: 'relative',
					zIndex: 2,
					width: 60,
					height: 2,
					background: `linear-gradient(90deg, ${COLORS.gold}, ${COLORS.sageGreen})`,
					borderRadius: 1,
					marginBottom: 40,
					opacity: title2Opacity,
				}}
			/>

			{/* Cartes de cours */}
			<div
				style={{
					position: 'relative',
					zIndex: 2,
					width: '100%',
				}}
			>
				{COURSES.map((course, i) => (
					<CourseCard key={i} course={course} frame={frame} index={i} />
				))}
			</div>
		</div>
	);
};
