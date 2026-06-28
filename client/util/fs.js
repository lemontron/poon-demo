export const getFolder = (path) => {
	const parts = splitPath(path);
	const name = parts.pop();
	return {'name': name, 'path': '/' + parts.join('/')};
};

export const splitPath = val => val.split('/').filter(Boolean);

export const createPath = (...parts) => '/' + parts.flatMap(splitPath).join('/');
