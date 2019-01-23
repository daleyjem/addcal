# AddCal [![Build Status](https://travis-ci.org/daleyjem/addcal.svg?branch=master)](https://travis-ci.org/daleyjem/addcal)

Open-source web application utility for adding calendar events via certain platform API's (Google, etc.)

## Current API Support

- [Google Calendar API](https://developers.google.com/calendar/)

## Pre-requisites

* Platform-specific API access grants from consuming web apps, specified through configuration options (see below).

## Implementation Example

An example for Typescript...

```js
import AddCal, {EventParams, generators} from 'addcal';

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

  /**
   * Add event to an api service (google, etc.)
   */
  public click_addEvent(eventData, service /* 'google' */){
    const params = new EventParams({
    	summary: eventData.summary, // 'Event Summary'
		description: eventData.description, // 'Event description.'
		start: eventData.start, // new Date()
		duration: eventDate.duration, // 60 minutes
		url: eventData.url // 'http://www.google.com'
    });
  
    this.addCal.addEvent(service, params)
      .then(() => {
        console.log('The reminder was added!');
      })
      .catch((err) => {
        console.log('There was a problem adding the reminder');
      })
    ;
  }
  
  /**
   * Download an .ics file
   */
  public click_downloadEvent(eventData, type /* 'ical' */){
    const params = new EventParams({
    	summary: eventData.summary, // 'Event Summary'
		description: eventData.description, // 'Event description.'
		start: eventData.start, // new Date()
		duration: eventDate.duration, // 60 minutes
		url: eventData.url // 'http://www.google.com'
    });
  
    this.addCal.download(type, params); // Or use `generators.ICALENDAR` for 'type' param
  }
}

```
