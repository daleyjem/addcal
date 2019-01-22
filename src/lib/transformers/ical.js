import { createEvent } from 'ics-browser-es';

export default (eventParams) => {
    const eventData = {
        start: [2018, 5, 30, 6, 30],
        duration: { hours: 6, minutes: 30 },
        title: 'Bolder Boulder',
        description: 'Annual 10-kilometer run in Boulder, Colorado',
        location: 'Folsom Field, University of Colorado (finish line)',
        url: 'http://www.bolderboulder.com/',
        geo: { lat: 40.0095, lon: 105.2669 },
        status: 'CONFIRMED'
    }
    
    return createEvent(eventData, (err, val) => {
        return val;
    });
}
