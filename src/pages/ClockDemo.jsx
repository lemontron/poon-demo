import React, { useEffect, useState } from 'react';
import { Reveal } from 'poon-ui';

const useTime = () => {
	const [time, setTime] = useState(new Date());
	useEffect(() => {
		const timer = setInterval(() => {
			setTime(new Date());
		}, 1000);
		return () => clearInterval(timer);
	}, []);
	return time;
};

const ClockDemo = ({isVisible, animateIn}) => {
	const time = useTime();
	const formattedTime = time.toLocaleString('en-US', {
		hour: 'numeric',
		minute: 'numeric',
		hour12: true,
	});

	const [hr, ampm] = formattedTime.split(' ');

	return (
		<Reveal
			isVisible={isVisible}
			animateIn={animateIn}
			className="clock-card"
			HeaderComponent={null}
		>
			<div className="clock-time">
				<span>{hr}</span>
				<span className="clock-ampm">{ampm}</span>
			</div>
		</Reveal>
	);
};

export default ClockDemo;