import React from 'react';
import { Card, DashboardIcon } from '../../../ui';

const Demos = ({isVisible}) => {
	return (
		<Card title="Crazy Demos" isVisible={isVisible}>
			<div className="springboard">
				<DashboardIcon title="File Browser" icon="folder" href="/files"/>
				<DashboardIcon title="Alerts" icon="notifications" href="/alert"/>
				<DashboardIcon title="Shades" icon="curtains_closed" href="/shades"/>
				<DashboardIcon title="Tabs" icon="tab" href="/tab"/>
			</div>
		</Card>
	);
};

export default Demos;