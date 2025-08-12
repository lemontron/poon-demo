import { useState } from 'react';
import { Window, TouchableRow, List, CheckBox, Tag, ScrollView, TextInput, useFilterState } from 'poon-ui';

const filterTags = (tags, search) => {
	search = search.toLowerCase();
	if (!search) return tags;
	return tags.filter(tag => tag._id.toLowerCase().includes(search));
};

const tags = [
	{_id: 'Daddy Pays', count: 10},
	{_id: 'Sexy', count: 9},
	{_id: 'Cocktails', count: 8},
	{_id: 'Wet', count: 7},
	{_id: 'Salacious Content', count: 7},
	{_id: 'First Date', count: 3},
	{_id: 'Interior Design', count: 3},
	{_id: 'A Place To Find Yourself', count: 3},
	{_id: 'Demon Timing', count: 3},
	{_id: 'Hot', count: 3},
];

const FilterTags = ({isVisible, animateIn}) => {
	const [search, setSearch] = useState('');

	const [keys, toggleKey, toggleAll] = useFilterState([], tags.map(r => r._id));

	return (
		<Window
			title="Tags"
			isVisible={isVisible}
			animateIn={animateIn}
			SearchComponent={
				<TextInput type="search" value={search} onChangeText={setSearch}/>
			}
		>
			<ScrollView>
				<List
					HeaderComponent={
						<TouchableRow
							title={keys ? `${keys.length || 'None'} selected` : 'All selected'}
							active={!keys}
							onClick={toggleAll}
							RightComponent={<CheckBox undetermined={keys && keys.length > 0} active={!keys}/>}
						/>
					}
					items={filterTags(tags, search)}
					renderItem={tag => (
						<TouchableRow
							children={<Tag tag={tag._id} count={tag.count}/>}
							onClick={() => toggleKey(tag._id)}
							RightComponent={<CheckBox active={keys ? keys.includes(tag._id) : true}/>}
						/>
					)}
				/>
			</ScrollView>
		</Window>
	);
};

export default FilterTags;