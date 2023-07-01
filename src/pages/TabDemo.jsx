import React from 'react';
import { Window, Placeholder, ViewPager } from '../../../ui';

const TabDemo = ({isVisible}) => {
	return (
		<Window title="Tab Demo" isVisible={isVisible}>
			<ViewPager titles={['Tab 1', 'Tab 2']}>
				<Placeholder title="Lorem Poon"/>
				<Placeholder title="Sexy Ipsum"/>
			</ViewPager>
		</Window>
	);
};

TabDemo.screenOptions = {};

export default TabDemo;