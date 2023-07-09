import React from 'react';
import { Card, DashboardIcon, ViewPager } from '@poon/ui';

const Demos = ({isVisible, animateIn}) => (
	<Card
		title="Crazy Demos"
		isVisible={isVisible}
		animateIn={animateIn}
		className="demos"
		HeaderComponent={null}
		hasScrollView={false}
		ShadeComponent={null}
		disableGestures
	>
		<ViewPager dots>
			<div className="springboard">
				<DashboardIcon title="Alerts" icon="notifications" href="/alert"/>
				<DashboardIcon title="Shades" icon="curtains_closed" href="/shades"/>
				<DashboardIcon title="Tabs" icon="tab" href="/tab"/>
			</div>
			<div className="springboard">
				<DashboardIcon title="Alerts" icon="notifications" href="/alert"/>
				<DashboardIcon title="Shades" icon="curtains_closed" href="/shades"/>
				<DashboardIcon title="Tabs" icon="tab" href="/tab"/>
			</div>
			<div className="springboard">
				<DashboardIcon title="Alerts" icon="notifications" href="/alert"/>
				<DashboardIcon title="Shades" icon="curtains_closed" href="/shades"/>
				<DashboardIcon title="Tabs" icon="tab" href="/tab"/>
			</div>
		</ViewPager>
		<div className="dock">
			<DashboardIcon title="Files" icon="folder" href="/files"/>
			<DashboardIcon title="Map" icon="map" href="/map"/>
		</div>
	</Card>
);

export default Demos;