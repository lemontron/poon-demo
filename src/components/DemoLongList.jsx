import { List, TouchableRow, toast } from 'poon-ui';

const items = new Array(200).fill(null).map((v, i) => `Item #${i + 1}`);

const DemoLongList = () => (
	<List
		items={items}
		keyExtractor={val => val}
		renderItem={item => (
			<TouchableRow
				title={item}
				caret
				leftIcon="cloud"
				onClick={() => toast(item)}
			/>
		)}
	/>
);

export default DemoLongList;