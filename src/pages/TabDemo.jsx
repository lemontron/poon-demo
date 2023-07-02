import React from 'react';
import { Window, Placeholder, ViewPager, ScrollView } from '@poon/ui';
import LongList from '../components/LongList.jsx';

const TabDemo = ({isVisible, animateIn}) => (
	<Window title="Tabs" isVisible={isVisible} animateIn={animateIn}>
		<ViewPager titles={['ScrollView', 'Placeholder']}>
			<ScrollView>
				<LongList/>
			</ScrollView>
			<Placeholder title="Sexy Ipsum"/>
		</ViewPager>
	</Window>
);

TabDemo.screenOptions = {};

export default TabDemo;