import React from 'react';
import { List, TouchableRow } from '@poon/ui';

const items = new Array(200).fill(null).map((v, i) => `Item #${i + 1}`);

const renderButton = item => <TouchableRow title={item} caret leftIcon="cloud"/>;

const LongList = () => (
	<List
		items={items}
		keyExtractor={val => val}
		renderItem={renderButton}
	/>
);

export default LongList;