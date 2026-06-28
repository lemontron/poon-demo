// Pretty Bytes
const units = ['B', 'kB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
export const prettyBytes = (number) => {
	if (!number) return '0 B';
	if (number < 1) return number.toLocaleString() + ' B';
	const exponent = Math.min(Math.floor(Math.log10(number) / 3), units.length - 1);
	number = Number((number / Math.pow(1000, exponent)).toPrecision(3));
	return number.toLocaleString() + ' ' + units[exponent];
};

export const pluralize = (count, phrase, formatFn = val => val) => {
	if (count === 1) return `${formatFn(count)} ${phrase}`;
	if (phrase.endsWith('y')) return `${formatFn(count)} ${phrase.slice(0, -1)}ies`;
	if (phrase.endsWith('ch')) return `${formatFn(count)} ${phrase}es`;
	return `${formatFn(count)} ${phrase}s`;
};

export const capitalize = string => {
	if (!string || typeof string !== 'string') return '';
	return string.charAt(0).toUpperCase() + string.slice(1);
};
