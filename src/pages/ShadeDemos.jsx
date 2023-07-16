import React from 'react';
import { DashboardIcon, Reveal } from 'poon-ui';

const ShadeDemos = ({isVisible, animateIn}) => (
	<Reveal
		title="Shade Demo"
		isVisible={isVisible}
		animateIn={animateIn}
	>
		<div className="springboard">
			<DashboardIcon title="Fluid" href="/shades/fluid" icon="water"/>
			<DashboardIcon title="Rainbow" href="/shades/rainbow" icon="looks"/>
		</div>
	</Reveal>
);

export default ShadeDemos;