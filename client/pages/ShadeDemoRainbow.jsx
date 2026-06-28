import React from 'react';
import { Card, Placeholder } from 'meteor/poon';
import RainbowShade from '../components/RainbowShade';

const ShadeDemoRainbow = ({isVisible, animateIn}) => (
	<Card
		title="Rainbow Shade!"
		ShadeComponent={RainbowShade}
		isVisible={isVisible}
		animateIn={animateIn}
		children={<Placeholder title="Swipe back to see rainbows!"/>}
	/>
);

export default ShadeDemoRainbow;