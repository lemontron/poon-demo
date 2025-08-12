import { useEffect, useRef } from 'react';
import { Fab, FabStack, toast } from 'poon-ui';

const MapFabs = ({followUser, clickFollowUser, countPlaces, loading, pan}) => {
	const el = useRef();
	useEffect(() => {
		return pan.on(value => {
			const y = Math.max(0, value - 50);
			el.current.style.transform = `translateY(-${y}px)`;
		});
	}, []);

	return (
		<FabStack>
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
				onPress={() => toast('Sup')}
			/>
		</FabStack>
	);
};

export default MapFabs;