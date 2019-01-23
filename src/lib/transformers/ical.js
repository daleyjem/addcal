import { createEvent } from 'ics-browser-es';

/**
 * @param {EventParams} eventParams An EventParams object with event data
 * @return {string} ics file data
 */
export default (eventParams) => {
    const _dur = eventParams.duration / 60;
    const durHours = Math.floor(_dur);
    const durMinutes = (_dur - durHours) * 60;

    const eventData = {
        start: [
            eventParams.start.getFullYear(),
            eventParams.start.getMonth() + 1,
            eventParams.start.getDate(),
            eventParams.start.getHours(),
            eventParams.start.getMinutes()
        ],
        duration: { hours: durHours, minutes: durMinutes },
        title: eventParams.summary,
        description: eventParams.description,
        location: eventParams.location,
        url: eventParams.url,
        // geo: { lat: 40.0095, lon: 105.2669 },
        // status: 'CONFIRMED'
    }
    
    return createEvent(eventData, (err, val) => {
        return val;
    });
}
