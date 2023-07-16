import React, { useState } from 'react';
import { prettyBytes } from '../../util/format';
import { TouchableRow, Icon, showActionSheet } from 'poon-ui';
import { createPath } from '../../util/fs';

export const renderFileIcon = (file) => {
	return <Icon icon={file.icon}/>;
};

const renderFolderIcon = (folder) => {
	return <Icon icon="folder"/>;
};

const FileItem = ({file}) => {
	const [deleting, setDeleting] = useState(false);

	const showMore = (e) => {
		e.preventDefault();
		e.stopPropagation();
		showActionSheet('More', [{
			'name': 'Download',
			'icon': 'download',
		}, {
			'name': 'Share',
			'icon': 'share',
		}, {
			'name': 'Delete',
			'icon': 'delete',
		}, {
			'name': 'Metadata',
			'icon': 'info',
			'href': `/files/details?id=${file._id}`,
		}]);
	};

	if (file.type === 'folder') return (
		<TouchableRow
			leftIcon={renderFolderIcon(file)}
			title={file.name}
			onPressMore={showMore}
			href={createPath('files', file.path, file.name)}
		/>
	);

	return (
		<TouchableRow
			leftIcon={renderFileIcon(file)}
			onPressMore={showMore}
			title={file.name}
			meta={`${prettyBytes(file.size)}`}
			disabled={deleting}
		/>
	);
};

export default FileItem;