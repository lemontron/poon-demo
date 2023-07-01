import React from 'react';
import { Card, DashboardIcon } from '@poon/ui';

const ShadeDemos = ({isVisible, animateIn}) => (
	<Card title="Shade Demo" isVisible={isVisible} animateIn={animateIn}>
		<div className="springboard">
			<DashboardIcon title="Fluid" href="/shades/fluid" icon="water"/>
			<DashboardIcon title="Rainbow" href="/shades/rainbow" icon="looks"/>
		</div>
	</Card>
);

export default ShadeDemos;