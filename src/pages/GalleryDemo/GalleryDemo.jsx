import React from 'react';
import { Window, GalleryItem, ViewPager } from 'poon-ui';
import files from './photos.json';

const renderItem = (file) => (
	<GalleryItem key={file.url}>
		<img src={file.url} draggable={false}/>
	</GalleryItem>
);

const GalleryDemo = ({screen, isVisible}) => {
	const page = screen.useQueryParam('index', parseInt);
	return (
		<Window
			isVisible={isVisible}
			HeaderComponent={null}
			presentation="fullscreen"
		>
			<ViewPager
				children={files.map(renderItem)}
				page={page}
				gap={15}
			/>
		</Window>
	);
};

export default GalleryDemo;