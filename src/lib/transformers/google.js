/**
 * @param {EventParams} eventParams The EventParams object to transform
 */
export default (eventParams) => {
    eventParams.extra = eventParams.extra || {};

    const _dur = eventParams.duration / 60;
    const durHours = Math.floor(_dur / 60);
    const durMinutes = (_dur - durHours) * 60;
    
    let endDate = eventParams.start;
    endDate.setHours(endDate.getHours() + durHours);
    endDate.setMinutes(endDate.getMinutes() + durMinutes);

    const config = {
        calendarId: eventParams.extra.calendarId || 'primary',
        summary: eventParams.summary,
        description: eventParams.description,
        start: {
            dateTime: eventParams.start
        },
        end: {
            dateTime: endDate
        },
        reminders: {
            useDefault: eventParams.reminders === undefined
        },
        url: eventParams.url
    };

    if (eventParams.recurrence) {
        config.recurrence = generateRecurrence(eventParams.recurrence);
    }

    if (eventParams.reminders) {
        config.reminders.useDefault = false;
        /**
         * @todo Add reminders generation logic
         */
        // config.reminders = {
            
        // }
    }

    return config;
};

/**
 * Generates an array of recurrences
 * @see http://tools.ietf.org/html/rfc5545#section-3.8.5
 * @todo Implement RFC5545
 */
function generateRecurrence(recurrences){
    return [];
}
