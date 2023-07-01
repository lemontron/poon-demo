import React from 'react';
import { Card, Placeholder } from '../../../ui';
import RainbowShade from '../components/RainbowShade.jsx';

const ShadeDemoRainbow = ({isVisible}) => {
	return (
		<Card
			title="Rainbow Shade!"
			ShadeComponent={RainbowShade}
			isVisible={isVisible}
			children={<Placeholder title="Swipe back to see rainbows!"/>}
		/>
	);
};

export default ShadeDemoRainbow;