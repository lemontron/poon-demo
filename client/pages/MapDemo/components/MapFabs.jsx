import React, { useEffect, useRef } from 'react';
import { Fab, VStack, toast } from 'meteor/poon';

const MapFabs = ({followUser, clickFollowUser, countPlaces, loading, pan}) => {
	const el = useRef();
	useEffect(() => {
		return pan.on(value => {
			const y = Math.max(0, value - 50);
			el.current.style.transform = `translateY(-${y}px)`;
		});
	}, [pan]);

	return (
		<VStack ref={el} className="fab-container" align="trailing" justify="trailing" passthrough>
			<Fab
				icon="near_me"
				active={!followUser}
				onClick={clickFollowUser}
				disabled={!location}
			/>
			<Fab
				icon="list"
				title={`Show 10 as list`}
				loading={loading}
				disabled={countPlaces === 0}
				onClick={() => toast('Sup')}
			/>
		</VStack>
	);
};

export default MapFabs;
