import { Card, SpringBoardIcon, ViewPager } from 'poon-ui';

const Demos = ({isVisible, animateIn}) => (
	<Card
		isVisible={isVisible}
		animateIn={animateIn}
		HeaderComponent={null}
		ShadeComponent={null}
		disableGestures
	>
		<ViewPager showDots className="demos" frame>
			<div className="springboard">
				<SpringBoardIcon title="Photos" icon="photo" href="/photos"/>
				<SpringBoardIcon title="Map" icon="place" href="/map"/>
				<SpringBoardIcon title="Files" icon="folder" href="/files"/>
				<SpringBoardIcon title="Alerts" icon="notifications" href="/alert"/>
				<SpringBoardIcon title="Clock" icon="watch_later" href="/clock"/>
				<SpringBoardIcon title="Shades" icon="curtains_closed" href="/shades"/>
				<SpringBoardIcon title="Tabs" icon="tab" href="/tab"/>
			</div>
			<div className="springboard">
				<SpringBoardIcon title="Tabs" icon="tab" href="/tab"/>
				<SpringBoardIcon title="Tabs" icon="tab" href="/tab"/>
				<SpringBoardIcon title="Tabs" icon="tab" href="/tab"/>
				<SpringBoardIcon title="Tabs" icon="tab" href="/tab"/>
				<SpringBoardIcon title="Tabs" icon="tab" href="/tab"/>
				<SpringBoardIcon title="Tabs" icon="tab" href="/tab"/>
				<SpringBoardIcon title="Tabs" icon="tab" href="/tab"/>
				<SpringBoardIcon title="Tabs" icon="tab" href="/tab"/>
			</div>
		</ViewPager>
	</Card>
);

export default Demos;