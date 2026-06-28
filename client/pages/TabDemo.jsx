import React from 'react';
import { Reveal, Placeholder, ViewPager, ScrollView } from 'meteor/poon';
import DemoLongList from '../components/DemoLongList';

const TabDemo = ({isVisible, animateIn}) => (
	<Reveal
		title="Tabs"
		isVisible={isVisible}
		animateIn={animateIn}
	>
		<ViewPager titles={['ScrollView', 'Placeholder', 'Placeholder']} frame>
			<ScrollView>
				<DemoLongList/>
			</ScrollView>
			<Placeholder title="Sexy Ipsum"/>
			<Placeholder title="Sexy Ipsum2"/>
		</ViewPager>
	</Reveal>
);

TabDemo.screenOptions = {};

export default TabDemo;