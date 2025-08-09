import React, { useRef } from 'react';
import { Card, DashboardIcon, ViewPager } from 'poon-ui';

const Demos = ({isVisible, animateIn}) => {
	const el = useRef();

	return (
		<Card
			className="demos-card"
			isVisible={isVisible}
			animateIn={animateIn}
			HeaderComponent={null}
			hasScrollView={false}
			ShadeComponent={null}
			disableGestures
		>
			<div className="demos" ref={el}>
				<ViewPager showDots>
					<div className="springboard">
						<DashboardIcon title="Photos" icon="photo" href="/photos"/>
						<DashboardIcon title="Map" icon="place" href="/map"/>
						<DashboardIcon title="Files" icon="folder" href="/files"/>
						<DashboardIcon title="Alerts" icon="notifications" href="/alert"/>
						<DashboardIcon title="Clock" icon="watch_later" href="/clock"/>
						<DashboardIcon title="Shades" icon="curtains_closed" href="/shades"/>
						<DashboardIcon title="Tabs" icon="tab" href="/tab"/>
					</div>
					<div className="springboard">
						<DashboardIcon title="Tabs" icon="tab" href="/tab"/>
						<DashboardIcon title="Tabs" icon="tab" href="/tab"/>
						<DashboardIcon title="Tabs" icon="tab" href="/tab"/>
						<DashboardIcon title="Tabs" icon="tab" href="/tab"/>
						<DashboardIcon title="Tabs" icon="tab" href="/tab"/>
						<DashboardIcon title="Tabs" icon="tab" href="/tab"/>
						<DashboardIcon title="Tabs" icon="tab" href="/tab"/>
						<DashboardIcon title="Tabs" icon="tab" href="/tab"/>
					</div>
				</ViewPager>
			</div>
		</Card>
	);
};

export default Demos;