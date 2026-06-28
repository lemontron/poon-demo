import React from 'react';
import { Window, GalleryItem, ViewPager } from 'meteor/poon';
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
				frame
			/>
		</Window>
	);
};

export default GalleryDemo;