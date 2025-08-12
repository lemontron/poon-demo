import { useEffect, useState } from 'react';
import { Reveal, HStack } from 'poon-ui';

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
		>
			<HStack justify="center" align="center" frame>
				<span className="clock-time">{hr}</span>
				&nbsp;
				<span className="clock-ampm">{ampm}</span>
			</HStack>
		</Reveal>
	);
};

export default ClockDemo;