import { Card, Placeholder } from 'poon-ui';
import Fluid from '../components/Fluid';

const ShadeDemoFluid = ({isVisible, animateIn}) => (
	<Card
		title="Fluid Simulation Demo"
		ShadeComponent={Fluid}
		isVisible={isVisible}
		animateIn={animateIn}
		children={<Placeholder title="Swipe back to see fluid simulation!"/>}
		className="fluid-card"
	/>
);

export default ShadeDemoFluid;