import React from 'react';
import { Button, showAlert, toast, Window } from '@poon/ui';

const AlertDemo = ({isVisible}) => {
	const handleResult = (id) => {
		toast(id ? `You pressed ${id}` : 'You dismissed the alert');
	};

	const showDemoAlert = () => showAlert('Demo Alert', 'You will find that alerts are helpful', [
		{_id: 'disagree', name: 'Disagree'},
		{_id: 'agree', name: 'Agree'},
	]).then(handleResult);

	const pressRedAlert = () => showAlert('Demo Alert', 'Are you sure you want to delete the red button?', [
		{_id: 'delete', name: 'Delete', destructive: true},
		{_id: 'cancel', name: 'Cancel'},
	]).then(handleResult);

	const pressManyButtonsAlert = () => showAlert('Demo Alert', 'This has a lot of options!', [
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

	const pressDefaultAlert = () => showAlert('Demo Alert', 'Even though this alert has no options, a close button is added by poon-ui.').then(handleResult);

	const pressEmptyAlert = () => showAlert('Demo Alert', 'There will be no button if you pass an empty options array.', []);

	const pressMultipleAlerts = () => {
		showAlert('Alert #1', 'So many alerts!');
		showAlert('Alert #2', 'So many alerts!');
		showAlert('Alert #3', 'So many alerts!');
		showAlert('Alert #4', 'So many alerts!');
		showAlert('Alert #5', 'So many alerts!');
	};

	return (
		<Window
			title="Alert Demo"
			isVisible={isVisible}
			children={
				<div className="alert-demo">
					<Button title="Show a regular alert" onClick={showDemoAlert}/>
					<Button title="Show alert with many options" onClick={pressManyButtonsAlert}/>
					<Button title="Show alert with red button" onClick={pressRedAlert}/>
					<Button title="Show alert with no options passed" onClick={pressDefaultAlert}/>
					<Button title="Show alert with empty options" onClick={pressEmptyAlert}/>
					<Button title="Show 5 alerts at once!!!" onClick={pressMultipleAlerts}/>
				</div>
			}
		/>
	);
};

export default AlertDemo;