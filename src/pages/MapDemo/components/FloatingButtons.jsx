import React, { useEffect, useRef } from 'react';
import { Fab } from '@poon/ui';

const FloatingButtons = ({followUser, clickFollowUser, countPlaces, loading, showAsList, pan}) => {
	const el = useRef();
	useEffect(() => {
		return pan.on(value => {
			const y = Math.max(0, value - 50);
			el.current.style.transform = `translateY(-${y}px)`;
		});
	}, []);

	return (
		<div className="fab-container" ref={el}>
			<Fab
				icon="near_me"
				active={!followUser}
				onPress={clickFollowUser}
				disabled={!location}
			/>
			<Fab
				icon="list"
				title={`Show 10 as list`}
				loading={loading}
				disabled={countPlaces === 0}
				onPress={showAsList}
			/>
		</div>
	);
};

export default FloatingButtons