import React, { Fragment } from 'react';
import {
	BreadCrumbs,
	Button,
	Card,
	Dropdown,
	DropdownItem,
	Fab,
	HeaderButton,
	List,
	Placeholder,
	Reveal,
} from '@poon/ui';
import { randomId } from '@poon/router/util.js';
import FileItem from './FileItem.jsx';

const demoFiles = [{
	_id: randomId(),
	type: 'file',
	name: 'image.jpg',
	size: 100000,
	addedOn: new Date(),
	icon: 'image',
	path: '/',
}, {
	_id: randomId(),
	type: 'file',
	name: 'banana.txt',
	size: 2000,
	addedOn: new Date(),
	icon: 'description',
	path: '/',
}, {
	_id: randomId(),
	type: 'folder',
	name: 'archives',
	path: '/',
}, {
	_id: randomId(),
	type: 'file',
	name: 'pictures-of-cats.zip',
	path: '/archives',
	size: 2678756000,
	icon: 'archive',
}, {
	_id: randomId(),
	type: 'file',
	name: 'pictures-of-birds.zip',
	path: '/archives',
	size: 91289874,
	icon: 'archive',
}, {
	_id: randomId(),
	type: 'file',
	name: 'pictures-of-dinosaurs.zip',
	path: '/archives',
	size: 40409904,
	icon: 'archive',
}, {
	_id: randomId(),
	type: 'file',
	name: 'lorem.txt',
	path: '/archives',
	size: 23124,
	icon: 'description',
}];

const FileBrowser = ({screen, isVisible, animateIn}) => {
	const path = '/' + screen.useParam('path', '');

	// const folder = demoFiles.find(r => r.type === 'folder' && r.path === path);
	const files = demoFiles.filter(r => r.path === path);

	console.log(path, files);

	const renderFab = () => {
		return (
			<div className="fab-container">
				<Dropdown
					button={<Fab icon="add" title="Add"/>}
					position="bottom-right"
					content={
						<DropdownItem icon="create_new_folder" title="Create Folder"/>
					}
				/>
			</div>
		);
	};

	const renderBody = () => {
		// if (path !== '/' && !folder) return (
		// 	<Placeholder icon="info" title="Folder does not exist"/>
		// );

		return (
			<Fragment>
				<BreadCrumbs path={path}/>
				<List
					ListEmptyComponent={<Placeholder message="Empty Folder"/>}
					items={files}
					renderItem={doc => (
						<FileItem key={doc._id} file={doc}/>
					)}
				/>
				{renderFab()}
			</Fragment>
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
			className="files"
		/>
	);
};

export default FileBrowser;