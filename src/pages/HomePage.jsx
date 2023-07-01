import React, { useRef } from 'react';
import { Button, DashboardIcon, ViewPager } from '../../../ui';
import Logo from '../components/Logo.jsx';

const HomePage = ({}) => {
	const el = useRef();

	return (
		<div className="pitch">
			<ViewPager vertical ref={el}>
				<div className="pitch-page">
					<Logo/>
					<p>
						Married to the <span className="underline">web</span> but want to get down and dirty with
						a <span className="underline">native app</span>? 😈
					</p>
					<Button
						icon="arrow_downward"
						title="Keep Going"
						onClick={() => el.current.scrollToPage(1)}
					/>
				</div>
				<div className="pitch-page">
					<p>Poon UI is so native, it feels indecent!</p>
					<Button
						icon="arrow_downward"
						title="Do It"
						onClick={() => el.current.scrollToPage(2)}
					/>
				</div>
				<div className="pitch-page">
					<p>Why settle for a vanilla web app? 🥱</p>
					<Button
						icon="arrow_downward"
						title="Harder"
						onClick={() => el.current.scrollToPage(3)}
					/>
				</div>
				<div className="pitch-page">
					{/*<p>Ready to dive into the wildest adventure of your life?</p>*/}
					<p>Put my project in your dependencies and let's make some magic! 🌶️🔥</p>
					<div className="springboard">
						<DashboardIcon title="Launch Demo" href="/demos" icon="tips_and_updates"/>
					</div>
				</div>
			</ViewPager>
		</div>
	);
};

export default HomePage;