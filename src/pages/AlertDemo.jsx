import { List, Reveal, showAlert, toast, TouchableRow, ScrollView } from 'poon-ui';

const handleResult = (id) => {
	toast(id ? `You pressed ${id}` : 'You dismissed the alert');
};

const pressExplodeAlert = (className) => showAlert({
	'title': 'Alert',
	'message': 'This alert is fucking metal',
	className,
});

const alerts = [{
	'_id': 'Show unpretentious normal old alert',
	'onClick': () => showAlert({
		title: 'Demo Alert',
		message: 'You will find that alerts are helpful',
	}, [
		{_id: 'disagree', name: 'Disagree'},
		{_id: 'agree', name: 'Agree'},
	]).then(handleResult),
}, {
	'_id': 'Show alert chock full of options',
	'onClick': () => showAlert({
		title: 'Demo Alert',
		message: 'This has a lot of options!',
	}, [
		{_id: '1', name: 'Option 1'},
		{_id: '2', name: 'Option 2'},
		{_id: '3', name: 'Option 3'},
		{_id: '4', name: 'Option 4'},
		{_id: '5', name: 'Option 5'},
		{_id: '6', name: 'Option 6'},
		{_id: '7', name: 'Option 7'},
		{_id: '8', name: 'Option 8'},
		{_id: '9', name: 'Option 9'},
		{_id: '10', name: 'Option 10'},
	]).then(handleResult),
}, {
	'_id': 'Show treacherous alert with dangerous red button',
	'onClick': () => showAlert({
		title: 'Demo Alert',
		message: 'Are you sure you want to delete the red button?',
	}, [
		{_id: 'delete', name: 'Delete', destructive: true},
		{_id: 'cancel', name: 'Cancel'},
	]).then(handleResult),
}, {
	'_id': 'Show presumptious alert with no options',
	'onClick': () => showAlert({
		title: 'Demo Alert',
		message: 'Even though this alert has no options, a close button is added by poon-ui.',
	}).then(handleResult),
}, {
	'_id': 'Show modest alert with empty options',
	'onClick': () => showAlert({
		title: 'Demo Alert',
		message: 'There will be no button if you pass an empty options array.',
	}, []),
}, {
	'_id': 'Show ménage à 5 alerts!!!',
	'onClick': () => {
		showAlert({title: 'Alert #1', message: 'So many alerts!'});
		showAlert({title: 'Alert #2', message: 'So many alerts!'});
		showAlert({title: 'Alert #3', message: 'So many alerts!'});
		showAlert({title: 'Alert #4', message: 'So many alerts!'});
		showAlert({title: 'Alert #5', message: 'So many alerts!'});
	},
}, {
	'_id': 'Show the most fucking lit alert no cap',
	'onClick': () => pressExplodeAlert('explode'),
}, {
	'_id': 'Exciting sparkly alert',
	'onClick': () => pressExplodeAlert('firework'),
}, {
	'_id': 'Confetti alert',
	'onClick': () => pressExplodeAlert('confetti'),
}];

const AlertDemo = ({isVisible, animateIn}) => (
	<Reveal
		title="Alert Demo"
		isVisible={isVisible}
		animateIn={animateIn}
		children={
			<ScrollView>
				<List
					items={alerts}
					renderItem={item => (
						<TouchableRow title={item._id} onClick={item.onClick} caret/>
					)}
				/>
			</ScrollView>
		}
	/>
);

export default AlertDemo;