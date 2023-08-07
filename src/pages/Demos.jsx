import React, { useEffect, useRef } from 'react';
import { Card, DashboardIcon, useAnimatedValue, ViewPager } from 'poon-ui';

const Demos = ({isVisible, animateIn, isTop}) => {
	const el = useRef();
	const zoom = useAnimatedValue(1);

	useEffect(() => {
		zoom.spring(isTop ? 1 : 0);
	}, [isTop]);

	useEffect(() => {
		return zoom.on(val => {
			el.current.style.transform = `scale(${2 - val})`;
			// el.current.style.opacity = val;
		});
	}, []);

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
				<ViewPager dots>
					<div className="springboard">
						<DashboardIcon title="Alerts" icon="notifications" href="/alert"/>
						<DashboardIcon title="Shades" icon="curtains_closed" href="/shades"/>
						<DashboardIcon title="Tabs" icon="tab" href="/tab"/>
						<DashboardIcon title="Photos" icon="photo" href="/photos"/>
					</div>
					<div className="springboard">
						<DashboardIcon title="Tabs" icon="tab" href="/tab"/>
						<DashboardIcon title="Tabs" icon="tab" href="/tab"/>
						<DashboardIcon title="Tabs" icon="tab" href="/tab"/>
						<DashboardIcon title="Tabs" icon="tab" href="/tab"/>
						<DashboardIcon title="Tabs" icon="tab" href="/tab"/>
						<DashboardIcon title="Tabs" icon="tab" href="/tab"/>
						<DashboardIcon title="Tabs" icon="tab" href="/tab"/>
					</div>
				</ViewPager>
				<div className="dock">
					<DashboardIcon title="Map" icon="place" href="/map"/>
					<DashboardIcon title="Files" icon="folder" href="/files"/>
					<DashboardIcon title="Files" icon="folder" href="/files"/>
					<DashboardIcon title="Clock" icon="watch_later" href="/clock"/>
				</div>
			</div>
		</Card>
	);
};

export default Demos;