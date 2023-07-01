import React from 'react';
import { navigation } from '../../../../router';
import { List, Window } from '../../../../ui';
import FileItem from './FileItem.jsx';

const FilesSearch = ({screen, isVisible}) => {
	const search = screen.useQueryParam('search', '');

	const renderItem = doc => (
		<FileItem key={doc._id} file={doc}/>
	);

	const renderBody = () => {
		if (!search) return null;
		return <List items={[]} renderItem={renderItem}/>;
	};

	return (
		<Window
			title="Search"
			search={search}
			onChangeSearch={val => navigation.setQueryParams({'search': val}, {replaceState: true})}
			children={renderBody()}
			isVisible={isVisible}
		/>
	);
};

export default FilesSearch;