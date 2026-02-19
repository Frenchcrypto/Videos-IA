import React from 'react';
import {AbsoluteFill} from 'remotion';
import {TransitionSeries, linearTiming} from '@remotion/transitions';
import {fade} from '@remotion/transitions/fade';
import {Scene1Hook} from './scenes/Scene1Hook';
import {Scene2Problem} from './scenes/Scene2Problem';
import {Scene3Solution} from './scenes/Scene3Solution';
import {Scene4Content} from './scenes/Scene4Content';
import {Scene5Transformation} from './scenes/Scene5Transformation';
import {Scene6CTA} from './scenes/Scene6CTA';

// Durées des scènes (frames @ 30fps) — +20 frames par scène pour absorber les transitions
// Chaque transition = 20 frames de fondu croisé entre deux scènes
// Total : 2800 frames - 5 × 20 = 2700 frames = 90 secondes
//
// Scène 1 — Hook          : 170 frames  (5.7s)
// Scène 2 — Problème      : 320 frames (10.7s)
// Scène 3 — Solution      : 470 frames (15.7s)
// Scène 4 — Contenu       : 770 frames (25.7s)
// Scène 5 — Transformation: 620 frames (20.7s)
// Scène 6 — CTA           : 450 frames (15.0s)

const TRANSITION = linearTiming({durationInFrames: 20});

export const ClubComptableVideo: React.FC = () => {
	return (
		<AbsoluteFill style={{backgroundColor: '#070A07'}}>
			<TransitionSeries>
				{/* Scène 1 — Hook */}
				<TransitionSeries.Sequence durationInFrames={170}>
					<Scene1Hook />
				</TransitionSeries.Sequence>

				<TransitionSeries.Transition timing={TRANSITION} presentation={fade()} />

				{/* Scène 2 — Problème */}
				<TransitionSeries.Sequence durationInFrames={320}>
					<Scene2Problem />
				</TransitionSeries.Sequence>

				<TransitionSeries.Transition timing={TRANSITION} presentation={fade()} />

				{/* Scène 3 — Solution */}
				<TransitionSeries.Sequence durationInFrames={470}>
					<Scene3Solution />
				</TransitionSeries.Sequence>

				<TransitionSeries.Transition timing={TRANSITION} presentation={fade()} />

				{/* Scène 4 — Contenu Premium */}
				<TransitionSeries.Sequence durationInFrames={770}>
					<Scene4Content />
				</TransitionSeries.Sequence>

				<TransitionSeries.Transition timing={TRANSITION} presentation={fade()} />

				{/* Scène 5 — Transformation */}
				<TransitionSeries.Sequence durationInFrames={620}>
					<Scene5Transformation />
				</TransitionSeries.Sequence>

				<TransitionSeries.Transition timing={TRANSITION} presentation={fade()} />

				{/* Scène 6 — CTA */}
				<TransitionSeries.Sequence durationInFrames={450}>
					<Scene6CTA />
				</TransitionSeries.Sequence>
			</TransitionSeries>
		</AbsoluteFill>
	);
};
