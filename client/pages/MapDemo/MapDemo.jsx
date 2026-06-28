import React, { useRef, useState } from 'react';
import {
	FilterButton,
	Reveal,
	ScrollView,
	SegmentedController,
	TextInput,
	ZStack,
	VStack,
	toast,
	useAnimatedValue,
	useLocation,
} from 'meteor/poon';
import MapBox from 'meteor/poon-map';
import { capitalize, pluralize } from '../../util/format';
import { filterDates } from './filters';
import { defaultLocation } from './constants';
import MapFabs from './components/MapFabs';

const MapDemo = ({isVisible, animateIn}) => {
	const [search, setSearch] = useState('');
	const [tab, setTab] = useState('map');
	const map = useRef();
	const pan = useAnimatedValue(0);
	const location = useLocation();

	// Filters
	const [removeKeys, setRemoveKeys] = useState([]);
	const [categoryKeys] = useState([]);
	const [tagKeys] = useState([]);
	const [typeKeys] = useState([]);
	const [dateFilter] = useState('all');

	// Map
	const [, setViewport] = useState(null);
	const [followUser, setFollowUser] = useState(true);
	const [placeId, setPlaceId] = useState(null);

	const features = [];

	const moveMap = (isUserInteraction) => {
		if (isUserInteraction) setFollowUser(false);
	};

	const clickFollowUser = () => {
		setFollowUser(true);
		if (location) map.current.setCenter(location);
	};

	return (
		<Reveal
			title={
				<SegmentedController
					options={[
						{name: 'Feed', _id: 'feed'},
						{name: 'Chat', _id: 'chat'},
						{name: 'Map', _id: 'map'},
					]}
					value={tab}
					onChange={setTab}
				/>
			}
			isVisible={isVisible}
			animateIn={animateIn}
			className="map"
			SearchComponent={
				<TextInput type="search" value={search} onChangeText={setSearch}/>
			}
		>
			<ZStack frame className="map-container">
				<MapBox
					ref={map}
					features={features}
					center={defaultLocation}
					onChangeViewport={setViewport}
					onMoveStart={moveMap}
					location={location}
					followUser={followUser}
					onPressPlace={setPlaceId}
					placeId={placeId}
					accessToken="pk.eyJ1IjoiaG90c3BvdG55YyIsImEiOiJja2FjbzlldzkxYmI2MnNyeXByeTMxeGVkIn0.hR5UA6Ejo8uW8ADPnoh1bA"
				/>
				<VStack align="leading" passthrough>
					<ScrollView horizontal pills padding>
						<FilterButton
							LeftComponent={
								<img
									className="avatar"
									src="https://randomuser.me/api/portraits/women/73.jpg"
								/>
							}
							onPress={() => {
								if (removeKeys.length) {
									setRemoveKeys([]);
									toast('Your spots are visible');
								} else {
									setRemoveKeys([1]);
									toast('Your spots are hidden');
								}
							}}
							checked={removeKeys.length === 0}
							active={removeKeys.length}
							caret={false}
						/>
						<FilterButton
							title={categoryKeys.length ? pluralize(categoryKeys.length, 'category') : 'Category'}
							href="/map/categories"
							active={categoryKeys.length}
						/>
						<FilterButton
							title={tagKeys.length ? pluralize(tagKeys.length, 'tag') : 'Tags'}
							href="/map/tags"
							active={tagKeys.length}
						/>
						<FilterButton
							title={typeKeys.length === 1 ? capitalize(typeKeys[0]) : 'Type'}
							active={typeKeys.length}
							disabled={true}
						/>
						<FilterButton
							title={dateFilter === 'all' ? 'Dates' : filterDates.find(r => r._id === dateFilter).name}
							active={dateFilter !== 'all'}
							disabled={true}
						/>
					</ScrollView>
				</VStack>
				<MapFabs
					pan={pan}
					followUser={followUser}
					clickFollowUser={clickFollowUser}
				/>
			</ZStack>
		</Reveal>
	);
};

export default MapDemo;
