import React, { useState } from 'react';
import { CheckBox, Emoji, List, TouchableRow, Window } from 'poon-ui';
import { categories } from './constants.js';
import { useFilterState } from './components/map-util.jsx';

const searchCategories = (term) => {
	term = term.toLowerCase().trim();
	if (!term) return categories;
	return categories.filter(doc => doc.name.toLowerCase().includes(term));
};

const FilterCategories = ({isVisible, animateIn}) => {
	const [keys, toggleKey, toggleAll] = useFilterState([], categories.map(r => r.name));
	const [search, setSearch] = useState('');

	return (
		<Window
			title="Categories"
			search={search}
			onChangeSearch={setSearch}
			isVisible={isVisible}
			animateIn={animateIn}
		>
			<List
				HeaderComponent={
					<TouchableRow
						title={keys ? `${keys.length || 'None'} selected` : 'All selected'}
						toggle
						onClick={toggleAll}
						RightComponent={
							<CheckBox active={!keys} undetermined={keys && keys.length > 0}/>
						}
					/>
				}
				items={searchCategories(search)}
				keyExtractor={r => r.name}
				renderItem={item => (
					<TouchableRow
						leftIcon={<Emoji emoji={item.emoji}/>}
						title={item.name}
						onClick={() => toggleKey(item.name)}
						RightComponent={
							<CheckBox active={keys ? keys.includes(item.name) : true}/>
						}
					/>
				)}
			/>
		</Window>
	);
};

export default FilterCategories;