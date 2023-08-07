import React from 'react';
import { Window, GalleryItem, ViewPager } from 'poon-ui';
import images from './photos.json';

const renderItem = (image) => (
	<GalleryItem key={image}>
		<img src={image} draggable={false}/>
	</GalleryItem>
);

const GalleryDemo = ({screen, isVisible}) => {
	const page = parseInt(screen.useQueryParam('index'));
	return (
		<Window
			isVisible={isVisible}
			HeaderComponent={null}
			presentation="fullscreen"
		>
			<ViewPager
				children={images.map(renderItem)}
				page={page}
			/>
		</Window>
	);
};

export default GalleryDemo;