import React from 'react';
import { Card, DashboardIcon } from '../../../ui';

const ShadeDemos = ({isVisible}) => {
	return (
		<Card title="Shade Demo" isVisible={isVisible}>
			<div className="springboard">
				<DashboardIcon title="Fluid" href="/shades/fluid" icon="water"/>
				<DashboardIcon title="Rainbow" href="/shades/rainbow" icon="looks"/>
			</div>
		</Card>
	);
};

export default ShadeDemos;