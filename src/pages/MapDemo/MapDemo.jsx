import React, { useRef, useState } from 'react';
import {
	FilterButton,
	Reveal,
	ScrollView,
	SegmentedController,
	showModal,
	TextInput,
	toast,
	useAnimatedValue,
} from 'poon-ui';
import { useLocation } from 'poon-permissions';
import MapBox from 'poon-map';
import { capitalize, pluralize } from '../../util/format';
import { filterDates } from './filters';
import { defaultLocation } from './constants';
import FloatingButtons from './components/FloatingButtons';

const MapDemo = ({isVisible, animateIn}) => {
	const [tab, setTab] = useState('map');
	const map = useRef();
	const pan = useAnimatedValue(0);
	const location = useLocation();

	// Filters
	const [removeKeys, setRemoveKeys] = useState([]);
	const [categoryKeys, setCategoryKeys] = useState([]);
	const [tagKeys, setTagKeys] = useState([]);
	const [typeKeys, setTypeKeys] = useState([]);
	const [dateFilter, setDateFilter] = useState('all');

	// Map
	const [viewport, setViewport] = useState(null);
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
						{name: 'Feed', value: 'feed'},
						{name: 'Chat', value: 'chat'},
						{name: 'Map', value: 'map'},
					]}
					value={tab}
					onChange={setTab}
				/>
			}
			isVisible={isVisible}
			animateIn={animateIn}
			className="map"
		>
			<div className="header-search">
				<TextInput
					type="search"
					placeholder="Search places..."
				/>
			</div>
			<div className="map-container">
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
				<div className="map-controls-scroller">
					<ScrollView horizontal>
						<div className="pills">
							<FilterButton
								LeftComponent={<img className="avatar"
													src="https://randomuser.me/api/portraits/women/73.jpg"/>}
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
								onPress={() => showModal(<FilterType onSubmit={setTypeKeys} initialKeys={typeKeys}/>)}
								active={typeKeys.length}
								disabled={true}
							/>
							<FilterButton
								title={dateFilter === 'all' ? 'Dates' : filterDates.find(r => r._id === dateFilter).name}
								onPress={() => showModal(<FilterDate onSubmit={setDateFilter} filterId={dateFilter}/>)}
								active={dateFilter !== 'all'}
								disabled={true}
							/>
						</div>
					</ScrollView>
				</div>
			</div>
			<FloatingButtons
				pan={pan}
				followUser={followUser}
				clickFollowUser={clickFollowUser}
			/>
		</Reveal>
	);
};

export default MapDemo;