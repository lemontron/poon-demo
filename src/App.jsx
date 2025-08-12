import './styles.css';
import 'poon-ui/poon.css';
import { Fragment } from 'react';
import { AnimatedValue, PoonOverlays } from 'poon-ui';
import { defineRoute, Stack } from 'poon-router';
import HomePage from './pages/HomePage';
import FileBrowser from './pages/FileBrowser/FileBrowser';
import AlertDemo from './pages/AlertDemo';
import ShadeDemoFluid from './pages/ShadeDemoFluid';
import TabDemo from './pages/TabDemo';
import Demos from './pages/Demos';
import FilesSearch from './pages/FileBrowser/FilesSearch';
import ShadeDemos from './pages/ShadeDemos';
import ShadeDemoRainbow from './pages/ShadeDemoRainbow';
import MapDemo from './pages/MapDemo/MapDemo';
import FilterCategories from './pages/MapDemo/FilterCategories';
import FilterTags from './pages/MapDemo/FilterTags';
import ClockDemo from './pages/ClockDemo';
import GalleryDemo from './pages/GalleryDemo/GalleryDemo';
import PhotosDemo from './pages/GalleryDemo/PhotosDemo';

defineRoute('Home', '/', HomePage);
defineRoute('Demos', '/demos', Demos);
defineRoute('FilesSearch', '/files/search', FilesSearch);
defineRoute('FileBrowser', '/files/:path?', FileBrowser);
defineRoute('AlertDemo', '/alert', AlertDemo);
defineRoute('ShadeDemoFluid', '/shades/fluid', ShadeDemoFluid);
defineRoute('ShadeDemoFluid', '/shades/rainbow', ShadeDemoRainbow);
defineRoute('ShadeDemos', '/shades', ShadeDemos);
defineRoute('TabDemo', '/tab', TabDemo);
defineRoute('MapDemo', '/map', MapDemo);
defineRoute('MapDemoFilterCategories', '/map/categories', FilterCategories);
defineRoute('MapDemoFilterTags', '/map/tags', FilterTags);
defineRoute('ClockDemo', '/clock', ClockDemo);
defineRoute('PhotosDemo', '/photos', PhotosDemo);
defineRoute('GalleryDemo', '/photos/gallery', GalleryDemo);

const App = () => (
	<Fragment>
		<Stack filter="main"/>
		<PoonOverlays/>
	</Fragment>
);

AnimatedValue.defaultAnimationDuration = 500;

export default App;