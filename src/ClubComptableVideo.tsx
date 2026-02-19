import React from 'react';
import {AbsoluteFill, Series} from 'remotion';
import {Scene1Hook} from './scenes/Scene1Hook';
import {Scene2Problem} from './scenes/Scene2Problem';
import {Scene3Solution} from './scenes/Scene3Solution';
import {Scene4Content} from './scenes/Scene4Content';
import {Scene5Transformation} from './scenes/Scene5Transformation';
import {Scene6CTA} from './scenes/Scene6CTA';

// Durées des scènes (frames @ 30fps)
// Scène 1 — Hook         :   0 →  150  (5s)
// Scène 2 — Problème     : 150 →  450  (10s)
// Scène 3 — Solution     : 450 →  900  (15s)
// Scène 4 — Contenu      : 900 → 1650  (25s)
// Scène 5 — Transformation:1650→ 2250  (20s)
// Scène 6 — CTA          :2250 → 2700  (15s)
// Total                  : 2700 frames = 90 secondes

export const ClubComptableVideo: React.FC = () => {
	return (
		<AbsoluteFill style={{backgroundColor: '#070A07'}}>
			<Series>
				{/* Scène 1 — Hook (5s) */}
				<Series.Sequence durationInFrames={150}>
					<Scene1Hook />
				</Series.Sequence>

				{/* Scène 2 — Problème (10s) */}
				<Series.Sequence durationInFrames={300}>
					<Scene2Problem />
				</Series.Sequence>

				{/* Scène 3 — Solution (15s) */}
				<Series.Sequence durationInFrames={450}>
					<Scene3Solution />
				</Series.Sequence>

				{/* Scène 4 — Contenu Premium (25s) */}
				<Series.Sequence durationInFrames={750}>
					<Scene4Content />
				</Series.Sequence>

				{/* Scène 5 — Transformation (20s) */}
				<Series.Sequence durationInFrames={600}>
					<Scene5Transformation />
				</Series.Sequence>

				{/* Scène 6 — CTA (15s) */}
				<Series.Sequence durationInFrames={450}>
					<Scene6CTA />
				</Series.Sequence>
			</Series>
		</AbsoluteFill>
	);
};
