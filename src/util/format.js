// Pretty Bytes
const units = ['B', 'kB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
export const prettyBytes = (number) => {
	if (!number) return '0 B';
	if (number < 1) return number.toLocaleString() + ' B';
	const exponent = Math.min(Math.floor(Math.log10(number) / 3), units.length - 1);
	number = Number((number / Math.pow(1000, exponent)).toPrecision(3));
	return number.toLocaleString() + ' ' + units[exponent];
};