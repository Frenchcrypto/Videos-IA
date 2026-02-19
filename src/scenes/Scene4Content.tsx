import React from 'react';
import {interpolate, useCurrentFrame} from 'remotion';
import {COLORS, FONT} from '../utils/colors';
import {fadeIn, slideUp} from '../utils/animations';

const CYCLES: Array<{label: string; icon: string; delay: number}> = [
	{label: 'Trésorerie', icon: '💰', delay: 40},
	{label: 'Stocks', icon: '📦', delay: 95},
	{label: 'Immobilisations', icon: '🏗️', delay: 150},
	{label: 'Capitaux propres', icon: '📊', delay: 205},
	{label: 'États fiscaux', icon: '📋', delay: 260},
	{label: 'Révision complète', icon: '✅', delay: 315},
];

const CHECKLIST: Array<{text: string; delay: number}> = [
	{text: 'Méthode pas à pas', delay: 420},
	{text: 'Logique de révision professionnelle', delay: 480},
	{text: 'Cas pratiques réalistes', delay: 540},
	{text: 'Mentalité cabinet', delay: 600},
];

const CycleItem: React.FC<{
	item: (typeof CYCLES)[0];
	frame: number;
	col: number;
}> = ({item, frame, col}) => {
	const opacity = interpolate(
		frame,
		[item.delay, item.delay + 25],
		[0, 1],
		{extrapolateLeft: 'clamp', extrapolateRight: 'clamp'},
	);
	const scale = interpolate(
		frame,
		[item.delay, item.delay + 25],
		[0.8, 1.0],
		{extrapolateLeft: 'clamp', extrapolateRight: 'clamp'},
	);

	return (
		<div
			style={{
				opacity,
				transform: `scale(${scale})`,
				backgroundColor: COLORS.bgCardLight,
				border: `1px solid ${COLORS.sageGreen}30`,
				borderRadius: 16,
				padding: '20px 20px',
				display: 'flex',
				alignItems: 'center',
				gap: 16,
			}}
		>
			<div style={{fontSize: 30}}>{item.icon}</div>
			<div
				style={{
					fontFamily: FONT,
					fontSize: 24,
					fontWeight: 700,
					color: COLORS.white,
					lineHeight: 1.2,
				}}
			>
				{item.label}
			</div>
		</div>
	);
};

const CheckItem: React.FC<{item: (typeof CHECKLIST)[0]; frame: number}> = ({
	item,
	frame,
}) => {
	const opacity = interpolate(
		frame,
		[item.delay, item.delay + 25],
		[0, 1],
		{extrapolateLeft: 'clamp', extrapolateRight: 'clamp'},
	);
	const translateX = interpolate(
		frame,
		[item.delay, item.delay + 25],
		[-30, 0],
		{extrapolateLeft: 'clamp', extrapolateRight: 'clamp'},
	);

	// Checkmark "dessine" progressivement
	const checkScale = interpolate(
		frame,
		[item.delay, item.delay + 15],
		[0, 1],
		{extrapolateLeft: 'clamp', extrapolateRight: 'clamp'},
	);

	return (
		<div
			style={{
				opacity,
				transform: `translateX(${translateX}px)`,
				display: 'flex',
				alignItems: 'center',
				gap: 20,
				marginBottom: 20,
			}}
		>
			{/* Checkmark circle */}
			<div
				style={{
					width: 44,
					height: 44,
					borderRadius: '50%',
					backgroundColor: COLORS.sageGreen,
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
					transform: `scale(${checkScale})`,
					flexShrink: 0,
				}}
			>
				<span
					style={{
						color: COLORS.white,
						fontSize: 22,
						fontWeight: 900,
					}}
				>
					✓
				</span>
			</div>
			<div
				style={{
					fontFamily: FONT,
					fontSize: 30,
					fontWeight: 700,
					color: COLORS.white,
				}}
			>
				{item.text}
			</div>
		</div>
	);
};

export const Scene4Content: React.FC = () => {
	const frame = useCurrentFrame();

	const sceneOpacity = fadeIn(frame, 0, 20);
	const titleOpacity = fadeIn(frame, 0, 25);
	const titleY = slideUp(frame, 0, 25, 20);

	const checklistTitleOpacity = fadeIn(frame, 380, 25);
	const checklistTitleY = slideUp(frame, 380, 25, 20);

	return (
		<div
			style={{
				width: '100%',
				height: '100%',
				backgroundColor: COLORS.bg,
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'flex-start',
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
						'linear-gradient(180deg, #070A07 0%, #0A0F0A 50%, #070A07 100%)',
				}}
			/>

			{/* Section cycles */}
			<div
				style={{
					position: 'relative',
					zIndex: 2,
					width: '100%',
					marginBottom: 36,
				}}
			>
				{/* Titre section */}
				<div
					style={{
						fontFamily: FONT,
						fontSize: 26,
						fontWeight: 700,
						color: COLORS.gold,
						letterSpacing: '3px',
						textTransform: 'uppercase',
						marginBottom: 24,
						opacity: titleOpacity,
						transform: `translateY(${titleY}px)`,
					}}
				>
					Applications pédagogiques par cycles
				</div>

				{/* Grille 2 colonnes */}
				<div
					style={{
						display: 'grid',
						gridTemplateColumns: '1fr 1fr',
						gap: 16,
						width: '100%',
					}}
				>
					{CYCLES.map((cycle, i) => (
						<CycleItem key={cycle.label} item={cycle} frame={frame} col={i % 2} />
					))}
				</div>
			</div>

			{/* Section checklist */}
			<div
				style={{
					position: 'relative',
					zIndex: 2,
					width: '100%',
				}}
			>
				{/* Titre checklist */}
				<div
					style={{
						fontFamily: FONT,
						fontSize: 26,
						fontWeight: 700,
						color: COLORS.gold,
						letterSpacing: '3px',
						textTransform: 'uppercase',
						marginBottom: 28,
						opacity: checklistTitleOpacity,
						transform: `translateY(${checklistTitleY}px)`,
					}}
				>
					Ce que tu vas maîtriser
				</div>

				{/* Items */}
				{CHECKLIST.map((item) => (
					<CheckItem key={item.text} item={item} frame={frame} />
				))}
			</div>
		</div>
	);
};
