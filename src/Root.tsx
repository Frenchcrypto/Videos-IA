import React from 'react';
import {Composition} from 'remotion';
import {MyComp} from './MyComp';
import {ClubComptableVideo} from './ClubComptableVideo';

export const Root: React.FC = () => {
	return (
		<>
			{/* Vidéo marketing — Le Club Comptable Premium */}
			{/* Format : 9:16 (TikTok / Reels / Shorts) — 90 secondes */}
			<Composition
				id="ClubComptablePremium"
				component={ClubComptableVideo}
				durationInFrames={2700}
				width={1080}
				height={1920}
				fps={30}
				defaultProps={{}}
			/>

			{/* Composition de démo par défaut */}
			<Composition
				id="MyComp"
				component={MyComp}
				durationInFrames={120}
				width={1920}
				height={1080}
				fps={30}
				defaultProps={{}}
			/>
		</>
	);
};
