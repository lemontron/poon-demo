import React from 'react';
import { Reveal, ScrollView, Touchable } from 'poon-ui';
import images from './photos.json';

const renderItem = (image, i) => (
	<Touchable key={image} href={`/photos/gallery?index=${i}`}>
		<img src={image} draggable={false}/>
	</Touchable>
);

const PhotosGridDemo = ({isVisible, animateIn}) => {
	return (
		<Reveal
			title="Gallery Demo"
			isVisible={isVisible}
			animateIn={animateIn}
			HeaderComponent={null}
			className="gallery-demo"
		>
			<ScrollView>
				<div className="gallery-grid" children={images.map(renderItem)}/>
			</ScrollView>
		</Reveal>
	);
};

export default PhotosGridDemo;