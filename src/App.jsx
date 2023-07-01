import './styles.css';
import 'poon-ui/src/poon.css';
import React, { Fragment } from 'react';
import { PoonOverlays } from '../../ui';
import { Stack, defineRoute } from '../../router';
import HomePage from './pages/HomePage.jsx';
import FileBrowser from './pages/FileBrowser/FileBrowser.jsx';
import AlertDemo from './pages/AlertDemo.jsx';
import ShadeDemoFluid from './pages/ShadeDemoFluid.jsx';
import TabDemo from './pages/TabDemo.jsx';
import Demos from './pages/Demos.jsx';
import FilesSearch from './pages/FileBrowser/FilesSearch.jsx';
import ShadeDemos from './pages/ShadeDemos.jsx';
import ShadeDemoRainbow from './pages/ShadeDemoRainbow.jsx';

defineRoute('Home', '/', HomePage);
defineRoute('FilesSearch', '/files/search', FilesSearch);
defineRoute('FileBrowser', '/files/:path?', FileBrowser);
defineRoute('AlertDemo', '/alert', AlertDemo, 'modal');
defineRoute('Demos', '/demos', Demos);
defineRoute('ShadeDemoFluid', '/shades/fluid', ShadeDemoFluid);
defineRoute('ShadeDemoFluid', '/shades/rainbow', ShadeDemoRainbow);
defineRoute('ShadeDemos', '/shades', ShadeDemos);
defineRoute('TabDemo', '/tab', TabDemo, 'modal');

const App = () => (
	<Fragment>
		<Stack filter="main"/>
		<Stack filter="modal"/>
		<PoonOverlays/>
	</Fragment>
);

export default App;