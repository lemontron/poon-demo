import React from 'react';
import { Card, Placeholder } from '../../../ui';
import Fluid from '../components/Fluid/index.jsx';

const ShadeDemoFluid = ({isVisible}) => {
	return (
		<Card
			title="Shade Demo"
			ShadeComponent={Fluid}
			isVisible={isVisible}
			children={<Placeholder title="Swipe back to see fluid simulation!"/>}
		/>
	);
};

export default ShadeDemoFluid;