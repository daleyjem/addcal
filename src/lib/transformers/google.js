export default (eventConfig) => {
    const config = {
        calendarId: eventConfig.calendarId || 'primary',
        summary: eventConfig.title,
        description: eventConfig.description,
        start: {
            dateTime: eventConfig.start
        },
        end: {
            dateTime: eventConfig.end
        },
        reminders: {
            useDefault: eventConfig.reminders === undefined
        }
    };

    if (eventConfig.recurrence) {
        config.recurrence = generateRecurrence(eventConfig.recurrence);
    }

    if (eventConfig.reminders) {
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
