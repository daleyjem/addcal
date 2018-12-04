# AddCal

Open-source web application utility for adding calendar events via certain platform API's (Google, etc.)

## Current API Support

- [Google Calendar API](https://developers.google.com/calendar/)

## Pre-requisites

* Platform-specific API access grants from consuming web apps, specified through configuration options (see below).

## Implementation Example

```js
import AddCal from 'addcal';

export class AppComponent {
	private addCal:AddCal;

	public constructor(){
		this.addCal = new AddCal({
			google: {
				apiKey: '<YOUR_API_KEY>',
				clientKey: '<YOUR_CLIENT_ID>'
			}
		});
	}

	public click_addEvent(eventData){
		this.addCal.addEvent('google', eventData)
			.then(() => {
				console.log('The reminder was added!');
			})
			.catch((err) => {
				console.log('There was a problem adding the reminder');
			})
		;
	}
}

```
