import React from 'react';
import { List, Reveal, showAlert, toast, TouchableRow } from '@poon/ui';

const AlertDemo = ({isVisible}) => {
	const handleResult = (id) => {
		toast(id ? `You pressed ${id}` : 'You dismissed the alert');
	};

	const showDemoAlert = () => showAlert({
		title: 'Demo Alert',
		message: 'You will find that alerts are helpful',
	}, [
		{_id: 'disagree', name: 'Disagree'},
		{_id: 'agree', name: 'Agree'},
	]).then(handleResult);

	const pressRedAlert = () => showAlert({
		title: 'Demo Alert',
		message: 'Are you sure you want to delete the red button?',
	}, [
		{_id: 'delete', name: 'Delete', destructive: true},
		{_id: 'cancel', name: 'Cancel'},
	]).then(handleResult);

	const pressManyButtonsAlert = () => showAlert({
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
	]).then(handleResult);

	const pressDefaultAlert = () => showAlert({
		title: 'Demo Alert',
		message: 'Even though this alert has no options, a close button is added by poon-ui.',
	}).then(handleResult);

	const pressEmptyAlert = () => showAlert({
		title: 'Demo Alert',
		message: 'There will be no button if you pass an empty options array.',
	}, []);

	const pressMultipleAlerts = () => {
		showAlert({title: 'Alert #1', message: 'So many alerts!'});
		showAlert({title: 'Alert #2', message: 'So many alerts!'});
		showAlert({title: 'Alert #3', message: 'So many alerts!'});
		showAlert({title: 'Alert #4', message: 'So many alerts!'});
		showAlert({title: 'Alert #5', message: 'So many alerts!'});
	};

	const pressExplodeAlert = (className) => showAlert({
		title: 'Alert',
		message: 'This alert is fucking metal',
		className: className,
	});

	return (
		<Reveal
			title="Alert Demo"
			isVisible={isVisible}
			children={
				<List className="alert-demo">
					<TouchableRow
						title="Show unpretentious normal old alert"
						onClick={showDemoAlert}
						caret
					/>
					<TouchableRow
						title="Show alert chock full of options"
						onClick={pressManyButtonsAlert}
						caret
					/>
					<TouchableRow
						title="Show treacherous alert with dangerous red button"
						onClick={pressRedAlert}
						caret
					/>
					<TouchableRow
						title="Show presumptious alert with no options"
						onClick={pressDefaultAlert}
						caret
					/>
					<TouchableRow
						title="Show modest alert with empty options"
						onClick={pressEmptyAlert}
						caret
					/>
					<TouchableRow
						title="Show ménage à 5 alerts!!!"
						onClick={pressMultipleAlerts}
						caret
					/>
					<TouchableRow
						title="Show the most fucking lit alert no cap"
						onClick={() => pressExplodeAlert('explode')}
						caret
					/>
					<TouchableRow
						title="Exciting sparkly alert"
						onClick={() => pressExplodeAlert('firework')}
						caret
					/>
					<TouchableRow
						title="Confetti alert"
						onClick={() => pressExplodeAlert('confetti')}
						caret
					/>
				</List>
			}
			className="alert-demo-card"
		/>
	);
};

export default AlertDemo;