import {
	BreadCrumbs,
	Card,
	Dropdown,
	DropdownItem,
	Fab,
	HeaderButton,
	List,
	Placeholder,
	Reveal,
	ScrollView,
	VStack,
	ZStack,
	FabStack,
} from 'poon-ui';
import { randomId } from 'poon-router';
import images from '../GalleryDemo/photos.json';
import FileItem from './FileItem';
import { FILE, FOLDER } from '../../util/constants';

const transformImage = (file) => ({
	_id: randomId(),
	type: FILE,
	name: file.url.split('/').pop(),
	size: 256000,
	addedOn: new Date(),
	icon: 'description',
	path: '/gallery',
});

const demoFiles = [...images.map(transformImage), {
	_id: randomId(),
	type: FILE,
	name: 'banana.txt',
	size: 2000,
	addedOn: new Date(),
	icon: 'description',
	path: '/',
}, {
	_id: randomId(),
	type: FOLDER,
	name: 'gallery',
	path: '/',
}, {
	_id: randomId(),
	type: FOLDER,
	name: 'archives',
	path: '/',
}, {
	_id: randomId(),
	type: FILE,
	name: 'pictures-of-cats.zip',
	path: '/archives',
	size: 2678756000,
	icon: 'archive',
}, {
	_id: randomId(),
	type: FILE,
	name: 'pictures-of-birds.zip',
	path: '/archives',
	size: 91289874,
	icon: 'archive',
}, {
	_id: randomId(),
	type: FILE,
	name: 'pictures-of-dinosaurs.zip',
	path: '/archives',
	size: 40409904,
	icon: 'archive',
}, {
	_id: randomId(),
	type: FILE,
	name: 'lorem.txt',
	path: '/archives',
	size: 23124,
	icon: 'description',
}];

const FileBrowser = ({screen, isVisible, animateIn}) => {
	const path = '/' + screen.useParam('path', '');

	// const folder = demoFiles.find(r => r.type === 'folder' && r.path === path);
	const files = demoFiles.filter(r => r.path === path);

	// console.log(path, files);

	const renderBody = () => {
		// if (path !== '/' && !folder) return (
		// 	<Placeholder icon="info" title="Folder does not exist"/>
		// );

		return (
			<ZStack>
				<VStack padding={false} spacing={false}>
					{path === '/' ? null : (
						<BreadCrumbs path={path}/>
					)}
					<ScrollView>
						<List
							ListEmptyComponent={<Placeholder message="Empty Folder"/>}
							items={files}
							renderItem={doc => (
								<FileItem key={doc._id} file={doc}/>
							)}
						/>
					</ScrollView>
				</VStack>
				<FabStack>
					<Dropdown
						button={<Fab icon="add" title="Add"/>}
						position="bottom-right"
						content={
							<DropdownItem icon="create_new_folder" title="Create Folder"/>
						}
					/>
				</FabStack>
			</ZStack>
		);
	};

	if (path === '/') return (
		<Reveal
			title="Files"
			isVisible={isVisible}
			animateIn={animateIn}
			headerRight={<HeaderButton icon="search" href="/files/search"/>}
			children={renderBody()}
			className="files"
		/>

	);

	return (
		<Card
			title={'/' + path.split('/').pop()}
			isVisible={isVisible}
			animateIn={animateIn}
			headerRight={<HeaderButton icon="search" href="/files/search"/>}
			children={renderBody()}
		/>
	);
};

export default FileBrowser;