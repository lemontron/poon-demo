import React, { useEffect, useRef } from 'react';
import { Card, DashboardIcon, ViewPager, showNotification } from 'poon-ui';

const Demos = ({isVisible, animateIn, isTop}) => {
	const el = useRef();
	// const zoom = useAnimatedValue(1);
	//
	// useEffect(() => {
	// 	zoom.spring(isTop ? 1 : 0);
	// }, [isTop]);
	//
	// // useEffect(() => {
	// // 	return zoom.on(val => {
	// // 		el.current.style.transform = `scale(${2 - val})`;
	// // 		// el.current.style.opacity = val;
	// // 	});
	// // }, []);

	useEffect(() => {
		setTimeout(() => {
			showNotification({
				'title': 'Welcome!',
				'body': 'This demo showcases capabilities of Poon UI.',
				'icon': 'star',
			});
		}, 500);
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