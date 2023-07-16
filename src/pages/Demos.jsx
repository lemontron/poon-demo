import React, { useEffect, useRef } from 'react';
import { Card, DashboardIcon, useAnimatedValue, ViewPager } from 'poon-ui';

const Demos = ({isVisible, animateIn, isTop}) => {
	const el = useRef();
	const zoom = useAnimatedValue(1);

	useEffect(() => {
		zoom.spring(isTop ? 1 : 0);
	}, [isTop]);

	useEffect(() => {
		const buttons = [...el.current.querySelectorAll('.springboard-icon')];

		const angles = buttons.map(el => {
			const centerX = window.innerWidth / 2, centerY = window.innerHeight / 2;

			const rect = el.getBoundingClientRect();
			const x = rect.left + (rect.width / 2), y = rect.top + (rect.height / 2);

			// distance from center
			const dx = Math.round(x - centerX), dy = Math.round(y - centerY);

			// factors of distance from center
			const xf = dx / centerX;
			const yf = dy / centerY;

			// console.log(el.querySelector('.springboard-icon-name').innerText, xf, yf);

			return {x: xf, y: yf};
		});

		return zoom.on(val => {
			const swoosh = (1 - val) * 40;
			buttons.forEach((el, i) => {
				const {x, y} = angles[i];
				el.style.transform = `translate(${x * swoosh}px, ${y * swoosh}px)`;
				el.style.opacity = val;
			});
		});
	}, []);

	return (
		<Card
			title="Crazy Demos"
			isVisible={isVisible}
			animateIn={animateIn}
			className="demos"
			HeaderComponent={null}
			hasScrollView={false}
			ShadeComponent={null}
			disableGestures
			ref={el}
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
};

export default Demos;