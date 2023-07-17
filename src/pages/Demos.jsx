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
			el.current.style.opacity = val;
		});

		// const buttons = [...el.current.querySelectorAll('.springboard .springboard-icon')];
		//
		// const angles = buttons.map(el => {
		// 	const centerX = window.innerWidth / 2,
		// 		centerY = window.innerHeight / 2;
		// 	const x = el.offsetLeft + (el.offsetWidth / 2),
		// 		y = el.offsetTop + (el.offsetHeight / 2);
		// 	const dx = Math.round(x - centerX),
		// 		dy = Math.round(y - centerY); // distance from center
		// 	const xf = dx / centerX,
		// 		yf = dy / centerY; // factors of distance from center
		// 	return {x: xf, y: yf};
		// });
		//
		// return zoom.on(val => {
		// 	const swoosh = (1 - val) * 40;
		// 	buttons.forEach((el, i) => {
		// 		const {x, y} = angles[i];
		// 		el.style.transform = `scale(${2 - val}) translate(${x * swoosh}px, ${y * swoosh}px)`;
		// 		el.style.opacity = val;
		// 	});
		// });
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
						<DashboardIcon title="Tabs" icon="tab" href="/tab"/>
					</div>
					<div className="springboard">
						<DashboardIcon title="Alerts" icon="notifications" href="/alert"/>
						<DashboardIcon title="Shades" icon="curtains_closed" href="/shades"/>
						<DashboardIcon title="Tabs" icon="tab" href="/tab"/>
						<DashboardIcon title="Tabs" icon="tab" href="/tab"/>
					</div>
				</ViewPager>
				<div className="dock">
					<DashboardIcon title="Files" icon="folder" href="/files"/>
					<DashboardIcon title="Files" icon="folder" href="/files"/>
					<DashboardIcon title="Map" icon="place" href="/map"/>
					<DashboardIcon title="Clock" icon="watch_later" href="/clock"/>
				</div>
			</div>
		</Card>
	);
};

// AnimatedValue.defaultAnimationDuration = 1000;

export default Demos;