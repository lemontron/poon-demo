import React, { useRef, useState } from 'react';
import { Reveal, ScrollView, PillButton, showModal, toast, SearchInput, useAnimatedValue } from 'poon-ui';
import { capitalize, pluralize } from '../../util/format.js';
import { filterDates } from './filters.js';
import { defaultLocation } from './constants.js';
import MapBox from './components/MapBox.jsx';
import FloatingButtons from './components/FloatingButtons.jsx';

const MapDemo = ({isVisible, animateIn}) => {
	const map = useRef();
	const pan = useAnimatedValue(0);

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
			title="Map Demo"
			isVisible={isVisible}
			animateIn={animateIn}
			className="map"
		>
			<div className="map-search">
				<SearchInput
					placeholder="Search places..."
				/>
			</div>
			<div className="map-container">
				<MapBox
					ref={map}
					features={features}
					center={defaultLocation}
					onChangeBounds={setViewport}
					onMoveStart={moveMap}
					location={defaultLocation}
					followUser={followUser}
					onPressPlace={setPlaceId}
					placeId={placeId}
				/>
				<ScrollView className="pills" horizontal>
					<PillButton
						LeftComponent={<img className="avatar" src="https://randomuser.me/api/portraits/women/73.jpg"/>}
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
					<PillButton
						title={categoryKeys.length ? pluralize(categoryKeys.length, 'category') : 'Category'}
						href="/map/categories"
						active={categoryKeys.length}
					/>
					<PillButton
						title={tagKeys.length ? pluralize(tagKeys.length, 'tag') : 'Tags'}
						href="/map/tags"
						active={tagKeys.length}
					/>
					<PillButton
						title={typeKeys.length === 1 ? capitalize(typeKeys[0]) : 'Type'}
						onPress={() => showModal(<FilterType onSubmit={setTypeKeys} initialKeys={typeKeys}/>)}
						active={typeKeys.length}
					/>
					<PillButton
						title={dateFilter === 'all' ? 'Dates' : filterDates.find(r => r._id === dateFilter).name}
						onPress={() => showModal(<FilterDate onSubmit={setDateFilter} filterId={dateFilter}/>)}
						active={dateFilter !== 'all'}
					/>
				</ScrollView>
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