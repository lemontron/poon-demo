import React from 'react';
import { Card, Placeholder } from 'poon-ui';
import Fluid from '../components/Fluid';

const ShadeDemoFluid = ({isVisible, animateIn}) => (
	<Card
		title="Shade Demo"
		ShadeComponent={Fluid}
		isVisible={isVisible}
		animateIn={animateIn}
		children={<Placeholder title="Swipe back to see fluid simulation!"/>}
	/>
);

export default ShadeDemoFluid;