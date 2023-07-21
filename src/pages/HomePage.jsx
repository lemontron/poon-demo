import React, { useRef } from 'react';
import { Button, DashboardIcon, ViewPager } from 'poon-ui';
import Logo from '../components/Logo.jsx';

const HomePage = ({}) => {
	const el = useRef();

	return (
		<div className="pitch">
			<ViewPager vertical ref={el}>
				<div className="pitch-page">
					<Logo/>
					<p>
						Married to the web but want to get down and dirty with
						a native app? 😈
					</p>
					<Button
						icon="arrow_downward"
						title="Keep Going"
						onClick={() => el.current.scrollToPage(1)}
						color="clear"
					/>
				</div>
				<div className="pitch-page">
					<p>Poon UI is so native, it feels indecent!</p>
					<Button
						icon="arrow_downward"
						title="Do It"
						onClick={() => el.current.scrollToPage(2)}
						color="clear"
					/>
				</div>
				<div className="pitch-page">
					<p>Why settle for a vanilla web app? 🥱</p>
					<Button
						icon="arrow_downward"
						title="Harder"
						onClick={() => el.current.scrollToPage(3)}
						color="clear"
					/>
				</div>
				<div className="pitch-page">
					<p>Put my project in your dependencies and let's make some magic! 🌶️🔥</p>
					<div>
						<DashboardIcon title="Power On!" href="/demos" icon="power_settings_new"/>
					</div>
				</div>
			</ViewPager>
		</div>
	);
};

export default HomePage;