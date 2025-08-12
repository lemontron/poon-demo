import { SpringBoard, SpringBoardIcon, Reveal, ViewPager } from 'poon-ui';

const ShadeDemos = ({isVisible, animateIn}) => (
	<Reveal
		title="Shade Demo"
		isVisible={isVisible}
		animateIn={animateIn}
	>
		<ViewPager>
			<SpringBoard>
				<SpringBoardIcon title="Fluid" href="/shades/fluid" icon="water"/>
				<SpringBoardIcon title="Rainbow" href="/shades/rainbow" icon="looks"/>
			</SpringBoard>
		</ViewPager>
	</Reveal>
);

export default ShadeDemos;