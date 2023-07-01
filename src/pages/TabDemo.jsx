import React from 'react';
import { Window, Placeholder, ViewPager } from '@poon/ui';

const TabDemo = ({isVisible, animateIn}) => (
	<Window title="Tab Demo" isVisible={isVisible} animateIn={animateIn}>
		<ViewPager titles={['Tab 1', 'Tab 2']}>
			<Placeholder title="Lorem Poon"/>
			<Placeholder title="Sexy Ipsum"/>
		</ViewPager>
	</Window>
);

TabDemo.screenOptions = {};

export default TabDemo;