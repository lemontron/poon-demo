import { navigation } from 'poon-router';
import { List, Window, TextInput, Placeholder } from 'poon-ui';
import FileItem from './FileItem';

const FilesSearch = ({screen, isVisible}) => {
	const search = screen.useQueryParam('search', '');

	const renderItem = doc => (
		<FileItem key={doc._id} file={doc}/>
	);

	const renderBody = () => {
		if (!search) return <Placeholder title="Search for something..."/>;
		return <List items={[]} renderItem={renderItem}/>;
	};

	return (
		<Window
			title="Search"
			isVisible={isVisible}
			SearchComponent={
				<TextInput
					type="search"
					value={search}
					onChangeText={val => navigation.setQueryParams({'search': val}, {replaceState: true})}
				/>
			}
			children={renderBody()}
		/>
	);
};

export default FilesSearch;