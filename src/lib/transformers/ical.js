import iCal from 'ical-generator';

export default (eventData) => {
    const ical = iCal();
    const event = ical.createEvent({
        summary: '',
        description: '',
        start: '',
        end: ''
    });
    const alarm = event.createAlarm({
        type:       'display',
        trigger:    1800,
        repeat:     1,
        interval:   1200,
    });

    return ical.toString();
}
