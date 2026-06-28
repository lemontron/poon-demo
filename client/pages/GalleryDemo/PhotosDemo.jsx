import React from 'react';
import { Reveal, ScrollView, Touchable } from 'meteor/poon';
import files from './photos.json';

const renderItem = (file, i) => (
	<Touchable
		key={file.url}
		href={`/photos/gallery?index=${i}`}
		style={{backgroundImage: `url(${file.url})`}}
	/>
);

const PhotosDemo = ({isVisible, animateIn}) => {
	return (
		<Reveal
			title={
				<img src="/logo.svg" height={24}/>
			}
			isVisible={isVisible}
			animateIn={animateIn}
			HeaderComponent={null}
			className="gallery-demo"
		>
			<ScrollView frame>
				<div className="gallery-grid" children={files.map(renderItem)}/>
			</ScrollView>
		</Reveal>
	);
};

export default PhotosDemo;