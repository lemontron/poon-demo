import React from 'react';
import { Window, Placeholder, ViewPager, ScrollView, Reveal } from '@poon/ui';
import LongList from '../components/LongList.jsx';

const TabDemo = ({isVisible, animateIn}) => (
	<Reveal title="Tabs" isVisible={isVisible} animateIn={animateIn}>
		<ViewPager titles={['ScrollView', 'Placeholder']}>
			<ScrollView>
				<LongList/>
			</ScrollView>
			<Placeholder title="Sexy Ipsum"/>
		</ViewPager>
	</Reveal>
);

TabDemo.screenOptions = {};

export default TabDemo;