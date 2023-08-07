import React from 'react';
import { Reveal, Placeholder, ViewPager, ScrollView } from 'poon-ui';
import LongList from '../components/LongList.jsx';

const TabDemo = ({isVisible, animateIn}) => (
	<Reveal
		title="Tabs"
		isVisible={isVisible}
		animateIn={animateIn}
	>
		<ViewPager titles={['ScrollView', 'Placeholder', 'Placeholder']}>
			<ScrollView>
				<LongList/>
			</ScrollView>
			<Placeholder title="Sexy Ipsum"/>
			<Placeholder title="Sexy Ipsum2"/>
		</ViewPager>
	</Reveal>
);

TabDemo.screenOptions = {};

export default TabDemo;