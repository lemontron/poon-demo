import { Reveal, ScrollView, Touchable } from 'poon-ui';
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
				<img src="/public/logo.svg" height={24}/>
			}
			isVisible={isVisible}
			animateIn={animateIn}
			HeaderComponent={null}
			className="gallery-demo"
		>
			<ScrollView>
				<div className="gallery-grid" children={files.map(renderItem)}/>
			</ScrollView>
		</Reveal>
	);
};

export default PhotosDemo;